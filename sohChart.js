// SOH
// <canvas id="sohChart"></canvas>

// data
const batteryDiagResults = [
    {
      carNumber: "101하 8880",
      vehicleId: "KNACB81GFNA114915",
      diagCompleteTime: "2022-01-01",
      diagStatus: "DIAG_SUCCESS",
      diagErrorCode: "0",
      phoneNumber: "01044980156",
      carClassName: "뉴 니로 EV",
      yearType: "2021",
      odometer: 14133,
      auxVolt: 14.6,
      batteryCapacity: 64,
      packSoc: 46,
      packVolt: 357.4,
      packCurrent: 2.9,
      packTemperature: 25.25,
      sohStats: 98.016005,
      linearEquationConstantA: -0.0000359813,
      linearEquationConstantB: 98.1406,
      dtcCount: 0,
      isoResistanceStatus: "GOOD",
      batteryTemperatureStatus: "GOOD",
      batteryBalancingStatus: "GOOD",
      cellVoltMax: 4,
      cellVoltMin: 4,
      batteryTemperatureMax: 19,
      batteryTemperatureMin: 18,
      electricEfficiency: 4.9,
      accurateChargeEnergy: 533.9,
      accurateDischargeEnergy: 510,
    },
    {
      carNumber: "101하 8880",
      vehicleId: "KNACB81GFNA114915",
      diagCompleteTime: "2022-04-01",
      diagStatus: "DIAG_SUCCESS",
      diagErrorCode: "0",
      phoneNumber: "01044980156",
      carClassName: "뉴 니로 EV",
      yearType: "2021",
      odometer: 24133,
      auxVolt: 14.6,
      batteryCapacity: 64,
      packSoc: 46,
      packVolt: 357.4,
      packCurrent: 2.9,
      packTemperature: 25.25,
      sohStats: 97.9,
      linearEquationConstantA: -0.0000359813,
      linearEquationConstantB: 98.1406,
      dtcCount: 2,
      isoResistanceStatus: "NORMAL",
      batteryTemperatureStatus: "GOOD",
      batteryBalancingStatus: "GOOD",
      cellVoltMax: 4,
      cellVoltMin: 4,
      batteryTemperatureMax: 19,
      batteryTemperatureMin: 17,
      electricEfficiency: 4.8,
      accurateChargeEnergy: 540.9,
      accurateDischargeEnergy: 530,
    },
    {
      carNumber: "101하 8880",
      vehicleId: "KNACB81GFNA114915",
      diagCompleteTime: "2022-07-01",
      diagStatus: "DIAG_SUCCESS",
      diagErrorCode: "0",
      phoneNumber: "01044980156",
      carClassName: "뉴 니로 EV",
      yearType: "2021",
      odometer: 34133,
      auxVolt: 14.6,
      batteryCapacity: 64,
      packSoc: 46,
      packVolt: 357.4,
      packCurrent: 2.9,
      packTemperature: 25.25,
      sohStats: 97.21,
      linearEquationConstantA: -0.0000359813,
      linearEquationConstantB: 98.1406,
      dtcCount: 0,
      isoResistanceStatus: "BAD",
      batteryTemperatureStatus: "NORMAL",
      batteryBalancingStatus: "GOOD",
      cellVoltMax: 3.9,
      cellVoltMin: 3.9,
      batteryTemperatureMax: 18,
      batteryTemperatureMin: 17.5,
      electricEfficiency: 5,
      accurateChargeEnergy: 570.8,
      accurateDischargeEnergy: 560,
    },
    {
      carNumber: "101하 8880",
      vehicleId: "KNACB81GFNA114915",
      diagCompleteTime: "2022-10-01",
      diagStatus: "DIAG_SUCCESS",
      diagErrorCode: "0",
      phoneNumber: "01044980156",
      carClassName: "뉴 니로 EV",
      yearType: "2021",
      odometer: 44133,
      auxVolt: 14.6,
      batteryCapacity: 64,
      packSoc: 46,
      packVolt: 357.4,
      packCurrent: 2.9,
      packTemperature: 25.25,
      sohStats: 96.9,
      linearEquationConstantA: -0.0000359813,
      linearEquationConstantB: 98.1406,
      dtcCount: 1,
      isoResistanceStatus: "GOOD",
      batteryTemperatureStatus: "GOOD",
      batteryBalancingStatus: "BAD",
      cellVoltMax: 3.95,
      cellVoltMin: 3.95,
      batteryTemperatureMax: 19,
      batteryTemperatureMin: 19,
      electricEfficiency: 5.1,
      accurateChargeEnergy: 580,
      accurateDischargeEnergy: 570,
    },
  ];

  // SOH
  const sohCanvas = document.getElementById("sohChart");

  const odometerLabel = [0, 50000, 100000, 150000, 200000, 250000, 300000];
  const areaLabel = [80, 80, 80, 80, 80, 80, 80];
  const sohEquationConstantA =
    batteryDiagResults[batteryDiagResults.length - 1]
      .linearEquationConstantA;
  const sohEquationConstantB =
    batteryDiagResults[batteryDiagResults.length - 1]
      .linearEquationConstantB;
  const sohDatasetData = odometerLabel.map(
    (cur) => cur * sohEquationConstantA + sohEquationConstantB
  );

  const sohStats = batteryDiagResults.map((cur) => {
    return {
      x: cur.odometer,
      y: cur.sohStats,
    };
  });

  const sohScatterData = {
    labels: odometerLabel,
    datasets: [
      {
        type: "scatter",
        backgroundColor: "rgb(230, 103, 38)",
        borderColor: "rgb(230, 103, 38)",
        label: "SoH Stats",
        data: sohStats,
        xAxisID: "x", // x축과 연결
      },
      {
        type: "line",
        label: "SoH Chart",
        data: sohDatasetData,
        // backgroundColor: "rgb(0, 0, 255)",
        borderColor: "rgb(75, 135, 203)",
        xAxisID: "x2", // 별도의 x축과 연결
        pointStyle: false,
      },
      {
        type: "line",
        label: "Danger",
        data: areaLabel,
        backgroundColor: "rgba(230, 103, 38, 0.5)",
        borderColor: "rgb(230, 103, 38)",
        xAxisID: "x2",
        pointStyle: false,
        fill: "start",
      },
    ],
  };

  new Chart(sohCanvas, {
    type: "scatter",
    data: sohScatterData,
    options: {
      plugins: {
        title: {
          // 제목
          display: true,
          text: "SoH Chart",
        },
        tooltip: {
          filter: function (tooltipItem) {
            // show only scatter tooltip
            if (tooltipItem.dataset.type === "scatter") {
              return true;
            }
          },
        },
        legend: {
          // 범례 미표시
          display: false,
        },
      },
      scales: {
        x: {
          min: 0,
          max: 300000,
          ticks: {
            stepSize: 50000,
          },
          display: false,
        },
        x2: {
          min: 0,
          max: 300000,
          ticks: {
            stepSize: 50000,
          },
          // 별도의 x축
          // position: "bottom",
          // type: "category",
          // display: false,
        },
        y: {
          min: 70,
          max: 100,
          ticks: {
            stepSize: 10,
            color: function (context) {
              if (context.tick.value <= 80) {
                return "rgb(230, 103, 38)";
              }
              return "rgb(195, 195, 195)";
            },
          },
          grid: {
            color: function (context) {
              if (context.tick.value <= 70) {
                return "rgb(230, 103, 38)";
              }
              return "rgb(195, 195, 195)";
            },
          },
        },
      },
    },
  });