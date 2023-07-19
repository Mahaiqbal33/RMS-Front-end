// import React from "react";
// import Chart from "react-apexcharts";

// const PieChartDemo = ({ overallPercentage }) => {
//   const pieChartData = {
//     series: [overallPercentage],
//   };

//   const pieChartOptions = {
//     labels: ["Overall Percentage"],
//     colors: ["#0066cc"], // Darker color for active segment
//     dataLabels: {
//       enabled: false,
//     },
//     legend: {
//       show: false,
//     },
//     plotOptions: {
//       pie: {
//         size: "55%", // Adjust the size of the pie chart
//         donut: {
//           size: "80%", // Adjust the size of the donut hole
//           labels: {
//             show: true, // Show the labels inside the donut chart
//             name: {
//               show: true, // Show the name of the data (optional)
//             },
//             value: {
//               show: true, // Show the value (percentage) inside the donut chart
//               formatter: function (val) {
//                 return `${val.toFixed(2)}%`; // Customize the formatting of the value
//               },
//             },
//           },
//         },
//       },
//     },
//     tooltip: {
//       enabled: false,
//     },
//     fill: {
//       opacity: 1, // To remove the background opacity
//     },
//     stroke: {
//       show: true,
//       width: 2, // Set the width of the circle border
//       colors: "#ffffff", // Set the color of the circle border to white
//     },
//     responsive: [
//       {
//         breakpoint: 768,
//         options: {
//           chart: {
//             width: "100%",
//           },
//           legend: {
//             position: "bottom",
//           },
//         },
//       },
//     ],
//   };

//   return (
//     <div className="pie-chart">
//         <div className="percentage-text"></div>
//       <Chart options={pieChartOptions} series={pieChartData.series} type="donut" width="40%" />
      
//     </div>
//   );
// };

// export default PieChartDemo;


import React from "react";
import Chart from "react-apexcharts";

const PieChartDemo = () => {
  const progress = 80; // Set the progress value to 80 (80% out of 100)

  const options = {
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: true,
            fontSize: "22px",
            color: "#fff",
            offsetY: 8,
            formatter: function (val) {
              return `${val}%`; // Format the value as a percentage with a % symbol
            },
          },
        },
      },
    },
    labels: ["Progress"],
  };

  const series = [progress];

  return (
    <div className="pie-chart">
      <div className="percentage-text">Chart</div>
      <Chart options={options} series={series} type="radialBar" width={300} height={350} />
    </div>
  );
};

export default PieChartDemo;




