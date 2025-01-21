//Customising blue plaques appearance
        var myIcon = L.icon({
        iconUrl : 'Plaque.png',
        iconSize:[38,32]
	    });
function initialize() {
		//Load tiles from open street map
		var osm =L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:'Map data ©OpenStreetMap contributors, CC-BY-SA, Imagery 		©CloudMade',
            maxZoom: 18 
        });
        var osmTopo =L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
			maxZoom: 18
        });
		var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France',
		    maxZoom: 18
        });
		//Create the map object and set the centre point and zoom level
		var map = L.map('mapdiv',{
        center:[53.812693, -1.544734],
		zoom:11,
		layers: [osm]
		});
		// Define control layers
		var baseMaps = {
			    "OpenStreetMap": osm,
                "OpenStreetMap.TOPO": osmTopo,
				"OpenStreetMap.HOT": osmHOT
        };
		
		var Plaques = []; // Create an array to keep the markerInfo data
		
	    for (Id in os_markers)  { 
		    // Define os_markers properties for subsequent use
            var title = os_markers[Id].Title;
			var Location = os_markers[Id].Location;
			var unveiler = os_markers[Id].Unveiler;
		    var date = os_markers[Id].Date;
			var sponsor = os_markers[Id].Sponsor;
			var caption = os_markers[Id].Caption;
        	// Convert coordinates
        	var osPt = new OSRef(os_markers[Id].Easting,os_markers[Id].Northing);
        
        	var llPt = osPt.toLatLng(osPt);
        	    llPt.OSGB36ToWGS84();
			
			var latitude=llPt.lat; // Latitude in WGS84
			var longitude=llPt.lng; // Longitude in WGS84
			var markerInfo = {
				title:title,
				latitude:latitude,
				longitude:longitude,
				Location:Location,
				Unveiler:unveiler,
				Date:date,
				Sponsor:sponsor,
				Caption:caption
				};//Transfer plaques properties from os_markers array into markerInfo array
				
			    Plaques.push(markerInfo); // Transfer markerInfo data into Plaques array
		};
		    
		var markerssearch=L.layerGroup(); // Create a layer group to contain markers from the Plaques array
		
        Plaques.forEach(function(markerInfo) {
	        var info = "<div class=infowindow><h1>" + markerInfo.title + "</h1>			<p><b>Location</b>: " + markerInfo.Location + "</p>   <p><b>Unveiler</b>: " + markerInfo.Unveiler + "</p>  <p><b>Date</b>: " + markerInfo.Date + "</p>   <p><b>Sponsor</b>: " + markerInfo.Sponsor + "</p>  <p><b>What it Says</b>: " + markerInfo.Caption + "</p></div>";
            // define pop up properties
        // Extract latitude and longitude from markerInfo
	        var title = markerInfo.title;
            var latitude = markerInfo.latitude;
            var longitude = markerInfo.longitude;
	


        // Create a marker with the extracted latitude and longitude
            var marker = L.marker([latitude, longitude],{icon:myIcon,title:title}).bindPopup(info);
    
        // Add the marker to the markerssearch layer group
               markerssearch.addLayer(marker);
	
	       
        });
	    var searchControl = new L.Control.Search({
        layer: markerssearch, // Layer group to hold search results
        propertyName: 'title', // Property name to search in the layer group(in this case, 'title')
        initial: false, // This is do not open search on initialization
        zoom: 18, // This is the zoom level for the search results
        position: 'topright', // Position of the search control on the map
        });

        // Add the search control to the map
        map.addControl(searchControl);
        

        // Add layer control
        L.control.layers(baseMaps).addTo(map);
};
