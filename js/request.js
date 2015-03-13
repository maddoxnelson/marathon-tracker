(function() {


	var request;

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
		$('#result').text('Sending data...');
	
		// fire off the request to /form.php
		request = $.ajax({
			url: "https://script.google.com/macros/s/AKfycbzQy7atvhP1_G1ry4M8MFbovv43Fbg4Wt7lLg0-6wqDTfSBFGge/exec",
			type: "post",
			data: serializedData
		});
	
		// callback handler that will be called on success
		request.done(function (response, textStatus, jqXHR){
			// log a message to the console
			$('#result').html('Success!');
		});
	
		// callback handler that will be called on failure
		request.fail(function (jqXHR, textStatus, errorThrown){
			// log the error to the console
			$('#result').html('Error!' + textStatus + ' ' + errorThrown);
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

		$('#latitude').attr('value',latitude);
		$('#longitude').attr('value',longitude);

		submitForm();
	};

	$(window).on('click', function () {
		if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition);
	    }
	});

})();