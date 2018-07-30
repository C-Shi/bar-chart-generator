# ABOUT
**This is an API for bar chart generation. An user simply call functions passing in relavent argument, a bar chart will be render to the page**

# EXAMPLE
**An example of the output could be view as"**

./exmaple.PNG

# HOW TO USE
Include main.js file in your html page, exports as an module

When using this API, call drawBarChart() function and passing three argument:

``
drawBarChart(data, options, element)
``

The first argument is an array containing the data set
``
var data = [1,2,3,5,4,5, 7, 10, 8, 20];
``

The second argument is an object defining how the char will looks like
``
var options = {
  chartWidth: 1000,
  chartHeight: 300,
  barSpacing: 30,
  barColor: "rgba(0, 255, 0, 0.5)",
  labelColor: "gray",
  yMax: 100,
  yInterval: 20,
  xLabel: {value: "year", fontSize: "15px"},
  yLabel: {value: "profit", fontSize: "10px"},
  title: {value: "Proft Summary for the Company", fontSize:"20px"},
  displayValue: "centre"
};
``

The last argument is string indicating where the char will be render to, it should be an html element, an id or a classname
``
var element = "body";
``

# LIST OF KNOWN BUG AND ISSUE
The styling of the graph is not 100% customizable, such as margin and padding

# ROADMAP
This project is dedicated within a limited amount of time. If more time given, a multiple value chart will be created
