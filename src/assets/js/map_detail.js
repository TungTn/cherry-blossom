var params = getUrlParams();
google.maps.event.addDomListener(window, 'load', init);


function initialize() {
	//alert("params: "+ params.spotlat + " , " + params.spotlong + " - place: " + params.placename);
	//alert("params: "+ params.spotlat + " , " + params.spotlong + " - place: " + params.placename + " - zoom: " + params.mzoom);

	var currentInfoWindow = null;
	//var latlng = new google.maps.LatLng(35.672863,139.735614);

	var latlng = new google.maps.LatLng(params.spotlat,params.spotlong);
	var myzoom = params.mzoom;
	myzoom=Number(myzoom);
	//alert(myzoom);
/*
if(typeof(params.spotlatlong) != undefined && params.spotlatlong.length > 0){
		var latlng = new google.maps.LatLng(params.spotlatlong);
	}*/
	
	//Ensable and Disable scrolling in PC and smartphone
	//https://coderwall.com/p/pgm8xa/disable-google-maps-scrolling-on-mobile-layout
	var isDraggable = $(document).width() > 480 ? true : false;
	// If document (your website) is wider than 480px, isDraggable = true, else isDraggable = false
	
	var opts = {
		draggable: isDraggable,
		zoom: myzoom,//16,//params.mzoom,
		center: latlng,
		streetViewControl: true,
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: false,

//styles: [{'featureType':'water','stylers':[{'color':'#021019'}]},{'featureType':'landscape','stylers':[{'color':'#08304b'}]},{'featureType':'poi','elementType':'geometry','stylers':[{'color':'#0c4152'},{'lightness':5}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'color':'#0b434f'},{'lightness':25}]},{'featureType':'road.arterial','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.arterial','elementType':'geometry.stroke','stylers':[{'color':'#0b3d51'},{'lightness':16}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#000000'}]},{'elementType':'labels.text.fill','stylers':[{'color':'#ffffff'}]},{'elementType':'labels.text.stroke','stylers':[{'color':'#000000'},{'lightness':13}]},{'featureType':'transit','stylers':[{'color':'#146474'}]},{'featureType':'administrative','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'administrative','elementType':'geometry.stroke','stylers':[{'color':'#144b53'},{'lightness':14},{'weight':1.4}]}]
};

	var jikan= new Date(); 
	var hour = jikan.getHours(); 
	var min =  jikan.getMinutes();

	if (hour >= 0 && hour <= 24 ) {
		opts = {
		draggable: isDraggable,
		zoom: myzoom,//16,//params.mzoom,
		center: latlng,
		streetViewControl: true,
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: false,

//styles: [{"featureType":"landscape","stylers":[{"hue":"#FFA800"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#53FF00"},{"saturation":-73},{"lightness":40},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FBFF00"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#00FFFD"},{"saturation":0},{"lightness":30},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#00BFFF"},{"saturation":6},{"lightness":8},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#679714"},{"saturation":33.4},{"lightness":-25.4},{"gamma":1}]}]
};


}


var map = new google.maps.Map(document.getElementById("map"), opts);
	


/* 1  ********************************/
	//var m_latlng1 = new google.maps.LatLng(35.672863,139.735614);
	var m_latlng1 = new google.maps.LatLng(params.spotlat,params.spotlong);
	
	var marker1 = new google.maps.Marker({
		position: m_latlng1,
		animation: google.maps.Animation.DROP,
		map: map,
		icon: '//cdn.willerexpress.com/en/area/cherry-blossom/img/sakura_spot.png',
		//title: 'GGGGGGGGGGGGGGGGGG'
		title: params.placename
		
	});
	
	/*
	var contentString1=''
	var infowindow1 = new google.maps.InfoWindow({
		content: contentString1
	});
	google.maps.event.addListener(marker1, 'click', function() {
	map.setZoom(12);
	map.panTo(latlng);
	if (currentInfoWindow) {
	currentInfoWindow.close();
	}
	infowindow1.open(map, marker1);
	currentInfoWindow = infowindow1;
	});

*/


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