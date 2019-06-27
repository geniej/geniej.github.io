(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b4ed9c6c"],{"1f30":function(e,t,n){},"339d":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("h2",[e._v("상품 위험 등급")]),n("gauge-chart",{attrs:{series:e.initGaugeChartSeries}}),n("h2",[e._v("보유상품 현황")]),n("pie-chart",{attrs:{series:e.initPieChartSeries}}),n("h2",[e._v("과거 수익률")]),n("area-chart",{attrs:{series:e.initAreaChartSeries}}),n("h2",[e._v("과거 수익률")]),n("lineArea-chart",{attrs:{series:e.initLineAreaChartSeries}}),n("h2",[e._v("시장 지수 현황")]),n("plotLine-chart",{attrs:{series:e.initPlotLineChartSeries}})],1)},r=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("highcharts",{attrs:{options:e.gaugeOptions}})},l=[],o={name:"Gauge",props:{series:{type:Array,required:!0}},data:function(){return{gaugeOptions:{chart:{type:"gauge",plotBackgroundColor:null,plotBackgroundImage:null,plotBorderWidth:0,plotShadow:!1,margin:[0,0,0,0]},title:{text:null},pane:{startAngle:-90,endAngle:90,size:"100%",background:[{backgroundColor:"#fff",borderWidth:0}]},credits:{enabled:!1},exporting:{buttons:null},tooltip:{enabled:!1},yAxis:{min:0,max:100,tickPixelInterval:120,tickWidth:4,tickPosition:"inside",tickLength:120,tickColor:"#fff",minorTickInterval:null,offset:0,lineWidth:0,labels:{enabled:!1},endOnTick:!1,plotBands:[{from:0,to:20,thickness:100,color:"#3942d1"},{from:20,to:40,thickness:100,color:"#12a0ef"},{from:40,to:60,thickness:100,color:"#ffac27"},{from:60,to:80,thickness:100,color:"#ff7a27"},{from:80,to:100,thickness:100,color:"#e03838"}]},plotOptions:{gauge:{dial:{radius:"70%",backgroundColor:"#333",borderWidth:0,baseWidth:4,topWidth:4,baseLength:"0%",rearLength:"15%"},pivot:{radius:10}}},series:this.series}}}},s=o,d=n("2877"),c=Object(d["a"])(s,a,l,!1,null,"3486dc24",null),u=c.exports,h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("highcharts",{staticStyle:{width:"600px",height:"420px"},attrs:{options:e.pieOptions}})},p=[],f=(n("7f7f"),{name:"PieChart",props:{series:{type:Array,required:!0}},data:function(){return{pieOptions:{chart:{type:"pie",plotBackgroundColor:null,plotBorderWidth:null,plotShadow:!1,margin:[0,0,0,0]},title:null,credits:{enabled:!1},exporting:{buttons:null},tooltip:{enabled:!1},colors:["#e62e1f","#ff9d00","#12a0ef","#2733b9"],legend:{layout:"proximate",backgroundColor:"#FFFFFF",floating:!0,align:"left",verticalAlign:"top",x:450,y:10,itemStyle:{fontSize:"24px",fontWeight:"bold",color:"#333"},useHTML:!0,labelFormatter:function(){return'<div style="padding-bottom: 15px;"><p style="margin: 0; padding-left: 15px; line-height: 1.2;">'+this.name+'</p><p style="margin: 0; padding-left: 15px; font-size: 40px; line-height: 1.2; font-weight: bold;">'+this.y+'<span style="font-size: 24px;">%</span></p></div>'}},plotOptions:{pie:{dataLabels:{enabled:!1,distance:0,style:{color:"white",fontSize:"20px",textOutline:!1}},point:{events:{legendItemClick:function(){return!1}}},center:["33%","50%"],size:"100%",showInLegend:!0,borderWidth:0}},series:this.series}}}}),b=f,g=Object(d["a"])(b,h,p,!1,null,"04f7e94a",null),m=g.exports,x=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("highcharts",{attrs:{options:e.areaOptions}})},y=[],v={name:"AreaChart",props:{series:{type:Array,required:!0}},data:function(){return{areaOptions:{chart:{margin:[0,0,0,0],backgroundColor:"#f4f7ff",events:{load:function(){this.tooltip.refresh(this.series[0].data[0])}}},title:{text:null},credits:{enabled:!1},exporting:{buttons:null},legend:{enabled:!1},xAxis:{labels:{enabled:!1},crosshair:!0},yAxis:{title:null,tickAmount:5,labels:{enabled:!1}},plotOptions:{area:{fillColor:{linearGradient:{x1:0,y1:0,x2:0,y2:.8},stops:[[0,"rgba(29,72,219,0.49)"],[1,"rgba(29,72,219,0.09)"]]},lineWidth:1,marker:{enabled:!1,symbol:"circle",radius:8,states:{hover:{lineWidth:0}}},shadow:!1,states:{hover:{enabled:!0,lineWidth:1}},threshold:null}},tooltip:{useHTML:!0,headerFormat:'<small style="display: none">{point.key}</small>',pointFormat:'<div class="tooltip" style="min-width: 200px; padding: 20px 0; text-align: center; font-size: 36px; font-weight: bold; color: #2c33a5; box-sizing: border-box;">{point.y} %</div>'},series:this.series}}}},C=v,k=Object(d["a"])(C,x,y,!1,null,"311c3ff8",null),A=k.exports,S=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("highcharts",{attrs:{options:e.lineAreaOptions}})},L=[],O={name:"lineAreaChart",props:{series:{type:Array,required:!0}},data:function(){return{lineAreaOptions:{chart:{},title:{text:null},credits:{enabled:!1},exporting:{buttons:null},legend:{enabled:!1},subtitle:null,xAxis:[{categories:null,crosshair:!1}],yAxis:[{labels:{format:"{value}°C",style:{color:"blue"}},title:{text:"",style:{color:"blue"}},opposite:!0},{gridLineWidth:0,title:{text:""},labels:{format:"{value} mm"}}],tooltip:{shared:!0},series:this.series}}}},w=O,W=Object(d["a"])(w,S,L,!1,null,"fee04516",null),_=W.exports,z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("highcharts",{attrs:{options:e.plotLineOptions}})},F=[],I={name:"plotLineChartChart",props:{series:{type:Array,required:!0}},data:function(){return{plotLineOptions:{chart:{type:"spline"},title:{text:null},credits:{enabled:!1},exporting:{buttons:null},legend:{enabled:!1},subtitle:null,tooltip:!1,xAxis:{plotLines:[{color:"green",dashStyle:"line",width:2,value:1,zIndex:3},{color:"green",dashStyle:"line",width:2,value:3,zIndex:3}],labels:{enabled:!1},gridLineWidth:1},yAxis:{title:{text:null},min:60,max:120,labels:{format:"{value} %"},plotLines:[{color:"red",dashStyle:"line",width:2,value:90,label:{align:"left",style:{fontWeight:"bold",fontStyle:"normal",color:"red"},text:"최초기준가격",x:0},zIndex:3},{color:"blue",dashStyle:"line",width:2,value:60,label:{align:"left",style:{fontWeight:"bold",fontStyle:"normal",color:"blue"},text:"최초기준가격2",x:0},zIndex:3}]},plotOptions:{line:{dataLabels:{enabled:!1},enableMouseTracking:!1}},series:this.series}}}},P=I,B=Object(d["a"])(P,z,F,!1,null,"ab3e02dc",null),j=B.exports,E={name:"ChartTest",components:{gaugeChart:u,pieChart:m,areaChart:A,lineAreaChart:_,plotLineChart:j},data:function(){return{chartData:this.fetchData()}},methods:{fetchData:function(){var e=[{name:"국내주식",y:15,selected:!0},{name:"국내채권",y:20,selected:!0},{name:"해외주식",y:15,selected:!0},{name:"해외채권",y:50,selected:!0}];return e}},mounted:function(){},computed:{initGaugeChartSeries:function(){return[{data:[90],dataLabels:{enabled:!1}}]},initPieChartSeries:function(){return[{innerSize:"30%",data:this.chartData,colorByPoint:!0,dataLabels:{enabled:!0,color:"#fff",connectorWidth:0,distance:-70,formatter:function(){return Math.round(this.percentage)+" %"}},marker:{enabled:!1}}]},initAreaChartSeries:function(){return[{type:"area",name:"area chart",data:[0,1,4,4,5,2,3,7],color:"#1d48db"}]},initLineAreaChartSeries:function(){return[{name:"",type:"area",yAxis:1,data:[49.9,71.5,106.4,129.2,144,176,135.6,148.5,216.4,194.1,95.6,54.4],tooltip:{valueSuffix:" mm"}},{name:"",type:"line",data:[7,6.9,9.5,14.5,18.2,21.5,25.2,26.5,23.3,18.3,13.9,9.6],tooltip:{valueSuffix:" °C"}}]},initPlotLineChartSeries:function(){return[{name:"",data:[90,110,80,null,null,null],color:"red",marker:{enabled:!1}},{name:"",data:[90,80,100,null,null,null],marker:{enabled:!1}}]}}},T=E,$=(n("db5b"),Object(d["a"])(T,i,r,!1,null,"278db724",null));t["default"]=$.exports},"7f7f":function(e,t,n){var i=n("86cc").f,r=Function.prototype,a=/^\s*function ([^ (]*)/,l="name";l in r||n("9e1e")&&i(r,l,{configurable:!0,get:function(){try{return(""+this).match(a)[1]}catch(e){return""}}})},db5b:function(e,t,n){"use strict";var i=n("1f30"),r=n.n(i);r.a}}]);
//# sourceMappingURL=chunk-b4ed9c6c.513edec5.js.map