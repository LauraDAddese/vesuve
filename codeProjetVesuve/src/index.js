import { json } from "d3-fetch";

let randomColor = Math.floor(Math.random() * 16777215).toString(16);

let data = json("data/donneesgeographiques.geojson").then((data) => {
  //afficher la carte :
  let map = L.map("map").setView([40.82145693478615, 14.425858810559106], 12.2);
  L.tileLayer("https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png", {
    maxZoom: 20,
    attribution:
      '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  }).addTo(map);

//   L.geoJSON(data).addTo(map);

console.log(data.features[0].properties.id);

  L.geoJSON(data.features, {
    style: function (element) {
    //  console.log(element.properties.id) //le switch fonctionne mais ne change pas la couleur
      switch (element.properties.id) {
        case "1":
          return { fill: "#ff0000" };
        case "2":
          return { fill: "#0000ff" };
        case "3":
          return { fill: "#0000ff" };
        case "4":
          return { fill: "#0000ff" };
        case "5":
          return { color: "#0000ff" };
        case "6":
          return { color: "#0000ff" };
        case "7":
          return { color: "#0000ff" };
        case "8":
          return { color: "#0000ff" };
        case "9":
          return { color: "#000000" };
        case "10":
          return { color: "#345678" };
        case "11":
          return { color: "#0000ff" };
        case "12":
          return { color: "#0000ff" };
        case "13":
          return { color: "#5400ff" };
        case "14":
          return { color: "#5000ff" };
        case "15":
          return { color: "#0000ff" };
        case "16":
          return { color: "#4000ff" };
        case "17":
          return { color: "#1000ff" };
        case "18":
          return { color: "#2000ff" };
        case "19":
          return {style:"fill:#000000"};
      }
    },
  }).addTo(map);

  console.log(data);
});
