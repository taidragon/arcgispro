<template>
    <div class="getCoordinate">
      <div style="height: 50px;text-align: left;line-height: 50px;font-size: 18px;font-weight: bold;background: #2f639a;color: #fff;padding-left: 20px">
        天地图坐标拾取工具（坐标系：大地2000）
      </div>
      <Row style="height: calc(100% - 50px)">
        <Col span="18" style="height: 100%">
          <div ref="viewDiv" id="viewDiv"></div>
        </Col>
        <Col span="6" style="height: 100%;border-left: 1px solid #d1d1d1">
          <div class="divUi" style="height: 50%;overflow: auto;padding: 0 10px">
            <Divider size="small" orientation="left">经纬度</Divider>
            <Table border size="small" :columns="columns1" :data="lonlatArr"></Table>
          </div>
          <div class="divUi" style="height: 50%;overflow: auto;padding: 0 10px">
            <Divider size="small" orientation="left">度分秒</Divider>
            <Table border size="small" :columns="columns2" :data="lonlatArr"></Table>
          </div>
        </Col>
      </Row>
    </div>
</template>

<script>
import arcgisPackage from '@/utils/arcgisTools'
import { tdtlayer, tdtyNoteslayer, tdtclayer, tdtcNoteslayer } from '@/utils/layers'
import Basemapthumbnail from '@/assets/img/Basemapthumbnail.png'
import Basemapthumbnail1 from '@/assets/img/Basemapthumbnail1.png'
import wayPointBlue from '@/assets/img/test.png' // 航点巡查
export default {
  name: 'getCoordinate',
  data () {
    return {
      map: {},
      view: {},
      sLayer: {},
      coordinate: [],
      coordinateDu: [],
      pointId: 1,
      columns1: [
        {
          title: '经度',
          key: 'lon'
        },
        {
          title: '纬度',
          key: 'lat'
        },
        {
          title: '取消',
          key: 'address',
          width: '70',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  size: 'small',
                  icon: 'md-close'
                },
                on: {
                  click: () => {
                    this.clickDel(params.row)
                  }
                }
              })
            ])
          }
        }
      ],
      columns2: [
        {
          title: '经度',
          key: 'lonDu'
        },
        {
          title: '纬度',
          key: 'latDu'
        },
        {
          title: '取消',
          key: 'address',
          width: '70',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  size: 'small',
                  icon: 'md-close'
                },
                on: {
                  click: () => {
                    this.clickDel(params.row)
                  }
                }
              })
            ])
          }
        }
      ],
      lonlatArr: []
    }
  },
  async mounted () {
    await this.createMap()
    await this.addPointsMap()
    await this.clickGet()
  },
  methods: {
    /* 创建地图 */
    async createMap () {
      // 导入需要的arcgis模块
      let MapView = await arcgisPackage.MapView
      let Map = await arcgisPackage.Map
      let Basemap = await arcgisPackage.Basemap
      let BasemapToggle = await arcgisPackage.BasemapToggle
      let Fullscreen = await arcgisPackage.Fullscreen
      let Extent = await arcgisPackage.Extent
      let SpatialReference = await arcgisPackage.SpatialReference
      // 天地图矢量地图
      let tdtylayer1 = await tdtclayer().then(res => { return res })
      // 天地图的矢量标注图层
      let tdtylayer2 = await tdtcNoteslayer().then(res => { return res })
      // 天地图影像地图
      let tdtylayer = await tdtlayer().then(res => { return res })
      // 天地图影像标注图层
      let tdtylayer3 = await tdtyNoteslayer().then(res => { return res })

      let customBasemap = new Basemap({
        baseLayers: [tdtylayer1, tdtylayer2],
        title: '矢量地图',
        id: 'myBasemap',
        thumbnailUrl: Basemapthumbnail
      })
      let customBasemap1 = new Basemap({
        baseLayers: [tdtylayer, tdtylayer3],
        title: '影像地图',
        id: 'myBasemap1',
        thumbnailUrl: Basemapthumbnail1
      })

      this.map = new Map({
        basemap: customBasemap
      })
      this.view = new MapView({
        map: this.map,
        container: 'viewDiv',
        center: [108.2216797, 31.4169708],
        zoom: 5,
        spatialReference: { wkid: 3857 }
      })
      // 添加全屏
      let fullscreen = new Fullscreen({
        view: this.view
      })
      this.view.ui.add(fullscreen, 'top-left')
      // 增加底图切换插件
      let basemapToggle = new BasemapToggle({
        view: this.view,
        nextBasemap: customBasemap1
      })
      this.view.ui.add(basemapToggle, 'top-right')
    },
    /* 添加点图层 */
    async addPointsMap () {
      let GraphicsLayer = await arcgisPackage.GraphicsLayer
      // 创建选择层以显示选择符号
      this.sLayer = new GraphicsLayer({
        layerId: 'sLayer',
        title: '选择层',
        id: 'sLayer'
      })
      // 将数据图层与选择图层一次性添加到地图中
      this.map.addMany([ this.sLayer ])
    },
    /* 向点图层中添加点 */
    async addPoint (p) {
      let Graphic = await arcgisPackage.Graphic
      let PictureMarkerSymbol = await arcgisPackage.PictureMarkerSymbol
      let pointGeometry = {
        type: 'point',
        longitude: p.lon,
        latitude: p.lat,
        spatialReference: { wkid: 3857 }
      }
      // let symbol = {
      //   type: 'simple-marker',
      //   color: [226, 119, 40]
      // }
      let symbol = new PictureMarkerSymbol({
        url: wayPointBlue,
        width: '32px',
        height: '32px',
        xoffset: '0px',
        yoffset: '16px'
      })
      let pointGraphic = new Graphic({
        attributes: {
          id: p.id
        },
        geometry: pointGeometry,
        symbol: symbol
      })
      this.sLayer.add(pointGraphic)
    },
    /* 从点图层中删除点 */
    async delPoint (p) {
      let arr = this.sLayer.graphics.items.filter(res => {
        return res.attributes.id === p.id
      })
      this.sLayer.removeMany(arr)
    },
    /* 点击获取点 */
    async clickGet () {
      this.view.on('click', (event) => {
        let point = {
          id: this.pointId,
          lon: event.mapPoint.longitude.toFixed(7),
          lat: event.mapPoint.latitude.toFixed(7),
          lonDu: this.toDu(event.mapPoint.longitude),
          latDu: this.toDu(event.mapPoint.latitude)
        }
        this.lonlatArr.push(point)
        this.addPoint(point)
        this.pointId += 1
      })
    },
    /* 从列表中取消点 */
    async clickDel (point) {
      this.lonlatArr = this.lonlatArr.filter(res => {
        return res.id !== point.id
      })
      this.delPoint(point)
    },
    /* 度分秒转经纬度 */
    toDu (a) {
      let degree = parseInt(a)
      let min = parseInt((a - degree) * 60)
      let sec = ((a - degree) * 3600 - min * 60).toFixed(3)
      return degree + '°' + min + '′' + sec + '″'
    },
    /* 经纬度转度分秒 */
    tolonlat (value) {
      let du = value.split('°')[0]
      let fen = value.split('°')[1].split('′')[0]
      let miao = value.split('°')[1].split('′')[1].split('″')[0]
      return parseFloat(Math.abs(du)) + parseFloat((Math.abs(fen) / 60) + parseFloat(Math.abs(miao) / 3600))
    }
  }
}
</script>

<style scoped lang="scss">
    .getCoordinate{
        width: 100%;
        height: 100%;
        #viewDiv{
            width: 100%;
            height: 100%;
        }
    }
</style>
