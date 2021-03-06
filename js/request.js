(function() {


	var request;

	var myVar;

	$("#tracking-form").submit(function(event){
		// abort any pending request
		if (request) {
			request.abort();
		}
		// setup some local variables
		var $form = $(this);
		// let's select and cache all the fields
		var $inputs = $form.find("input, select, button, textarea");
		// serialize the data in the form
		var serializedData = $form.serialize();
	
		$inputs.prop("disabled", true);
	
		// fire off the request to /form.php
		request = $.ajax({
			url: "https://script.google.com/macros/s/AKfycbx5-O4JXSDbveiv4Izm8jxHZZPDs3yhAI1XIDeaOjf8_JaYi1i-/exec",
			type: "post",
			data: serializedData
		});
	
		// callback handler that will be called on success
		request.done(function (response, textStatus, jqXHR){
			// log a message to the console
			$('body').css({'background':'#1ABD86'});
			myVar = setTimeout(function(){ 
				$('body').css({'background':'#FF5850'});
			}, 3000);
		});
	
		// callback handler that will be called on failure
		request.fail(function (jqXHR, textStatus, errorThrown){
			// log the error to the console
			$('body').css({'background':'#FF1A53'});
				myVar = setTimeout(function(){ 
				$('body').css({'background':'#FF5850'});
			}, 3000);
		});
	
		// callback handler that will be called regardless
		// if the request failed or succeeded
		request.always(function () {
			// reenable the inputs
			$inputs.prop("disabled", false);
		});
	
		// prevent default posting of form
		event.preventDefault();
	});

	function submitForm() {
		$('#tracking-form').submit();
	}

	function showPosition(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;

		

			$.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyC0M0K32VEJ_1fBRdACr58Rr-vAt-dy-bw', function (data) {
				var components = data.results[0].address_components;
				var address = components[0].long_name + ' ' + components[1].short_name;
				var neighborhood = data.results[1].formatted_address;
			
console.log(data)
				$('#latitude').attr('value',latitude);
				$('#longitude').attr('value',longitude);
				$('#address').attr('value',address);
				$('#neighborhood').attr('value',neighborhood);

				submitForm();
			});
		


		
	};

	$('.tap-here').on('click', function () {
		clearTimeout(myVar);
		$('body').css('background','#F3D07D')
		if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition);
	    }
	});

})();