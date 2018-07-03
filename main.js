var data = [1,2,3,5,4,5];
var options = {
  barWidth: 30,
  barColor: "red",
  labelColor: "black"
}
var element = "CANVAS";
var barWidth = 30;

function drawBarChart(data, options, element){
  //Step 1: create a Canavs element on the page for future display of the bar Chart
  var canvas = document.createElement(element);
  document.body.appendChild(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var chartHeight = Math.floor(canvas.height * 0.8);
  var charWidth = Math.floor(canvas.width * 0.9);


  // Step 2: anaylyze the data - determine max bar height, determine scale of each data
  // find the max number in data, its height should equals to 80% of total chart height
  var maxIndex = findMax(data);
  // pair up the height of each bar in px with its value, based on its relative percentage to the max value
  var output = calculateBarHeight(data, maxIndex, chartHeight);

  // Step 3: configure options - add bar spacing based on the # of value
  var barSpace = barSpacing(data.length, charWidth, options.barWidth);
  // Step 4: render to the html

}

// this function will iterate the data array and return the index of its max number
function findMax(data){
  let maxIndex = 0;
  for(var i = 0; i < data.length; i++){
    if(data[i] > data[maxIndex]){
      maxIndex = i;
    }
  }
  console.log(maxIndex);
  return maxIndex;
}

// this function will return a two dimentional array ouput[[value, barHeightInPexil]]
function calculateBarHeight(data, maxIndex, chartHeight){
  var output = [];
  var maxBarHeight = Math.floor(0.8 * chartHeight);

  for(var i = 0; i < data.length; i++){
    var barHeight = Math.floor(data[i]/data[maxIndex] * maxBarHeight);
    output.push([data[i], barHeight]);
  }

  console.log(output);
  return output;
}

// this function will calculate the bar spacing value
function barSpacing(Num, charWidth, barWidth){
  var barSpace = Math.floor(charWidth * 0.9 / Num) - barWidth;
  console.log(barSpace)
  return barSpace;
}
drawBarChart(data, options, element);