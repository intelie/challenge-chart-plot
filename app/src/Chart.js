import { Fragment, useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./chart.scss";
import { ResponsiveLine } from "@nivo/line";
import { Controlled as CodeMirror } from "react-codemirror2";
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
  const [cleanChartClick, setCleanChartClick] = useState(false);
  const [plotFilled, setPlotFilled] = useState(false);
  const [plotState, setPlotState] = useState(null);
  const [generateChartClick, setGenerateChartClick] = useState(false);
  const [plotDefault, setPlotDefault] = useState([
    {
      id: "Default",
      data: [
        {
          x: "",
          y: 0,
        },
        {
          x: "",
          y: 1,
        },
      ],
    },
  ]);

  const handlePlot = useCallback(
    (plot) => {
      if (plot && !plotFilled) {
        setPlotState(plot);
        setPlotFilled(true);
      }

      if (plotFilled && plotState) {
        setPlotState(null);
        setPlotFilled(false);
      }
    },
    [plotState, plotFilled]
  );

  let dataStartSequencie, dataStopSequencie, dataExecutionTime;
  let sequencies = codeString
    .toString()
    .replaceAll("{", "")
    .replaceAll("}", "")
    .split("\n");

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
              dataStartSequencie = valueTimestamp;
            }

            if (stopSequencie) {
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

      if (dataType == "data" && dataTimestamp) {
        plot[index] = {};
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

  useEffect(() => {
    if (generateChartClick) {
      handlePlot(plot);
      setGenerateChartClick(false);
    }

    if (cleanChartClick) {
      handlePlot();
      setCleanChartClick(false);
    }
  }, [generateChartClick, handlePlot, plot, cleanChartClick]);

  const MyResponsiveLine = () => {
    return (
      <ResponsiveLine
        data={!plotState ? plotDefault : plotState}
        margin={{ top: 50, right: 420, bottom: 50, left: 60 }}
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
        axisRight={{
          orient: "right",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "max_response_time",
          legendOffset: 20,
          legendPosition: "middle",
        }}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "time in seconds",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "min_response_time",
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
            translateX: 250,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 200,
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
      <header className="container-fluid">Chart Challenge</header>

      <div className="container-fluid p-0">
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
      </div>

      <main className="container-fluid editor">
        {<MyResponsiveLine /> && <MyResponsiveLine />}
      </main>

      <footer className="container-fluid">
        {!plotState ? (
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => setGenerateChartClick(true)}
          >
            Generate Chart
          </button>
        ) : (
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => setCleanChartClick(true)}
          >
            Clean Chart
          </button>
        )}
      </footer>
    </>
  );
}

export default App;
