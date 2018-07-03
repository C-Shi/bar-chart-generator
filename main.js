
// This is the sample data to generate data ************************
var data = [1,2,3,5,4,5, 7, 9, 30, 1, 10, 4];
var options = {
  chartWidth: 1000,
  chartHeight: 300,
  barSpacing: 30,
  barColor: "rgba(0, 255, 0, 0.5)",
  labelColor: "gray",
  yMax: 30,
  yInterval: 5,
  xLabel: {value: "year", fontSize: "15px"},
  yLabel: {value: "profit", fontSize: "10px"},
  title: {value: "Proft Summary for the Company", fontSize:"20px"},
  displayValue: "centre"
};
var element = "CANVAS";
// ****************************************************************


// drawBarChart is the main function of this API that client will call upon
// *********************************************************************************************
function drawBarChart(data, options, element){
  //Step 1: create a Canavs element on the page for future display of the bar Chart
  var canvas = document.createElement(element);
  document.body.appendChild(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas = createChartEssential(data, options, element, canvas);

  // Step 2: anaylyze the data - determine max bar height, determine scale of each data
  // find the max number in data, its height should equals to 80% of total chart height
  var maxIndex = findMax(data);
  // pair up the height of each bar in px with its value, based on its relative percentage to the max value
  var output = calculateBarHeight(data, maxIndex, options.chartHeight);

  // Step 3: configure options - add bar spacing based on the # of value
  var barWidth = getBarWidth(data.length, options.chartWidth, options.barSpacing);

  // Step 4: render each bar to html
  renderBar(output, barWidth, options, canvas);
  // Step 5: display bar properties
  chartAxes(output, options, barWidth, maxIndex, canvas);
  // Step 6: generate X-Y label
  generateLabel(options, canvas);
}
// *********************************************************************************************


function createChartEssential(data, options, element, canvas){
  var chartHeight = options.chartHeight;
  var chartWidth = options.chartWidth;
  var c = canvas.getContext("2d");
  c.beginPath();
  c.moveTo(40, 30);
  c.lineTo(40, chartHeight);
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

  return output;
}

// this function will calculate the bar spacing value
function getBarWidth(Num, charWidth, barSpacing){
  var barWidth = Math.floor(charWidth * 0.9 / Num) - barSpacing;

  return barWidth;
}

// this function will render all bar
function renderBar(output, barWidth, options, canvas){
  var c = canvas.getContext("2d");
  var valuePosition = 0;

  for (var i = 0; i < output.length; i++){
    // draw bar
    var x = i * (barWidth + options.barSpacing);
    var y = options.chartHeight - output[i][1];
    c.fillStyle = options.barColor;
    c.fillRect(x + 40 + options.barSpacing, y, barWidth, output[i][1]);
    // display value accordingly
    c.fillStyle = options.labelColor;
    if (options.displayValue.toUpperCase() === "TOP"){
      valuePosition = options.chartHeight - output[i][1];
    }else if (options.displayValue.toUpperCase() === "CENTRE"){
      valuePosition = options.chartHeight - output[i][1] / 2;
    }else if (options.displayValue.toUpperCase() === "BOTTOM"){
      valuePosition = options.chartHeight - 2;
    }
    c.fillText(output[i][0], options.barSpacing + barWidth / output.length + 40 + (i * (options.barSpacing + barWidth)) + barWidth / 3 , valuePosition);
  }
}

// this function will display X-Y properties for the chart
function chartAxes(output, options, barWidth, maxIndex, canvas){
  // this section is for X-axis, display label
  var c = canvas.getContext("2d");
  c.fillStyle = options.labelColor;


  for(var i = 0; i < output.length; i++){
    c.fillText("value " + (i+1).toString(), options.barSpacing + barWidth / output.length + 40 + (i * (options.barSpacing + barWidth)), options.chartHeight + 20);
  }

  // this section is for Y-axis, display certain value based on client's input
  //display 0
  c.fillText(0, 10, options.chartHeight);
  c.beginPath();
  c.moveTo(40, options.chartHeight);
  c.lineTo(30, options.chartHeight);
  c.stroke();

  // yMaxPosition will determine where the max value of Y-axis will be displayed
  var yMaxPosition = options.chartHeight - options.yMax / output[maxIndex][0] * output[maxIndex][1];
  // display each lable on Y-axis
  for (i = 0; i < options.yInterval; i++){
    var value = options.yMax - i * options.yMax / options.yInterval;
    var x = 10;
    var y = yMaxPosition + i * (options.chartHeight - yMaxPosition) / options.yInterval;
    c.fillText(value, x, y);
    c.beginPath();
    c.moveTo(40, y);
    c.lineTo(30, y);
    c.stroke();
  }
} // end of chartAxes function

function generateLabel(options, canvas){
  // generate X label
  var c = canvas.getContext("2d");
  c.fillStyle = options.labelColor;
  c.font = options.xLabel.fontSize + " Arial";
  c.fillText(options.xLabel.value.toUpperCase(), options.chartWidth / 2, options.chartHeight + 50);
  // generate Y Label
  c.font = options.yLabel.fontSize + " Arial";
  c.fillText(options.yLabel.value.toUpperCase(), 10, 20);
  // generate Chart Title
  c.font = options.title.fontSize + " Arial";
  c.textAlign = "center";
  c.fillText(options.title.value.toUpperCase(), options.chartWidth / 2, 30);
}

// call this main function to generate bar chart
drawBarChart(data, options, element);






















