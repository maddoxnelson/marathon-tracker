(function(){

			var init = function (){

				var height = $(window).height();
				var width = $(window).width();

				$('#map-canvas').css({'height':height,'width':width})


				 	var url = 'https://spreadsheets.google.com/feeds/list/17xaKeLEX1qLhteOFY-ZnOmZJNjrA3Oo1pER-lZWbVSs/od6/public/values?alt=json';

				 	var route_center_lat ='47.98718',
            			route_center_lng = '-91.96715';

					var myLatlng = new google.maps.LatLng(route_center_lat,route_center_lng);
					var mapOptions = {
					  zoom: 11,
					  center: myLatlng
					}
					var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

					var most_recent_latLng = undefined;
					var most_recent_point = undefined;
					var markers = {};

					var ctaLayer = new google.maps.KmlLayer("https://mattwebdev.com/marathon-tracker/routes/ely-marathon.kml");

					console.log(ctaLayer);
              		ctaLayer.setMap(map);

					var loadData = function () {
						
						
						
						$.get(url, function (data){

					
							
							
							
					 		var route = data.feed.entry;

					 		for (var point in route) {
					 			
					 			most_recent_point = point;

					 			// To add the marker to the map, use the 'map' property

					 			if (!markers[point]){

					 				var latitude = route[point].gsx$latitude.$t;
						 			var longitude = route[point].gsx$longitude.$t;
						 			var d = new Date(Date.parse(route[point].updated.$t));
						 			var address = route[point].gsx$address.$t;
						 			var neighborhood = route[point].gsx$neighborhood.$t;
						 			var minutes = d.getMinutes().toString();

						 			if (minutes.length < 2) {
						 				minutes = "0" + minutes;
						 			};

						 			var timestamp = d.getHours() + ':' + minutes + ' a.m.';



						 			var myLatlng = new google.maps.LatLng(latitude, longitude);
					 				
					 			
									var marker = new google.maps.Marker({
									    position: myLatlng,
									    map: map
									});

									most_recent_latLng = myLatlng;

									var infowindow = new google.maps.InfoWindow({
				      					content: '<p id="hook" class="info-bubble" style="height:200px; width: 250px;">' + timestamp + '<br/>' + address + '<br/>' + neighborhood + '</p>',
				      					maxWidth: 250
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
					}, 60000);

					var panToNewest = function (){
						$('.recent').on('click', function(){
							if (most_recent_latLng){
								map.panTo(most_recent_latLng);
								map.setZoom(20);
						
								new google.maps.event.trigger( markers[most_recent_point], 'click' );
							}
						});
					};

					panToNewest();
			};

			

			init();


				// Set a timeout...
				setTimeout(function(){
					// Hide the address bar!
					window.scrollTo(0, 1);
				}, 2000);
			
			

			
		})();