import arcgisPackage from './arcgisTools'
import config from '../setting/mapConfig'

// 天地图影像地图 OGC服务
export const tdtlayer = async () => {
  let BaseTileLayer = await arcgisPackage.BaseTileLayer
  let Request = await arcgisPackage.Request
  let TDT = await BaseTileLayer.createSubclass({
    properties: {
      urlTemplate: null
    },
    spatialReference: config.centerPoint.spatialReference,
    title: '天地图影像地图',
    getTileUrl: function (level, row, col) {
      let url = 'http://t' + col % 8 + '.tianditu.gov.cn/DataServer?T=img_w&tk=12b886b3d0f324bd6032c29503972e7c&x=' + col + '&y=' + row + '&l=' + level
      // let url = "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX="+level+"&TILEROW="+row+"&TILECOL="+col+"&tk=12b886b3d0f324bd6032c29503972e7c";
      return url
    },
    fetchTile: function (level, row, col) {
      let url = this.getTileUrl(level, row, col)
      return Request(url, {
        responseType: 'image'
      })
        .then((response) => {
          let image = response.data
          let width = this.tileInfo.size[0]
          let height = this.tileInfo.size[0]

          let canvas = document.createElement('canvas')
          let context = canvas.getContext('2d')
          canvas.width = width
          canvas.height = height

          context.drawImage(image, 0, 0, width, height)

          return canvas
        })
    }
  })
  let layer = await new TDT()
  return layer
}
// 天地图影像标注图层
export const tdtyNoteslayer = async () => {
  let BaseTileLayer = await arcgisPackage.BaseTileLayer
  let Request = await arcgisPackage.Request
  let TDT = await BaseTileLayer.createSubclass({
    properties: {
      urlTemplate: null
    },
    title: '天地图影像标注',
    getTileUrl: function (level, row, col) {
      let url = 'http://t' + col % 8 + '.tianditu.gov.cn/DataServer?T=cia_w&tk=12b886b3d0f324bd6032c29503972e7c&x=' + col + '&y=' + row + '&l=' + level
      // var url = "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX="+level+"&TILEROW="+row+"&TILECOL="+col+"&tk=12b886b3d0f324bd6032c29503972e7c";
      return url
    },
    fetchTile: function (level, row, col) {
      let url = this.getTileUrl(level, row, col)
      return Request(url, {
        responseType: 'image'
      })
        .then((response) => {
          let image = response.data
          let width = this.tileInfo.size[0]
          let height = this.tileInfo.size[0]

          let canvas = document.createElement('canvas')
          let context = canvas.getContext('2d')
          canvas.width = width
          canvas.height = height
          context.drawImage(image, 0, 0, width, height)
          return canvas
        })
    }
  })
  let layer = new TDT()
  return layer
}
// 天地图矢量图层
export const tdtclayer = async () => {
  let BaseTileLayer = await arcgisPackage.BaseTileLayer
  let Request = await arcgisPackage.Request
  let TDT = await BaseTileLayer.createSubclass({
    properties: {
      urlTemplate: null
    },
    getTileUrl: function (level, row, col) {
      let url = 'http://t' + col % 8 + '.tianditu.gov.cn/DataServer?T=vec_w&tk=12b886b3d0f324bd6032c29503972e7c&x=' + col + '&y=' + row + '&l=' + level
      // var url = "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX="+level+"&TILEROW="+row+"&TILECOL="+col+"&tk=12b886b3d0f324bd6032c29503972e7c";
      return url
    },
    fetchTile: function (level, row, col) {
      let url = this.getTileUrl(level, row, col)
      return Request(url, {
        responseType: 'image'
      })
        .then((response) => {
          let image = response.data
          let width = this.tileInfo.size[0]
          let height = this.tileInfo.size[0]

          let canvas = document.createElement('canvas')
          let context = canvas.getContext('2d')
          canvas.width = width
          canvas.height = height
          context.drawImage(image, 0, 0, width, height)
          return canvas
        })
    }
  })
  let layer = new TDT()
  return layer
}
// 天地图矢量标注图层
export const tdtcNoteslayer = async () => {
  let BaseTileLayer = await arcgisPackage.BaseTileLayer
  let Request = await arcgisPackage.Request
  let TDT = await BaseTileLayer.createSubclass({
    properties: {
      urlTemplate: null
    },
    getTileUrl: function (level, row, col) {
      let url = 'http://t' + col % 8 + '.tianditu.gov.cn/DataServer?T=cva_w&tk=12b886b3d0f324bd6032c29503972e7c&x=' + col + '&y=' + row + '&l=' + level
      // var url = "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX="+level+"&TILEROW="+row+"&TILECOL="+col+"&tk=12b886b3d0f324bd6032c29503972e7c";
      return url
    },
    fetchTile: function (level, row, col) {
      let url = this.getTileUrl(level, row, col)
      return Request(url, {
        responseType: 'image'
      })
        .then((response) => {
          let image = response.data
          let width = this.tileInfo.size[0]
          let height = this.tileInfo.size[0]

          let canvas = document.createElement('canvas')
          let context = canvas.getContext('2d')
          canvas.width = width
          canvas.height = height
          context.drawImage(image, 0, 0, width, height)
          return canvas
        })
    }
  })
  let layer = new TDT()
  return layer
}

// 省界
export const shengjie = async (id) => {
  let FeatureLayer = await arcgisPackage.FeatureLayer
  let layer = new FeatureLayer({
    id: id === undefined ? 0 : id.toString(),
    name: '省界',
    url: config.serverUrl + '/arcgis/rest/services/jshx/shengjie/MapServer',
    legend: {
      type: 2,
      backgroundColor: 'rgba(200, 10, 100, 1)',
      weight: 3
    }
  })
  return layer
}
// 市界
export const shijie = async (id) => {
  let FeatureLayer = await arcgisPackage.FeatureLayer
  let layer = new FeatureLayer({
    id: id === undefined ? 0 : id.toString(),
    name: '市界',
    url: config.serverUrl + '/arcgis/rest/services/qhhx/shijie/MapServer',
    legend: {
      type: 2,
      backgroundColor: 'rgba(200, 10, 100, 1)',
      weight: 3
    }
  })
  layer.renderer = {
    type: 'simple',
    symbol: {
      type: 'simple-fill',
      size: 6,
      color: [0, 0, 0, 0.01],
      outline: {
        width: 0.8,
        color: [255, 0, 0, 0.8]
      }
    }
  }
  return layer
}
// 县界
export const xianjie = async (id) => {
  let FeatureLayer = await arcgisPackage.FeatureLayer
  let layer = new FeatureLayer({
    id: id === undefined ? 0 : id.toString(),
    name: '县界',
    url: config.serverUrl + '/arcgis/rest/services/qhhx/xianjie/MapServer',
    legend: {
      type: 2,
      backgroundColor: 'rgba(200, 10, 100, 1)',
      weight: 3
    }
  })
  return layer
}
