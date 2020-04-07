import React, { Component } from "react";
import { Doughnut, HorizontalBar } from "react-chartjs-2";
class Charts extends Component {
  render() {
    const { caseGender } = this.props;
    return (
      <React.Fragment>
        <Doughnut
          data={{
            labels: ["Female", "Male"],
            datasets: [
              {
                label: "# of Cases",
                data: [caseGender.female, caseGender.male],
                backgroundColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                ],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
              },
            ],
          }}
        />
        <br></br>
        <center>
          <strong className="text-white">Confirmed Cases by Age</strong>
        </center>
        <HorizontalBar
          width={100}
          height={88}
          data={{
            labels: [
              "Age 90 to 99",
              "Age 80 to 89",
              "Age 70 to 79",
              "Age 60 to 69",
              "Age 50 to 59",
              "Age 40 to 49",
              "Age 30 to 39",
              "Age 20 to 29",
              "Age 10 to 19",
              "Age 0 to 9",
            ],
            datasets: [
              {
                label: "Total No. of Cases",
                data: [
                  caseGender.to99,
                  caseGender.to89,
                  caseGender.to79,
                  caseGender.to69,
                  caseGender.to59,
                  caseGender.to49,
                  caseGender.to39,
                  caseGender.to29,
                  caseGender.to19,
                  caseGender.to9,
                ],
                backgroundColor: [
                  "#81d4fa",
                  "#80cbc4",
                  "#a5d6a7",
                  "#7e57c2",
                  "#7986cb",
                  "#ef9a9a",
                  "#ffcc80",
                  "#fff59d",
                  "#ffab91",
                  "#e6ee9c ",
                ],
                borderColor: [
                  "#81d4fa",
                  "#80cbc4",
                  "#a5d6a7",
                  "#7e57c2",
                  "#7986cb",
                  "#ef9a9a",
                  "#ffcc80",
                  "#fff59d",
                  "#ffab91",
                  "#e6ee9c ",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            legend: {
              display: false,
            },
          }}
        />
      </React.Fragment>
    );
  }
}

export default Charts;
