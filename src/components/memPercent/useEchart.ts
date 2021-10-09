

const option = {
  title: {
    text: "内存用量",
    left: "center"
    , textStyle: {
      color: '#fff'
    }
  },
  // tooltip: {
  //   trigger: "item",
  //   formatter: "{a} <br/>{b} : {c} ({d}%)"
  // },
  // legend: {
  //   orient: "vertical",
  //   left: "left",
  //   data: ["已用", "剩余"]
  // },
  color: ['#b03a5b', '#91cc75']
  , series: [
    {
      name: "Memory",
      type: "pie",
      radius: "80%",
      center: ["50%", "55%"],
      data: [
        { value: 10, name: "已用" },
        { value: 10, name: "剩余" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
      , label: {
        position: 'inner'
        , formatter: '{b}: {d}%'
        , fontSize: 16
      }
    }
  ]
};
export default function echartInit() {

  return {
    option
  }
}

