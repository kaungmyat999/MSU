function spendingPieChart(labels,values) {
  let intValues = values.map(i=> Number(i))
  let data = intValues;
  let spending_char_options = {
  series: data, 
  chart: {
    height: 330,
    type: 'donut',
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 1450,
      animateGradually: {
          enabled: true,
          delay: 150
      },
      dynamicAnimation: {
          enabled: true,
          speed: 350
      }
    } 
  },
  labels:labels,

  dataLabels: { 
    enabled: false
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        
      },
      legend: {
        show: false
      }
    }
  }],
  legend: {
    show:true,
    labels:{
      colors:undefined,
      useSeriesColors: true, 
    },
    position: 'top',
    offsetY: 0,
    height: 0,
  }
  };

  var chart = new ApexCharts(document.querySelector("#spending_chart"), spending_char_options);
  chart.render();

}

function appendData() {
var arr = chart.w.globals.series.slice()
arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
return arr;
}

function removeData() {
var arr = chart.w.globals.series.slice()
arr.pop()
return arr;
}

function randomize() {
return chart.w.globals.series.map(function() {
    return Math.floor(Math.random() * (100 - 1 + 1)) + 1
})
}

function reset() {
return options.series
}
document.getElementById("spending_chart").addEventListener("click", function() {
  data.push(10)
  chart.updateSeries(data)
})



// Gender Ratio

const gender_chart = (input_gender_data,input_labels)=> {
  var gender_chart_options = {
  //   grid: {
  //     show: true,
  //     borderColor: '#90A4AE',
  //     strokeDashArray: 0,
  //     position: 'back',
      
  //     row: {
  //         colors: undefined,
  //         opacity: 0.5
  //     },  
  //     column: {
  //         colors: undefined,
  //         opacity: 0.5
  //     },  
  //     padding: {
  //         top: 0,
  //         right: 0,
  //         bottom: 0,
  //         left: 0,
  //     },
  //     margin:{
  //       left:100,
  //     }
  // },
  series: input_gender_data, 
  labels:input_labels ,
  chart: {
    
    height:340,
    type: 'pie',
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 1450,
      animateGradually: {
          enabled: true,
          delay: 150
      },
      dynamicAnimation: {
          enabled: true,
          speed: 350
      }
    } 
  },

  dataLabels: { 
    enabled: false
  },
  // responsive: [{
  //   breakpoint: 480,
  //   options: {
  //     chart: {
  //       width: 200
  //     },
  //     legend: {
  //       show: false
  //     }
  //   }
  // }],
  legend: {
    show:true,
    labels:{
      colors:undefined,
      useSeriesColors: true, 
    },
    position: 'bottom',
    offsetY: 0,
    offsetX: 0,
    height: 0,
  }
  };

  var gender_chart = new ApexCharts(document.querySelector("#gender_chart"), gender_chart_options);
  gender_chart.render()
}



const event_attendance_chart = (date,values) =>{
  var options = {
    series: [ {
    name: 'Attendence',
    type: 'area',
    data: values
  }],
    chart: {
    height: 350,
    type: 'line',
    stacked: false,
  },
  stroke: {
    width: [4, 4, 5],
    curve: 'smooth'
  },
  plotOptions: {
    bar: {
      columnWidth: '50%'
    }
  },
  
  fill: {
    opacity: [0.35, 0.25, 1],
    gradient: {
      inverseColors: false,
      shade: 'light',
      type: "vertical",
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100, 100, 100]
    }
  },
  labels: date,
  markers: {
    size: 0
  },
  xaxis: {
    type: 'category',
    title :{
      
    }
  },
  yaxis: {
    title: {
      
    },
    min: 0
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y) {
        if (typeof y !== "undefined") {
          return y.toFixed(0) + " points";
        }
        return y;
  
      }
    }
  }
  };

  var chart = new ApexCharts(document.querySelector("#attendance_chart"), options);
  chart.render();



}

const project_record = (inputData) => {
  let {arr1,arr2,dates} = inputData
  console.log(inputData);
  var options = {
    series: [{
    name: 'Created Projects',
    data: arr1
    }, {
      name: 'Current Projects',
      data: arr2
    },],
      chart: {
      type: 'bar',
      height: 325,
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10
      },
    },
    xaxis: {
      type: 'datetime',
      categories: dates,
    },
    legend: {
      position: 'bottom',
      offsetY: 8
    },
    fill: {
      opacity: 1
    }
  };

  var chart = new ApexCharts(document.querySelector("#project_record"), options);
  chart.render();

}

function NumberToEventNameCreator (arr){
  for(let num of arr){
   console.log("num",num);
   num = "Event"+num
   console.log("N =>",num);

  }
}
const event_pie_chart = async(e,f) =>{
  
  setTimeout(()=>{
    
    var options = {
      series: f,
      chart: {
      height: 332,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
          image: undefined,
        },
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            show: true,
          }
        }
      }
    },
    colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
    labels: e,
    legend: {
      show: true,
      floating: true,
      fontSize: '18px',
      position: 'left',
      offsetX: 0,
      offsetY: 4,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0
      },
      formatter: function(seriesName, opts) {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
      },
      itemMargin: {
        vertical: 3
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
            show: true
        }
      }
    }]
    };
  
    var chart = new ApexCharts(document.querySelector("#event_attendence_percentage_chart"), options);
    chart.render();

  },600)
}
