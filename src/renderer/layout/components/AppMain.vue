<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <div>
        <keep-alive>
          <router-view :key="key"/>
        </keep-alive>
        <annotation v-show="$route.path == '/annotation'" v-if="$parent.$parent.isRouterAlice == true"></annotation>
      </div>

    </transition>
  </section>
</template>

<script>
import annotation from '@/views/annotation/index'
export default {
  name: 'AppMain',
  components: {
    annotation
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
