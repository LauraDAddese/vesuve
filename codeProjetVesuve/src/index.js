//let donneesgeopgraphiques =  "data/donneesgeopgraphiques.geojson";
//let data = [donneesgeopgraphiques];
geoJson.features[0].properties.tenCity = "changed value";

let map = L.map('map').setView([40.82145693478615, 14.425858810559106], 12.2);

L.tileLayer(
  "https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png",
	{
    maxZoom: 20,
    attribution:
		  '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  }
).addTo(map);

//tout afficher :
//L.geoJSON(geoJson).addTo(map)

const tabCoulees = [];

//on affiche une éruption (un id en particulier) :
for (let i = 0; i < geoJson.features.length; i++) {
	geoJson.features.forEach(element => {
		if (element.properties.id == i) {
			//tabCoulees[i] = element;

			tabCoulees.push(element);
		}
	})
}

L.geoJSON(tabCoulees[19]).addTo(map);

console.log(tabCoulees[19]);

// if (features[0].properties.id = 2) {
// 	L.geoJSON(geoJson


