//let donneesgeopgraphiques =  "data/donneesgeopgraphiques.geojson";
//let data = [donneesgeopgraphiques];
geoJson.features[0].properties.tenCity = "changed value";
let parse = JSON.stringify(geoJson);
console.log(parse);

let map = L.map('map').setView([40.82145693478615, 14.425858810559106], 12.2);
let randomColor = Math.floor(Math.random()*16777215).toString(16);

L.tileLayer(
  "https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png",
	{
    maxZoom: 20,
    attribution:
		  '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  }
).addTo(map);

//tout afficher :
// L.geoJSON(geoJson).addTo(map)

const eruption = {
	id: "",
	annee: "",
	geometrie: [],
};

const tabEruptions = [];

// for(let i=0; i<geoJson.lenght; i++){
//    console.log(geoJson[i].features.properties.id);
// }

//on affiche une éruption (un id en particulier) :
for (let i = 0; i < geoJson.features.length; i++) {
	geoJson.features.forEach(element => {
		if (element.properties.id == i) {
			//tabCoulees[i] = element;
			//créer un nouveau tableau dans le tableau avec les coulees
			//tabCoulees.push(element);

			console.log(element);

			// 	tabCoulees.forEach(id => {
			
	
			// 	// changer le style de randomColor
			// 		let	style = {
			// 			color: randomColor,
			// 		}
			// })
		}
	});
}

L.geoJSON(geoJson.features, {
    style: function(element) {
        switch (element.properties.id) {
            case '1': return {color: "#ff0000"};
			case '2': return { color: "#0000ff" };
			case '3':   return {color: "#0000ff"};
			case '4':   return {color: "#0000ff"};
            case '5':   return {color: "#0000ff"};
            case '6':   return {color: "#0000ff"};
            case '7':   return {color: "#0000ff"};
            case '8':   return {color: "#0000ff"};
            case '9':   return {color: "#000000"};
            case '10':   return {color: "#345678"};
            case '11':   return {color: "#0000ff"};
            case '12':   return {color: "#0000ff"};
            case '13':   return {color: "#5400ff"};
            case '14':   return {color: "#5000ff"};
            case '15':   return {color: "#0000ff"};
            case '16':   return {color: "#4000ff"};
            case '17':   return {color: "#1000ff"};
            case '18':   return {color: "#2000ff"};
            case '19':   return {color: "#3000ff"};
        }
    }
}).addTo(map);


// L.geoJSON(tabCoulees[19]).addTo(map);

// console.log(tabCoulees[19]);

// if (features[0].properties.id = 2) {
// 	L.geoJSON(geoJson

