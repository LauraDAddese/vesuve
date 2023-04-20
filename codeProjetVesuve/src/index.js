//let donneesgeopgraphiques =  "data/donneesgeopgraphiques.geojson";
//let data = [donneesgeopgraphiques];
geoJson.features[0].properties = "changed value";

let map = L.map('map').setView([40.82145693478615, 14.425858810559106], 12.2);

L.tileLayer(
  "https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png",
	{
    maxZoom: 20,
    attribution:
		  '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  }
).addTo(map);


	 
L.geoJSON(geoJson).addTo(map);

