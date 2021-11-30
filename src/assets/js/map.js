var params = getUrlParams();
google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {
	if(typeof(params.f) != undefined && params.f.length > 0){
		$.getJSON(params.f, function(map_datalist) {
			var map_markers = [];
			var map_info = [];
			var currentInfoWindow = null;
			var map_visible = true;
			if($('.categorybar-list input[type="checkbox"]').length != 0) map_visible = false;
			
			if(map_datalist.length == 0){
				return false;
			}
			
			map_setting_data = map_datalist.shift(); 
			
			var map_center = new google.maps.LatLng(map_setting_data.pos_lat, map_setting_data.pos_long);

			var opts = {
				zoom: map_setting_data.zoom,
				center: map_center,
				streetViewControl: true,
				scrollwheel: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDefaultUI: false,

 				//styles: [{'featureType':'water','stylers':[{'color':'#021019'}]},{'featureType':'landscape','stylers':[{'color':'#08304b'}]},{'featureType':'poi','elementType':'geometry','stylers':[{'color':'#0c4152'},{'lightness':5}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'color':'#0b434f'},{'lightness':25}]},{'featureType':'road.arterial','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.arterial','elementType':'geometry.stroke','stylers':[{'color':'#0b3d51'},{'lightness':16}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#000000'}]},{'elementType':'labels.text.fill','stylers':[{'color':'#ffffff'}]},{'elementType':'labels.text.stroke','stylers':[{'color':'#000000'},{'lightness':13}]},{'featureType':'transit','stylers':[{'color':'#146474'}]},{'featureType':'administrative','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'administrative','elementType':'geometry.stroke','stylers':[{'color':'#144b53'},{'lightness':14},{'weight':1.4}]}]
			}
			var jikan= new Date(); 
			var hour = jikan.getHours(); 
			var min =  jikan.getMinutes();

			
			/*if (hour >= 0 && hour <= 24 ) {
				opts.styles = [{"featureType":"landscape","stylers":[{"hue":"#FFA800"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#53FF00"},{"saturation":-73},{"lightness":40},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FBFF00"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#00FFFD"},{"saturation":0},{"lightness":30},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#00BFFF"},{"saturation":6},{"lightness":8},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#679714"},{"saturation":33.4},{"lightness":-25.4},{"gamma":1}]}];
			}*/
			

			var map = new google.maps.Map(document.getElementById("map"), opts);
			
			
			var markerOptions = {
				map: map ,
				position: map_center ,
				title: "" ,
				animation: google.maps.Animation.DROP,
				icon: "",
				category: "",
				visible: map_visible,
			};
			var infoOptions = {
				content: 'default',
			};
			map_datalist.forEach(function (data, index) {
				map_position = new google.maps.LatLng(data.pos_lat, data.pos_long);
				markerOptions.map_id = data.id;
				markerOptions.title = data.title;
				markerOptions.icon = data.icon;
				markerOptions.position = map_position;
				markerOptions.zoom = data.zoom;
				markerOptions.category = data.category;
				infoOptions.content = data.content;
				
				map_markers[index] = new google.maps.Marker(markerOptions);
				map_info[index] = new google.maps.InfoWindow(infoOptions);
				google.maps.event.addListener( map_markers[index] , 'click' , function(){
					//map.panTo(map_position);
					map.panTo(new google.maps.LatLng(data.pos_lat, data.pos_long));
					if (currentInfoWindow) {
						currentInfoWindow.close();
					}
					map_info[index].open(map, this);
					currentInfoWindow = map_info[index];
				});
			});
			$('.categorybar-list input[type="checkbox"]').each(function(){toggleMarker(this, map_markers)});
			
			$('.categorybar-list input[type="checkbox"]').change(function(){
				toggleMarker(this, map_markers);
			});
			$('.sc-maplist li a').click(function(){
				t_id = $(this).parent("li").attr("value");
				map_markers.forEach(function (data, index) {
					if(data.map_id == t_id){
						map.panTo(data.position);
						if (currentInfoWindow) {
							currentInfoWindow.close();
						}
						map_info[index].open(map, data);
						currentInfoWindow = map_info[index];
					}
				});
				return false;
			});
		});
	}
}

function toggleMarker(obj, map_markers){
	var category = $(obj).val();
	var visible = $(obj).is(":checked");
	for (var i=0; i < map_markers.length; i++) {
		if (map_markers[i]["category"] == category) {
			map_markers[i].setVisible(visible);
		}
	}
}

function getUrlParams() {
	var params = {};
	var scripts = document.getElementsByTagName('script');
	var src = scripts[ scripts.length - 1 ].src;
	var query = src.substring( src.indexOf( '?' ) + 1 );
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var tmp = vars[i].split('=');
		params[tmp[0]] = decodeURIComponent(tmp[1]);
	}
	return params;
}