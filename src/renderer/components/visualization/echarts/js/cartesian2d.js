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
      orient: 'vertical',
      top: '20px',
      right: '10px',
      bottom: '10px'
    },
    grid: {
      left: '10%'
    },
    xAxis: {type: 'category'}, // 如果是时间呢???
    yAxis: {},
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        let tooltip = ''
        params.forEach((e, index) => {
          tooltip += `<div>${e.marker} ${e.seriesName} ${e.data[index + 1]}</div>\n`
        })
        tooltip = `<div><div style="text-align: center;">${params[0].data[0]}</div>` + tooltip + '</div>'
        // console.log(tooltip)
        return tooltip
      }
    },
    dataset: {
      source: arg.hasOwnProperty('data') ? arg.data : [[]],
      sourceHeader: true
    },
    series: []
  }

  if (arg.hasOwnProperty('type') && (arg.type === 'ybar')) {
    option.xAxis = {}
    option.yAxis = {
      type: 'category'
    }
  }

  return option
}

/**
 *
 * @param {array} series -- 系列的type字符串
 */
function seriesUpdate (seriesArr) {
  let s = []

  seriesArr.forEach((e, i) => {
    let series

    if (e === 'line') {
      series = {
        type: 'line',
        smooth: true,
        encode: {
          x: [0], // x轴始终在第一行/列
          y: [i + 1],
          seriesName: [i + 1]
        },
        seriesLayoutBy: 'row'
      }
    } else if (e === 'bar') {
      series = {
        type: 'bar',
        smooth: true,
        label: {
          show: true,
          position: 'top'
        },
        encode: {
          x: [0], // x轴始终在第一行/列
          y: [i + 1],
          seriesName: [i + 1]
        },
        seriesLayoutBy: 'row'
      }
    } else if (e === 'ybar') {
      series = {
        type: 'bar',
        smooth: true,
        label: {
          show: true,
          position: 'right'
        },
        encode: {
          y: [0], // x轴始终在第一行/列 --> 行列转置
          x: [i + 1],
          seriesName: [i + 1]
        },
        seriesLayoutBy: 'row'
      }
    }

    s.push(series)
  })

  return s
}

export default { optionInit, seriesUpdate }
