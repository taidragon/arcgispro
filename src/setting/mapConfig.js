/*
arcgis初始化配置
*/
export default {
  baseUrl: 'http://115.29.42.107:8686/4.11/init.js',
  dojoUrl: 'http://115.29.42.107:8686/4.11/dojo',
  esriCss: 'http://115.29.42.107:8686/4.11/esri/css/main.css',
  serverUrl: 'http://115.29.42.107:6080',
  GeoprocessorUrl: 'http://115.29.42.107:6080/arcgis/rest/services/qhhx/insect/GPServer/insect',
  mapWkid: 10200,
  inflectionPointcolor: [226, 119, 40], // 拐点颜色
  boundaryColor: [226, 119, 40], // 界碑颜色
  centerPoint: [98.880521, 37.762178] // 地图中心经纬度
}
