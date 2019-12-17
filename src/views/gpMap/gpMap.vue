<template>
    <div class="gpMap">
      <Row style="height: 100%">
        <Col span="20" style="height: 100%">
          <div ref="viewDiv" id="viewDiv"></div>
        </Col>
        <Col span="4" style="padding-top: 25px">
          <Button type="primary" size="small" @click="getGpData">调用gp服务</Button>
        </Col>
      </Row>
    </div>
</template>

<script>
import arcgisPackage from '@/utils/arcgisTools'
import config from '@/utils/config'
import { tdtlayer, tdtyNoteslayer, tdtclayer, tdtcNoteslayer } from '@/utils/layers'
import Basemapthumbnail from '@/assets/img/Basemapthumbnail.png'
import Basemapthumbnail1 from '@/assets/img/Basemapthumbnail1.png'
export default {
  name: 'gpMap',
  data () {
    return {
      map: {},
      view: {}
    }
  },
  mounted () {
    this.createMap()
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

      let initExtent = new Extent(12934703, 4888113, 12937312, 4886589, new SpatialReference({ wkid: 3857 }))
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
        basemap: customBasemap1
      })
      this.view = new MapView({
        map: this.map,
        container: 'viewDiv',
        extent: initExtent
      })
      // 添加全屏
      let fullscreen = new Fullscreen({
        view: this.view
      })
      this.view.ui.add(fullscreen, 'top-left')
      // 增加底图切换插件
      let basemapToggle = new BasemapToggle({
        view: this.view,
        nextBasemap: customBasemap
      })
      this.view.ui.add(basemapToggle, 'top-right')
    },
    /* 调用gp服务 */
    async getGpData () {
      let Geoprocessor = await arcgisPackage.Geoprocessor
      let FeatureSet = await arcgisPackage.FeatureSet
      // let gp = new Geoprocessor('http://192.168.1.158:6080/arcgis/rest/services/qhhx/intersect/GPServer/intersect')
      let gp = new Geoprocessor(config.GeoprocessorUrl)

      let featureSet = new FeatureSet()

      featureSet.features = [this.graphic]
      let params = {
        polygon: featureSet,
        areafield: 'mianji',
        redline: config.redlineShpUrl
      }
      await gp.submitJob(params).then(result => {
        if (result.jobStatus === 'job-succeeded') {
          gp.getResultData(result.jobId, 'out').then(res => {
            console.log(res)
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
    .gpMap{
        width: 100%;
        height: 100%;
        #viewDiv{
            width: 100%;
            height: 100%;
        }
    }
</style>
