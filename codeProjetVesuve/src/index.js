import { createMap } from "../src/Map.js";
import * as d3 from "d3";
import scrollama from "scrollama";

const scrolly = d3.select("#scrolly");
const figure = scrolly.select("figure");
const article = scrolly.select("article");
const step = article.selectAll(".step");
const box = d3.selectAll(".box");

// initialize the scrollama
const scroller = scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  const stepHeight = Math.floor(window.innerHeight * 0.75);
  step.style("height", `${stepHeight}px`);

  // 2. update width/height of graphic element
  const figureHeight = window.innerHeight * 0.5;
  const figureMarginTop = (window.innerHeight - figureHeight) / 2;

  figure
    .style("height", `${figureHeight}px`)
    .style("top", `${figureMarginTop}px`);

  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
  console.log(response);
  // response = { element, direction, index }

  // add color to current step only
  step.classed("is-active", function (d, i) {
    return i === response.index;
  });

  // change color of boxes based on step
  box.style("background-color", function (d, i) {
    return i === response.index ? "#FFA500" : "#eee";
  });

  // add map to step 4
  if (response.index === 3) {
    createMap();
  }
}

function init() {
  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: "#scrolly article .step",
      offset: 0.33,
      debug: false,
    })
    .onStepEnter(handleStepEnter);

  // setup resize event
  window.addEventListener("resize", handleResize);
}

// kick things off
init();
