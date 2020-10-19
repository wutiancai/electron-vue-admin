<template>

  <div class="login-container" id="particles">
      <el-container>
        <!--<el-header style="height: 80px;background-color: white">
&lt;!&ndash;          <img src="@/assets/logo.png" class="user-avatar" style="width: 54px;height: 44px;margin-top: -18px">&ndash;&gt;
          <img src="@/assets/casia.jpg" class="user-avatar" style="width: 240px;height: 60px;margin-top: -18px">
          <img src="@/assets/logo.PNG.png" class="user-avatar" style="width: 210px;height: 120px;margin-top: -24px">
        </el-header>-->

      </el-container>
    <!--<div class="title-container" style="text-align: center;top:160px">
      <h1 class="title" style="font-size: 75px;color: whitesmoke">“慧脑”机器学习通用算法平台</h1>&lt;!&ndash;#0059E5&ndash;&gt;
    </div>
    <div class="title-container" style="text-align: center;top: 152px">
      <img src="@/assets/casia1.png" class="user-avatar" style="width: 240px;height: 60px;margin-top: -18px">
      <img src="@/assets/logo.PNG.png" class="user-avatar" style="width: 210px;height: 120px;margin-top: -24px;background-color: transparent">
    </div>-->

    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <!--<div class="title-container" style="text-align: center;font-size: 60px">
        <h3 class="title">“慧脑”机器学习通用算法平台</h3>
      </div>-->
      <div class="title-container" style="text-align: center;top:20px">
        <h1 class="title" style="font-size: 75px;color: whitesmoke">机器学习算法平台</h1>
      </div>
      <div class="title-container" style="text-align: center;top: -10px">
        <img src="@/assets/casia1.png" class="user-avatar" style="width: 240px;height: 60px;margin-top: -18px">
        <img src="@/assets/logo.PNG.png" class="user-avatar" style="width: 210px;height: 120px;margin-top: -24px;background-color: transparent">
      </div>
      <el-card class="box-card">

<!--        <div  class="el-card-header" style="padding: 0;">&lt;!&ndash;text-align: center;&ndash;&gt;-->
<!--          <span>-->
<!--            <img src="@/assets/logo.png" class="user-avatar" style="width: 54px;height: 44px;margin-top: -18px">-->
<!--          <img src="@/assets/logo.PNG.png" class="user-avatar" style="width: 200px;height: 100px;margin-top: -14px">&lt;!&ndash;-24px&ndash;&gt;-->
<!--          </span>-->
<!--        </div>-->
        <div>


          <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
            <el-input
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    tabindex="1"
                    auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
            <el-input
                    :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    :type="passwordType"
                    placeholder="Password"
                    name="password"
                    tabindex="2"
                    auto-complete="on"
                    @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
          </el-form-item>

          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;background-color: lightskyblue;border:none" @click.native.prevent="handleLogin">登录</el-button>
        </div>
      </el-card>


      <!--<div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div>-->

    </el-form>
  </div>


</template>

<script>
import { validUsername } from '@/utils/validate'
// import './Particleground'
//vue单文件
import Vue from 'vue'
import particles from 'particles.js'
Vue.use(particles)
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            // this.$router.push({ path: this.redirect || '/' })
            this.loading = false
            this.$router.push({ path: "/" }).catch(res => {
              console.log('routerpush.error',res)
            });
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
    // $('.login-container').particleground({
    //   dotColor: '#E8DFE8',
    //   lineColor: '#133b88'
    // });
    console.log('windows_url ' + window.location.href)
    const config = {
      "particles": {
        "number": {
          "value": 60,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 4,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 100,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "Window",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    }
    // particlesJS('particles', config);
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
/*$bg:#2d3a4b;*/
/*$bg:#080815;*/
$bg:gray;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: absolute;
    width: 980px;
    max-width: 100%;
    /*padding: 160px 35px 0;*/
    margin: auto;
    top: 50%;
    /*margin-top: -340px;*/
    margin-top: -300px;
    left: 50%;
    margin-left: -490px;
  }
  /*.login-title {
    position: absolute;
    max-width: 100%;
    !*padding: 160px 35px 0;*!
    margin: auto;
    top: 50%;
    !*margin-top: -340px;*!
    margin-top: -100px;
    left: 50%;
    margin-left: -260px;
  }*/
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      /*text-align: center;*/
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  /*text-align: center;*/
  line-height: 60px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  /*line-height: 100%;*/
}

body > .el-container {
  margin-bottom: 40px;
  min-height: 100%;
}
.el-card-header{
  padding: 0;
  border-bottom: 0px solid rgba(255,255,255, 0.2); /*增加半透明边框*/
}
.el-card {
  background-color: transparent;
  border: none;
  /*background-color: #162323;*/
  /*background-color:#1d59bf;*//*#080815黑*/
  border: 1px solid rgba(255,255,255, 0.4); /*增加半透明边框*/
  /*opacity: 0.4;*/
  text-align: center;
  width: 520px;
  align-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  margin-left: -260px;
}
</style>
