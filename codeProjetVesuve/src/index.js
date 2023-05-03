//import { createMap } from "../src/Map.js";
import * as d3 from "d3";
import scrollama from "scrollama";

const scrolly = d3.select("#scrolly");
const graphic = scrolly.select(".scrolly__graphic");
const volcan = scrolly.select(".volcan");
const text = scrolly.select(".scroll__text");
const step = scrolly.selectAll(".step");
const box = d3.selectAll(".box");

// initialize the scrollama
let scroller = scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  const stepHeight = Math.floor(window.innerHeight * 0.75);
  step.style("height", `${stepHeight}px`);

  // 2. update width/height of graphic element
  const figureHeight = window.innerHeight * 0.5;
  const figureMarginTop = (window.innerHeight - figureHeight) / 2;

  volcan.style("height", `${figureHeight}px`);
  volcan.style("top", `${figureMarginTop}px`);

  // 3. tell scrollama to update new element dimensions
  let volcanMargin = 32;
  let textWidth = text.node().offsetWidth;
  let volcanWidth = volcan.node().offsetWidth - textWidth - volcanMargin;
  // make the height of 1/2 viewport
  let volcanHeight = Math.floor(window.innerHeight / 2);

  volcan
    .style("width", `${volcanWidth}px`)
    .style("height", `${volcanHeight}px`);

  //4. tell scrollama to update new element dimensions
  scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
  // response = { element, direction, index }

  // fade in current step
  step.classed("is-active", function (d, i) {
    return i === response.index;
  });

  //update graphic based on step here
  let stepData = step.attr("data-step");
}

function handleContainerEnter(response) {
  // response = { direction }
  // sticky the graphic
  volcan.classed("is-fixed", true);
  volcan.classed("is-bottom", false);
}

function handleContainerExit(response) {
  // response = { direction }
  // un-sticky the graphic, and pin to top/bottom of container
  volcan.classed("is-fixed", false);
  volcan.classed("is-bottom", response.direction === "down");

  // add color to current step only
  step.classed("is-active", function (d, i) {
    return i === response.index;
  });

  // change color of boxes based on step
  box.style("background-color", function (d, i) {
    return i === response.index ? "#FFA500" : "#eee";
  });

  // add map to step 4
  // if (response.index === 3) {
  //   createMap();
  // }
}
function init() {
  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      container: "#scrolly", // our outermost scrollytelling element
      volcan: ".scrolly__graphic", // the graphic
      text: ".scroll__text", // the step container
      step: ".scroll__text .step", // the step elements
      offset: 0.5,
      debug: false, // this being true is what makes the lines show up
    })
    .onStepEnter(handleStepEnter)
    .onContainerEnter(handleContainerEnter)
    .onContainerExit(handleContainerExit);

  // setup resize event
  window.addEventListener("resize", handleResize);
}

// kick things off
init();
