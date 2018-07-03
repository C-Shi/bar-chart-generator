var data = [1,2,3,5,4,5, 7, 9, 20, 1, 17];
var options = {
  chartWidth: 1000,
  chartHeight: 300,
  barSpacing: 30,
  barColor: "rgba(0, 255, 0, 0.5)"
}
var element = "CANVAS";
var barWidth = 30;

function drawBarChart(data, options, element){
  //Step 1: create a Canavs element on the page for future display of the bar Chart
  var canvas = document.createElement(element);
  document.body.appendChild(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var canvas = createChartEssential(data, options, element, canvas);

  // Step 2: anaylyze the data - determine max bar height, determine scale of each data
  // find the max number in data, its height should equals to 80% of total chart height
  var maxIndex = findMax(data);
  // pair up the height of each bar in px with its value, based on its relative percentage to the max value
  var output = calculateBarHeight(data, maxIndex, options.chartHeight);

  // Step 3: configure options - add bar spacing based on the # of value
  var barWidth = getBarWidth(data.length, options.chartWidth, options.barSpacing);

  // Step 4: render each bar to html
  renderBar(output, barWidth, options, canvas);




}

function createChartEssential(data, options, element, canvas){

  var chartHeight = options.chartHeight;
  var chartWidth = options.chartWidth;

  var c = canvas.getContext("2d");
  c.beginPath();
  c.moveTo(30, 30);
  c.lineTo(30, chartHeight);
  c.lineTo(chartWidth, chartHeight);
  c.stroke();

  return canvas;
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
function getBarWidth(Num, charWidth, barSpacing){
  var barWidth = Math.floor(charWidth * 0.9 / Num) - barSpacing;
  console.log(barWidth)
  return barWidth;
}

// this function will render all bar
function renderBar(output, barWidth, options, canvas){
  var c = canvas.getContext("2d");
  c.fillStyle = options.barColor;
  for (var i = 0; i < output.length; i++){
    var x = i * (barWidth + options.barSpacing);
    var y = options.chartHeight - output[i][1];
    c.fillRect(x + 30 + options.barSpacing, y, barWidth, output[i][1]);
  }
}

drawBarChart(data, options, element);






















