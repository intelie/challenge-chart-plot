import { Fragment, useEffect, useState } from "react";
import logo from "./logo.svg";
// import { CodeJar } from "codejar";
// import Editor from "react-simple-code-editor";
// import { highlight, languages } from "prismjs/components/prism-core";
// import "prismjs/components/prism-clike";
// import "prismjs/components/prism-javascript";
// import "prismjs/components/prism-json";
// import "prismjs/themes/prism-okaidia.css"; //Example style, you can use another
// import hljs from "highlight.js/lib/core";
// import json from "highlight.js/lib/languages/json";

// import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import Highlight from "react-highlight";
// // import 'bootstrap/'

import { ResponsiveLine } from "@nivo/line";
import { Controlled as CodeMirror } from "react-codemirror2";
// import CodeMirror from "@uiw/react-codemirror";
// import "codemirror/keymap/sublime";
// import "codemirror/theme/monokai.css";
import "codemirror/addon/display/autorefresh";
import "codemirror/addon/comment/comment";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/lint/javascript-lint";
import "codemirror/addon/scroll/simplescrollbars";
import "codemirror/addon/selection/active-line";
import "codemirror/keymap/sublime";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/seti.css";
import "codemirror/mode/javascript/javascript";

function App() {
  // const [codeString, setCodeString] = useState(
  //   `function add(a, b) {\n  return a + b;\n}`
  // );
  const [codeString, setCodeString] = useState(
    `{type: 'start', timestamp: 1519780251293, select: ['min_response_time', 'max_response_time'], group: ['os', 'browser']}
    {type: 'span', timestamp: 1519780251293, begin: 1519780251293, end: 1519780260201}
    {type: 'data', timestamp: 1519780251000, os: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3}
    {type: 'data', timestamp: 1519780251000, os: 'mac', browser: 'chrome', min_response_time: 0.2, max_response_time: 1.2}
    {type: 'data', timestamp: 1519780251000, os: 'mac', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.2}
    {type: 'data', timestamp: 1519780251000, os: 'linux', browser: 'firefox', min_response_time: 0.1, max_response_time: 1.0}
    {type: 'data', timestamp: 1519780251000, os: 'linux', browser: 'chrome', min_response_time: 0.2, max_response_time: 0.9}
    {type: 'data', timestamp: 1519780251000, os: 'mac', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.0}
    {type: 'data', timestamp: 1519780251000, os: 'mac', browser: 'firefox', min_response_time: 0.2, max_response_time: 1.1}
    {type: 'data', timestamp: 1519780251000, os: 'linux', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.4}
    {type: 'stop', timestamp: 1519780260201}
    `
  );

  let dataStartSequencie, dataStopSequencie, dataExecutionTime;
  let sequencies = codeString
    .toString()
    .replaceAll("{", "")
    .replaceAll("}", "")
    .split("\n");

  console.log(sequencies);

  for (let index = 0; index < sequencies.length; index++) {
    const sequencie = sequencies[index];
    const startSequencie = sequencie.includes("start");
    const stopSequencie = sequencie.includes("stop");

    if (startSequencie || stopSequencie) {
      if (sequencie) {
        let newSequencie = sequencie.split(",");
        let checkTimestamp = newSequencie[1];

        if (checkTimestamp) {
          let timestamp = checkTimestamp.split(":");
          let keyTimestamp = timestamp[0];
          let valueTimestamp = timestamp[1];

          if (keyTimestamp) {
            keyTimestamp = keyTimestamp.replaceAll("'", "").replaceAll(" ", "");
          }

          if (valueTimestamp) {
            valueTimestamp = valueTimestamp
              .replaceAll("'", "")
              .replaceAll(" ", "");

            if (startSequencie) {
              console.log(valueTimestamp);
              dataStartSequencie = valueTimestamp;
            }

            if (stopSequencie) {
              console.log(valueTimestamp);
              dataStopSequencie = valueTimestamp;
            }
          }
        }
      }
    }
  }

  dataExecutionTime =
    new Date(dataStopSequencie * 1) - new Date(dataStartSequencie * 1);
  dataExecutionTime = dataExecutionTime / 1000;

  console.log(dataExecutionTime / 1000);
  console.log(dataStartSequencie);
  console.log(dataStopSequencie);
  console.log(
    "Date: " +
      new Date(dataStartSequencie * 1).getDate() +
      "/" +
      (new Date(dataStartSequencie * 1).getMonth() + 1) +
      "/" +
      new Date(dataStartSequencie * 1).getFullYear() +
      " " +
      new Date(dataStartSequencie * 1).getHours() +
      ":" +
      new Date(dataStartSequencie * 1).getMinutes() +
      ":" +
      new Date(dataStartSequencie * 1).getSeconds()
  );
  let d1 = 1519780251293 * 1;
  let d2 = 1519780260201 * 1;
  console.log(new Date(1519780251293 * 1).getSeconds());
  console.log(new Date(1519780260201 * 1).getSeconds());
  console.log(new Date(dataStopSequencie * 1).getTime());

  console.log(sequencies);

  let plot = [];

  for (let index = 0; index < sequencies.length; index++) {
    const sequencie = sequencies[index];

    if (sequencie) {
      let newSequencie = sequencie.split(",");

      let checkType = newSequencie[0];
      let checkTimestamp = newSequencie[1];
      let checkOs = newSequencie[2];
      let checkBrowser = newSequencie[3];
      let checkMinResponseTime = newSequencie[4];
      let checkMaxResponseTime = newSequencie[5];

      let dataType,
        dataTimestamp,
        dataOs,
        dataBrowser,
        dataKeyMinResponseTime,
        dataKeyMaxResponseTime,
        dataMinResponseTime,
        dataMaxResponseTime,
        dataGroupId;

      if (checkType) {
        let type = checkType.split(":");
        let keyType = type[0];
        let valueType = type[1];
        if (keyType) {
          keyType = keyType.replaceAll("'", "").replaceAll(" ", "");
        }

        if (valueType) {
          valueType = valueType.replaceAll("'", "").replaceAll(" ", "");
          dataType = valueType;
        }
      }
      // console.log(dataType);

      if (checkTimestamp) {
        let timestamp = checkTimestamp.split(":");
        let keyTimestamp = timestamp[0];
        let valueTimestamp = timestamp[1];
        if (keyTimestamp) {
          keyTimestamp = keyTimestamp.replaceAll("'", "").replaceAll(" ", "");
        }
        if (valueTimestamp) {
          valueTimestamp = valueTimestamp
            .replaceAll("'", "")
            .replaceAll(" ", "");
          dataTimestamp = valueTimestamp;
        }
      }

      if (checkOs) {
        let os = checkOs.split(":");
        let keyOs = os[0];
        let valueOs = os[1];
        if (keyOs) {
          keyOs = keyOs.replaceAll("'", "").replaceAll(" ", "");
        }
        if (valueOs) {
          valueOs = valueOs.replaceAll("'", "").replaceAll(" ", "");
          dataOs = valueOs;
        }
      }

      if (checkBrowser) {
        let browser = checkBrowser.split(":");
        let keyBrowser = browser[0];
        let valueBrowser = browser[1];
        if (keyBrowser) {
          keyBrowser = keyBrowser.replaceAll("'", "").replaceAll(" ", "");
        }
        if (valueBrowser) {
          valueBrowser = valueBrowser.replaceAll("'", "").replaceAll(" ", "");
          dataBrowser = valueBrowser;
        }
      }

      if (dataType == "data" && checkMinResponseTime) {
        let minResponseTime = checkMinResponseTime.split(":");
        let keyMinResponseTime = minResponseTime[0];
        let valueMinResponseTime = minResponseTime[1];
        if (keyMinResponseTime) {
          keyMinResponseTime = keyMinResponseTime
            .replaceAll("'", "")
            .replaceAll(" ", "");
          dataKeyMinResponseTime = keyMinResponseTime;
        }
        if (valueMinResponseTime) {
          valueMinResponseTime = valueMinResponseTime
            .replaceAll("'", "")
            .replaceAll(" ", "");
          dataMinResponseTime = valueMinResponseTime;
        }
      }

      if (dataType == "data" && checkMaxResponseTime) {
        let maxResponseTime = checkMaxResponseTime.split(":");
        let keyMaxResponseTime = maxResponseTime[0];
        let valueMaxResponseTime = maxResponseTime[1];
        if (keyMaxResponseTime) {
          keyMaxResponseTime = keyMaxResponseTime
            .replaceAll("'", "")
            .replaceAll(" ", "");
          dataKeyMaxResponseTime = keyMaxResponseTime;
        }
        if (valueMaxResponseTime) {
          valueMaxResponseTime = valueMaxResponseTime
            .replaceAll("'", "")
            .replaceAll(" ", "");
          dataMaxResponseTime = valueMaxResponseTime;
        }
      }

      // console.log(plot);

      if (dataType == "data" && dataTimestamp) {
        plot[index] = {};
        // plot[index]["id"] = dataGroupId;
        plot[index]["data"] = [];
        plot[index]["data"][0] = {};
        plot[index]["data"][0]["x"] = 0;
        plot[index]["data"][0]["y"] = dataMinResponseTime;
        plot[index]["data"][1] = {};
        plot[index]["data"][1]["x"] = dataExecutionTime;
        plot[index]["data"][1]["y"] = dataMaxResponseTime;
      }

      if (dataType == "data" && plot && plot.length > 0) {
        for (let plotIndex = 0; plotIndex < plot.length; plotIndex++) {
          if (typeof plot[plotIndex] != "undefined") {
            const id = plot[plotIndex]["id"];
            console.log("id: ", id);
            console.log(plot[plotIndex]);
            console.log(
              "data: ",
              dataOs + " " + dataBrowser + " " + dataKeyMinResponseTime
            );
            if (
              id ==
              dataOs + " " + dataBrowser + " " + dataKeyMinResponseTime
            ) {
              dataGroupId =
                dataOs + " " + dataBrowser + " " + dataKeyMaxResponseTime;
              break;
            } else {
              dataGroupId =
                dataOs + " " + dataBrowser + " " + dataKeyMinResponseTime;
            }
          }
        }
      }

      if (dataType == "data" && dataTimestamp) {
        plot[index]["id"] = dataGroupId;
      }
    }
  }

  console.log(plot);

  useEffect(() => {}, []);

  const [data, setData] = useState([
    {
      id: "japan",
      color: "hsl(232, 70%, 50%)",
      data: [
        {
          x: 0,
          y: 110,
        },
        // {
        //   x: 1,
        //   y: 223,
        // },
        // {
        //   x: 2,
        //   y: 311,
        // },
        {
          x: 1000,
          y: 511,
        },
      ],
    },
    {
      id: "norway",
      color: "hsl(215, 70%, 50%)",
      data: [
        {
          x: 0,
          y: 234,
        },
        // {
        //   x: 1,
        //   y: 234,
        // },
        // {
        //   x: 2,
        //   y: 334,
        // },
        {
          x: 1000,
          y: 434,
        },
      ],
    },
  ]);

  // console.log(data);

  const MyResponsiveLine = () => {
    // console.log(data);
    return (
      <ResponsiveLine
        data={plot}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 200,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 400,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    );
  };

  return (
    <>
      <header className="container-fluid">
        <div className="container ">Chart Challenge</div>
      </header>

      <div className="container-fluid">
        {/* <textarea name=""></textarea> */}

        {/* <pre className="">
          <code className="json">
            <Editor
              value={codeString}
              onValueChange={(code) => setCodeString(code)}
              highlight={(code) => highlight(code, languages.json)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
              }}
            />
          </code>
        </pre> */}
        <CodeMirror
          value={codeString}
          options={{
            mode: "javascript",
            keyMap: "sublime",
            theme: "monokai",
            lineNumbers: true,
            styleActiveLine: true,
            viewportMargin: 5,
          }}
          onBeforeChange={(editor, data, value) => {
            setCodeString(value);
          }}
          onChange={(editor, data, value) => {
            setCodeString(value);
          }}
        />
        {/* <CodeMirror
          value={codeString}
          options={{
            theme: "monokai",
            keyMap: "sublime",
            mode: "json",
          }}
          onBeforeChange={(editor, data, value) => {
            console.log(editor);
            console.log(data);
            console.log(value);
          }}
          onChange={(editor, data, value) => {
            console.log(editor);
            console.log(data);
            console.log(value);
          }}
        /> */}
        {/* <pre className="">
          <code className="json">{codeString}</code>
        </pre>
        <pre className="">
          <code className="editor json">{`{erick:"teste"}`}</code>
        </pre> */}
        {/* <Highlight className="json">{`{erick:"teste"}`}</Highlight> */}
      </div>

      <main
        className="container-fluid"
        style={{ height: "100%", maxHeight: "500px" }}
      >
        <div className="container" style={{ height: "100%" }}>
          {<MyResponsiveLine /> && <MyResponsiveLine />}
        </div>
      </main>

      <footer className="container-fluid">
        <div className="container ">
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Button with data-bs-target
          </button>
          <div className="collapse" id="collapseExample">
            <div className="card card-body">
              Some placeholder content for the collapse component. This panel is
              hidden by default but revealed when the user activates the
              relevant trigger.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
