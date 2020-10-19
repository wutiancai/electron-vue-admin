import axios from 'axios'
import { MessageBox, Message,Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
const BASE_URL = 'localhost:8008/django-api'
// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // baseURL: 'http://localhost:8000/django-api',
  baseURL: 'http://' + BASE_URL,
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  res => {
    // loading.close()
    const response = res.data
    if (response.code !== 200 && response.status !== 200) {
      if (response.code === 20000 || response.code === 20001) {
        Message({
          message: response.message,
          type: 'error',
          duration: 5 * 1000
        })
        // 处理异常状态清除token跳转回登录页
        // localStorage.removeItem('token')
        // router.replace('login')
        // return Promise.reject('error')
      } else if (response.code === 90001) {
        Message({
          message: '网络异常',
          type: 'error',
          duration: 5 * 1000
        })
      } else {
        // Message({
        //   message: response.message,
        //   type: 'error',
        //   duration: 5 * 1000
        // })
      }
    }
    return response
  },
    err => {
      // 出现异常
      // loading.close()
      return Promise.reject(err);
    }
)

// import Vue from 'vue'
// class http {
//   // 使用async ... await
//   static async get(url, params) {
//     // console.log(params)
//     return await instance.get(url, {params})
//   }
//   static async delete(url, params) {
//
//     let result = await instance.delete(url, params);
//     if(result.data.status==0){
//       Vue.prototype.$message({
//         showClose: true,
//         message: '删除成功！',
//         type: 'success'
//       });
//     } else {
//       Vue.prototype.$message.error('删除失败！')
//     }
//     return result;
//   }
//   static async post(url, params) {
//     // console.log(params)
//     let result = await instance.post(url, params);
//     if(result.data.status==0){
//       Vue.prototype.$message({
//         showClose: true,
//         message: '添加成功！',
//         type: 'success'
//       });
//     } else {
//       Vue.prototype.$message.error('添加失败！')
//     }
//     return result;
//   }
//   static async put(url, params) {
//     // console.log(params)
//     let result = await instance.put(url, params);
//     if(result.data.status==0){
//       Vue.prototype.$message({
//         showClose: true,
//         message: '修改成功！',
//         type: 'success'
//       });
//     } else {
//       Vue.prototype.$message.error('修改失败！')
//     }
//     return result;
//   }
//
//   // 没有执行结果提示
//   static async delete_(url, params) {
//     let result = await instance.delete(url, params);
//
//     return result;
//   }
//   static async post_(url, params) {
//     // console.log(params)
//     let result = await instance.post(url, params);
//
//     return result;
//   }
//   static async put_(url, params) {
//     // console.log(params)
//     let result = await instance.put(url, params);
//
//     return result;
//   }
// }
// export default http
export default service
export function getBaseURL () {
  return BASE_URL
}
export function post (url, data){
  return new Promise((resolve,reject) => {
    service({
      method: 'post',
      url: url,
      data: data
    }).then(res => {
      // 这里看项目情况，我这边是用flag来判断请求成功与否，虽然有code===200可以判断，但后台小哥哥给了这个字段，不忍心不用
      if (res) {
        // 请求成功处理，不成功则消息提示
        resolve(res)
      } else {
        // Message({
        //   message: res.message,
        //   type: 'error',
        //   duration: 2 * 1000
        // })
      }
    }).catch(err => {
      reject(err)
    })
  })
}
export function get (url, data) {
  return new Promise((resolve,reject) => {
  service.get(url, {
      params: data
    }).then(res => {
      console.log(res)
      // 这里看项目情况，我这边是用flag来判断请求成功与否，虽然有code===200可以判断，但后台小哥哥给了这个字段，不忍心不用
      if (res) {
        // 请求成功处理，不成功则消息提示
        resolve(res)
      } else {
        // Message({
        //   message: res.message,
        //   type: 'error',
        //   duration: 2 * 1000
        // })
      }
    }).catch(err => {
      reject(err)
    })
  })
}
export function deletes (url, data) {
  return new Promise((resolve,reject) => {
    service.delete(url, {
      params: data
    }).then(res => {
      // 这里看项目情况，我这边是用flag来判断请求成功与否，虽然有code===200可以判断，但后台小哥哥给了这个字段，不忍心不用
      if (res | res === '') {
        // 请求成功处理，不成功则消息提示
        resolve(res)
      } else {
        Message({
          message: "删除失败",
          type: 'error',
          duration: 2 * 1000
        })
      }
    }).catch(err => {
      reject(err)
    })
  })
}
export function put (url, data) {
  return new Promise((resolve, reject) => {
    service.put(url, data).then(res => {
      // 这里看项目情况，我这边是用flag来判断请求成功与否，虽然有code===200可以判断，但后台小哥哥给了这个字段，不忍心不用
      if (res) {
        // 请求成功处理，不成功则消息提示
        resolve(res)
      } else {
        Message({
          message: "修改失败",
          type: 'error',
          duration: 2 * 1000
        })
      }
    }).catch(err => {
      reject(err)
    })
  })
}

export const $getJson = function (method) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: method,
      dataType: "json",
      crossDomain: true,
      cache: false
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
