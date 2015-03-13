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
					var most_recent_point = undefined;
					var markers = {};

					var ctaLayer = new google.maps.KmlLayer("http://runrocknroll.competitor.com/maps/kmlbuilder.php?eventid=54&wmid=40&FirstAidStation-1=1&BandStop-2=1&WaterStation-12=1");
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
				      					content: timestamp + '<br/>' + address + '<br/>' + neighborhood
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

			window.addEventListener("load",function() {
			// Set a timeout...
			setTimeout(function(){
				// Hide the address bar!
				window.scrollTo(0, 1);
			}, 0);
});
			
		})();