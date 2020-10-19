<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
<!--        <div class="">-->
<!--          <img src="@/assets/logo.PNG.png" class="user-avatar" style="width: 180px;height: 60px;">-->
<!--        </div>-->
<!--element.style {
    position: absolute;
    width: 180px;
    height: 100px;
    top: -30px;
    left: -190px;
}-->
        <div ><!--class="avatar-wrapper"-->

<!--          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">-->
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
<!--          <router-link to="/">-->
<!--            <el-dropdown-item>-->
<!--              Home-->
<!--            </el-dropdown-item>-->
<!--          </router-link>-->
<!--          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">-->
<!--            <el-dropdown-item>Github</el-dropdown-item>-->
<!--          </a>-->
<!--          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">-->
<!--            <el-dropdown-item>Docs</el-dropdown-item>-->
<!--          </a>-->
          <el-dropdown-item divided @click.native="logout"><!--@click.native-->
            <span style="display:block;">退出</span>
          </el-dropdown-item>
            <a target="_blank" :href="'http://'+this.getBaseURL().split('/')[0]+'/static'" >
               <el-dropdown-item>帮助</el-dropdown-item>
            </a>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="right-menu" style="font-size:20px;">
        <i class="el-icon-d-arrow-left"></i>
        <i class="el-icon-d-arrow-right"></i>
        <i class="el-icon-ice-cream-round"></i>
        <i class="el-icon-video-play"></i>
    </div>
    <div class="right-menu">
<!--      <img src="@/assets/logo.png" class="user-avatar" style="width: 54px;height: 44px;margin-top: -4px">-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

var mypromise = new Promise(function(resolve, reject) {
    // 异步处理
    // 处理结束后、调用resolve 或 reject
    // window.location.reload()
    resolve()
});
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  inject: ['routerFresh'],
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        this.routerFresh()
        console.log('this.$store.state.wbsocket', this.$store.state.wbsocket)
      this.$store.state.wbsocket.forEach(function (item, i) {
          item.close()
      })
    }
  },
    mounted () {
      console.log('this.getBaseURL()', this.getBaseURL(), 'location.host', location.host)
    }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  padding: 0;
  display: block;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
