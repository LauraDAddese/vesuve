import { json } from "d3-fetch";

const createMap = () => {
  json("data/donneesgeographiques.geojson").then((data) => {
    //afficher la carte :
    let map = L.map("map").setView(
      [40.82145693478615, 14.425858810559106],
      12.2
    );
    L.tileLayer("https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png", {
      maxZoom: 20,
      attribution:
        '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(map);

    //fixer le zoom
    function fixerZoom(map, level) {
      map.setMinZoom(level);
      map.setMaxZoom(level);
      map.setZoom(level);
    }

    fixerZoom(map, 12.5);

    console.log(data.features[0].properties.id);

    function getColor(d) {
      return d == 1
        ? "#d12d38" //1701 couleur ok
        : d == 2
        ? "#1f78b4" //1820 couleur ok
        : d == 3
        ? "#0002ff" //1712 couleur ok
        : d == 4
        ? "#ff7f00" //1812 couleur ok
        : d == 5
        ? "#e4d97a" //1813 couleur ok
        : d == 6
        ? "#ffffff" //existe pas...
        : d == 7
        ? "#ff4fa1" //1810 couleur ok
        : d == 8
        ? "#9c264f" //1717 couleur ok
        : d == 9
        ? "#fb99a4" //1631 couleur ok
        : d == 10
        ? "#d8a66a" //1734 couleur ok
        : d == 11
        ? "#ad4832" //1822 couleur ok
        : d == 12
        ? "#88a758" //1779	 couleur ok
        : d == 13
        ? "#57360f" //1771 couleur ok
        : d == 14
        ? "#977f62" //1694 couleur ok
        : d == 15
        ? "#b65e00" //1805 couleur ok
        : d == 16
        ? "#ef9c83" //1754 couleur ok
        : d == 17
        ? "#91e9f7" //1786 couleur ok
        : d == 18
        ? "#430109" //1806 couleur ok
        : d == 19
        ? "#261838" // s.d. couleur ok
        : "#ffffff";
    }

    //afficher le style de base des features
    function style(feature) {
      return {
        fillColor: getColor(feature.properties.id),
        fillOpacity: 0.4,
        stroke: false,
      };
    }
    L.geoJSON(data, { style: style }).addTo(map);

    //fonction lors d'action au hover pour  changement d'opacité (ou de couleur à voir)
    function highlightFeature(e) {
      const layer = e.target;
      const color = layer._path.getAttribute("fill");
      const tabPaths = document.querySelectorAll(".leaflet-interactive");

      tabPaths.forEach((el) => {
        const fill = el.getAttribute("fill");
        if (fill === color) {
          el.style.fillOpacity = 1;
          el.style.stroke = "white";
          el.style.opacity = 1;
          el.style.weight = 2;
          el.parentNode.appendChild(el);
        }
      });

      layer.bringToFront();
    }

    //fonction pour remettre la couleur d'origine
    function resetHighlight(e) {
      const color = e.target._path.getAttribute("fill");
      const tabPaths = document.querySelectorAll(".leaflet-interactive");
      tabPaths.forEach((el) => {
        if (el.getAttribute("fill") === color) {
          el.style.fillOpacity = 0.4;
          el.style.stroke = "";
        }
      });
    }

    //fonction pour zoomer sur la zone au clic -- marche pas parce que déjà le popup...
    // function zoomToFeature(e) {
    //     map.fitBounds(e.target.getBounds());
    // }

    //fonction pour ajouter les listeners à chaque feature
    data = L.geoJson(data, {
      style: style,
      onEachFeature: onEachFeature,
    }).addTo(map);

    //fonction de listener pour les actions au hover et au mouseout (ou click)
    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
      });
    }

    data = L.geoJson(data, {
      style: style,
      onEachFeature: onEachFeature,
    }).addTo(map);

    //ajout d'un popup sur chaque feature indiquant la date --> la fonction pète le reste des actions,
    //je l'ai mise direct dans la fonction onEachFeature plus haut pour l'instant.
  });
};

//export { createMap };
export default createMap;
