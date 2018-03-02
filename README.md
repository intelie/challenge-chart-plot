# Plotting a chart

In this challenge, you will implement a web application that plots a line chart based on some manually input data.

The input data is a sequence of events. This sequence represents the output of a query, which is omitted for simplicity. The data will be manually input by the final user instead. Based on the input sequence of events, you may generate a time based line chart containing one or more series.

## Definitions
An event is a set of keys and values. For this challenge, it will be represented as a JSON. 

```
{a: 1, b: 2}
```

On our system, each event has two mandatory fields: timestamp and type. All other fields are optional.

* *timestamp* field holds the moment that the event refers to. It is formatted as a regular [Javascript timestamp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)

* *type* field holds the definition of what is represented on each event. Its value can be one of the following:

### start
Events of type *start* define that a new sequence of data events will follow, along with the fields that may be plotted and their grouping. A group is a category for splitting the same variable into different series.

Example:
```
{type: 'start', timestamp: 1519780251293, select: ['min_response_time', 'max_response_time'], group: ['os', 'browser']}
```
The above event defines that, for each different value of the pair (os, browser), we may plot two lines: one that represents the minimum response time, and one that represents the maximum response time. That is: if there are two different values for os and two different values for browser, we should have 8 different lines plotted.

### span
Events of type *span* define what is the visible date range for the chart. A new event of this type may make the chart update its boundaries.

Example:
```
{type: 'span', timestamp: 1519780251293, begin: 1519780251293, end: 1519780260201}
```
This event defines that the data should be plotted inside the interval between the begin and end values, that is, timestamps 1519780251293 and 1519780260201, respectivelly. All data outside this range may be ignored.

### stop
Events of type *stop* define that no more data events will follow. After an event of this type, the chart is still useful for the user, although. Any events that eventually follow a stop event should be ignored, except for a new start, which would restart the process.

Example:
```
{type: 'stop', timestamp: 1519780251293}
```

### data
Events of type *data* define the content that will be displayed on the chart.

Example
```
{type: 'data', timestamp: 1519780251000, os: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3}
```

> Note that absent data values for the fields defined by *select* and *group* also generate new series. On the other hand, fields that are not defined should be ignored.

## The challenge

We expect you to:

* Provide an input on the user interface to allow plotting different sequences of events;
* Based on an arbitrary sequence of events, plot the chart that represents the output for that sequence;
* Follow the layout indication provided on the prototype below;
* Write tests;
* Suggest and implement a protection for this application to deal with huge amount of data;
* Justify design choices, arguing about costs and benefits involved. You may write those as comments inline or, if you wish, provide a separate document summarizing those choices;
* Write all code and documentation in english

![challenge_frontend](https://github.com/intelie/challenge-chart-plot/raw/master/challenge_frontend.png "Expected user interface")

Although you can choose any graphical library to plot the chart, we suggest that you use a declarative JS framework to build the application such as ReactJS.

## Solve this challenge

To solve this challenge, you may fork this repository, then
send us a link with your implementation. Alternatively, if you do not want to have this repo on
your profile (we totally get it), send us a
[git patch file](https://www.devroom.io/2009/10/26/how-to-create-and-apply-a-patch-with-git/)
with your changes.

There is no unique solution to this challenge. The intent is to evaluate candidate's ability and familiarity with tools and best practices.

If you are already in the hiring process, you may send it to whoever is your contact at Intelie. If you wish to apply for a job at Intelie, please send your solution to [trabalhe@intelie.com.br](mailto:trabalhe@intelie.com.br).



