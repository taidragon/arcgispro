<template>
    <div class="curtain">
        <div ref="viewDiv" id="viewDiv"></div>
    </div>
</template>

<script>
import arcgisPackage from '@/utils/arcgisTools'
import { tdtlayer, tdtyNoteslayer, tdtclayer, tdtcNoteslayer } from '@/utils/layers'
import Basemapthumbnail from '@/assets/img/Basemapthumbnail.png'
import Basemapthumbnail1 from '@/assets/img/Basemapthumbnail1.png'
export default {
  name: 'curtain',
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
      let Swipe = await arcgisPackage.Swipe
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
        baseLayers: [],
        title: '矢量地图',
        id: 'myBasemap',
        thumbnailUrl: Basemapthumbnail
      })
      let customBasemap1 = new Basemap({
        baseLayers: [tdtylayer1, tdtylayer2, tdtylayer, tdtylayer3],
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
      const swipe = new Swipe({
        leadingLayers: [tdtylayer, tdtylayer3],
        trailingLayers: [tdtylayer1, tdtylayer2],
        position: 35, // set position of widget to 35%
        view: this.view
      })
      this.view.ui.add(swipe)
    }
  }
}
</script>

<style scoped lang="scss">
    .curtain{
        width: 100%;
        height: 100%;
        #viewDiv{
            width: 100%;
            height: 100%;
        }
    }
</style>
