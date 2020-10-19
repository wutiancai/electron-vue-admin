<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/><!--v-if="isRouterAlice"-->
<!--    <keep-alive>-->
<!--      <router-view v-if="isRouterAlice && $route.meta.keepAlive"></router-view>-->
<!--    </keep-alive>-->
<!--    <router-view v-if="isRouterAlice && !$route.meta.keepAlive"></router-view>-->
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload,
      routerFresh: this.refresh
    }
  },
  data() {
    return {
      isRouterAlice: true,
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlice = false
      this.$nextTick(function () {
        this.isRouterAlice = true
      })
    },
    refresh() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }

}
</script>
