//import { createMap } from "../src/Map.js";
import * as d3 from "d3";
import scrollama from "scrollama";
import createMap  from "./Map";
//import { ScrollamaInstance } from "scrollama";

const scrolly = d3.select("#scrolly");
const graphic = scrolly.select(".scroll__graphic");
// const volcan = scrolly.select(".volcan");
const text = scrolly.select(".scroll__text");
const step = scrolly.selectAll(".step");
const box = d3.selectAll(".box");

// initialize the scrollama
let scroller = scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  const stepH = Math.floor(window.innerHeight * 0.75);
  step.style("height", stepH + "px");

  const figureHeight = window.innerHeight / 2;
  const figureMarginTop = (window.innerHeight - figureHeight) / 2;

  graphic
    .style("height", figureHeight + "px")
    .style("top", figureMarginTop + "px");

  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

// scrollama event handlers
// function handleStepEnter(response) {
//   // response = { element, direction, index }
//   let currentIndex = response.index;
//   let currentDirection = response.direction;

//   // fade in current step
//   step.classed("is-active", function (d, i) {
//     return i === currentIndex;
//   });

//   const svg = d3.select("#mon-svg").append("svg");
//       // .attr("width", 200)
//       // .attr("height", 200);

//   switch (currentIndex) {
//     case 0: // first step
//       // Création de l'élément SVG
//       svg.select("#mon-svg").remove();

//       svg.append("image").attr("xlink:href", "svg/volcan1.svg");

//       break;
//     case 1: // second step
//     svg.select("#mon-svg2").remove();
//     svg.append("image").attr("xlink:href", "svg/volcan2.svg");
//       break;
//   }
function handleStepEnter(response) {
  let currentIndex = response.index;
  step.classed("is-active", function (d, i) {
    return i === currentIndex;
  });

  // Remove existing SVG element
  d3.select("#mon-svg").select("svg").remove();

  const svg = d3.select("#mon-svg");

  switch (currentIndex) {
    case 0: // first step
      //svg.append("image").attr("xlink:href", "svg/volcan1.svg");
      // Charger le fichier SVG avec d3-fetch
      d3.svg("svg/volcan1.svg").then(function(data) {
        // Extraire la balise <svg> du fichier SVG
        let parser = new DOMParser();
        let svgString = new XMLSerializer().serializeToString(data.documentElement);
        let svgDoc = parser.parseFromString(svgString, "image/svg+xml");
        let svgNode = svgDoc.getElementsByTagName("svg")[0];
        
        // Ajouter la balise <svg> extraite dans le document actuel
        d3.select("#mon-svg").node().appendChild(svgNode);
      });
      break;
    case 1: // second step
    d3.select("#map").remove();
    d3.svg("svg/volcan2.svg").then(function(data) {
      // Extraire la balise <svg> du fichier SVG
      let parser = new DOMParser();
      let svgString = new XMLSerializer().serializeToString(data.documentElement);
      let svgDoc = parser.parseFromString(svgString, "image/svg+xml");
      let svgNode = svgDoc.getElementsByTagName("svg")[0];
      
      // Ajouter la balise <svg> extraite dans le document actuel
      d3.select("#mon-svg").node().appendChild(svgNode);
    });
      break;
    case 2:
      d3.select("#map").remove();
      d3.svg("svg/volcan3.svg").then(function(data) {
        // Extraire la balise <svg> du fichier SVG
        let parser = new DOMParser();
        let svgString = new XMLSerializer().serializeToString(data.documentElement);
        let svgDoc = parser.parseFromString(svgString, "image/svg+xml");
        let svgNode = svgDoc.getElementsByTagName("svg")[0];
        
        // Ajouter la balise <svg> extraite dans le document actuel
        d3.select("#mon-svg").node().appendChild(svgNode);
      });
      break;
    case 3: 
    d3.select("#map").remove();
    d3.svg("svg/volcan4.svg").then(function(data) {
      // Extraire la balise <svg> du fichier SVG
      let parser = new DOMParser();
      let svgString = new XMLSerializer().serializeToString(data.documentElement);
      let svgDoc = parser.parseFromString(svgString, "image/svg+xml");
      let svgNode = svgDoc.getElementsByTagName("svg")[0];
      
      // Ajouter la balise <svg> extraite dans le document actuel
      d3.select("#mon-svg").node().appendChild(svgNode);
    });
    case 4:
      d3.select("#map").remove();
      d3.select(".scroll__graphic").append("div").attr("id", "map");
      createMap();
      break;
  }

  //update graphic based on step here
  let stepData = step.attr("data-step");
}

// function handleStepExit(response) {
//   // response = { element, direction, index }
//   let currentIndex = response.index;
//   let currentDirection = response.direction;

//     if (response.index === 1) { // remove SVG container and image from second step
//       d3.select("#my-svg-2").remove();
//     }
//     else if (response.index === 2) { // remove SVG container and image from third step
//       d3.select("#my-svg-3").remove();
//   };
// }

function init() {
  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      container: "#scrolly", // our outermost scrollytelling element
      graphic: ".scroll__graphic", // the graphic
      text: ".scroll__text", // the step container
      step: ".scroll__text .step", // the step elements
      offset: 0.5,
      debug: false, // this being true is what makes the lines show up
    })
    .onStepEnter(handleStepEnter);
  // .onStepExit(handleStepExit);

  // setup resize event
  window.addEventListener("resize", handleResize);
}

// kick things off
init();
