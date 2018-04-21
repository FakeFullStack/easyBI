function optionInit (arg) {
  let option = {
    title: {
      text: arg.hasOwnProperty('title') ? arg.title : '',
      textStyle: {
        fontSize: 12
      },
      left: 5,
      top: 5
    },
    legend: {
      type: 'scroll',
      // orient: 'vertical',
      top: '20px',
      right: '10px',
      bottom: '10px'
    },
    dataset: {
      source: arg.hasOwnProperty('data') ? arg.data : [[]]
    },
    tooltip: {
      formatter: function (params) {
        // console.log(params)
        return `
          <div style="text-align: center;">
            ${params.marker}
            <span>${params.data[0]}</span>
            <br>
            <span>${params.data[1]}&ensp;${params.percent.toFixed(2)}%</span>
          </div>
        `
      }
    },
    series: [
      {
        type: 'pie',
        labelLine: {
          show: true,
          length: 8,
          length2: 4
        },
        label: {
          // backgroundColor: 'rgba(0, 0, 0, 0.8)'
        },
        selectedMode: 'singe',
        center: ['50%', '55%'],
        radius: [0, '55%'],
        seriesLayoutBy: 'row'
      }
    ],
    animationThreshold: 2000
  }
  return option
}

export default { optionInit }
