(function(){

			var init = function (){

				var height = $(window).height();
				var width = $(window).width();

				$('#map-canvas').css({'height':height,'width':width})


				 	var url = 'https://spreadsheets.google.com/feeds/list/1sfHTMbXVxMal2wOCxmq6q6aQcko1msUvUnfaiGYBEz8/od6/public/values?alt=json';

					var myLatlng = new google.maps.LatLng(38.889931,-77.009003);
					var mapOptions = {
					  zoom: 13,
					  center: myLatlng
					}
					var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

					var most_recent_latLng = undefined;

					var loadData = function () {
						var markers = {};
						
						
						$.get(url, function (data){
							
							
							
					 		var route = data.feed.entry;

					 		for (var point in route) {
					 			

					 			// To add the marker to the map, use the 'map' property

					 			if (!markers[point]){

					 				var latitude = route[point].gsx$latitude.$t;
						 			var longitude = route[point].gsx$longitude.$t;
						 			var d = new Date(Date.parse(route[point].updated.$t));

						 			var timestamp = d.getHours() + ':' + d.getMinutes() + 'a.m.';

						 			var myLatlng = new google.maps.LatLng(latitude, longitude);
					 				
					 			
									var marker = new google.maps.Marker({
									    position: myLatlng,
									    map: map
									});

									most_recent_latLng = myLatlng;

									var infowindow = new google.maps.InfoWindow({
				      				content: timestamp
				  				});

								markers[point] = marker;

					

								google.maps.event.addListener(marker, 'click', function() {
				    				infowindow.open(map,marker);
				  				});
								}
					 		}
				 		});
				 	};

				 	loadData();

				 	setInterval(function(){ 
						loadData();
					}, 10000);

					var panToNewest = function (){
						$('.recent').on('click', function(){
							if (most_recent_latLng){
								map.panTo(most_recent_latLng);
								map.setZoom(20);
							}
						});
					};

					panToNewest();
			};

			

			init();
			
		})();