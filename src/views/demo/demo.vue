<template>
    <div class="demo">
        <ul>
            <li>
              <router-link :to="{ name:'baseMap'}">
                baseMap
              </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'demo'
}
</script>

<style scoped lang="scss">
  .demo{
    width: 100%;
    height: 100%;
    ul{
      width: 60%;
      li{
        padding: 5px 4px;
        font-size: 17px;
        width: 100%;
        border-radius: 4px;
        border: 1px solid #d1d1d1;
      }
    }
  }
</style>
