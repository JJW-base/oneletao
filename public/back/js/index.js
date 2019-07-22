$(function(){

    var echars1 = echarts.init(document.querySelector(".echarts_1"));
 
    option = {
        title:{
            text:"2019年注册人数"
        },
        tooltip:{
            show:true
        },
        legend:{
            data:['人数']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {
           
        },
        series: [{
            name: '人数',
            type: 'bar',
            data: [120, 200, 150, 80, 70, 110]
            
        }]
    };

    echars1.setOption(option);
    
    var echars2 = echarts.init(document.querySelector(".echarts_2"));
 
    option = {
        title : {
            text: '热门品牌销售',
            subtext: '热门品牌销售',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','新百伦','李宁','阿迪王']
        },
        series : [
            {
                name: '品牌',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'新百伦'},
                    {value:135, name:'李宁'},
                    {value:1548, name:'阿迪王'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    

    echars2.setOption(option);
})