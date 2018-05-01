const pie = require('../../assets/newChartsImg/pie.png')
const line = require('../../assets/newChartsImg/line.png')
const bar = require('../../assets/newChartsImg/bar.png')
const ybar = require('../../assets/newChartsImg/ybar.png')

function randomIndex () {
  let d = new Date()
  return d.getTime() + '.' + Math.floor(Math.random() * 1000)
}

function newCharts () {
  return [
    {
      label: '饼图',
      url: pie,
      cfg: {
        index: null,
        name: '🍕',
        type: 'pie',
        // isedit: true,
        outline: [0, 0],
        data: [['🍕', '🍔', '🍟', '🌭'], [35, 54, 13, 60]]
      }
    },
    {
      label: '折线图',
      url: line,
      cfg: {
        index: null,
        name: '📈',
        type: 'line',
        isedit: true,
        outline: [0, 0],
        data: [['食物', '🍕', '🍔', '🍟', '🌭'], ['数量', 35, 54, 13, 60]]
      }
    },
    {
      label: '柱状图',
      url: bar,
      cfg: {
        index: null,
        name: '📊',
        type: 'bar',
        isedit: true,
        outline: [0, 0],
        data: [['食物', '🍕', '🍔', '🍟', '🌭'], ['数量', 35, 54, 13, 60]]
      }
    },
    {
      label: '柱状图',
      url: ybar,
      cfg: {
        index: null,
        name: '📊',
        type: 'ybar',
        isedit: true,
        outline: [0, 0],
        data: [['食物', '🍕', '🍔', '🍟', '🌭'], ['数量', 35, 54, 13, 60]]
      }
    }
  ]
}

export default { newCharts, randomIndex }
