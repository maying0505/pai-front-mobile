import axios from 'axios'
import Qs from 'qs'
import router from '@/router'


let AUTH_TOKEN = (function () {
  return localStorage.getItem("token");
})();


var instance = axios.create({});

instance.defaults.baseURL = process.env.API_BASE_URL;
instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;

instance.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
}
instance.defaults.timeout = 10000

instance.interceptors.request.use(config => {
  let url = config.url;
  if (url.indexOf("login") > -1) {
    localStorage.setItem('token', "");
    config.headers.Authorization = "";
  }
  if (url.indexOf("login") < 0) {
    config.headers.Authorization = localStorage.getItem("token");
  }
  return config;
}, err => {
  return Promise.reject(err);
});
instance.interceptors.response.use(res => {
  if (res.headers.token) {
    localStorage.setItem('token', res.headers.token);
  }
  return res;
}, err => {
  if (err && err.response) {
    let message = ''
    switch (err.response.status) {
      case 401:
        router.replace({ path: '/login', query: { redirect: to.fullPath } })
        break
      case 404:
        message = '404'
        break
      case 500:
        message = '服务器内部错误'
        break
      case 501:
        message = '网络未实现'
        break;
      case 502:
        message = '网络错误'
        break;
      case 503:
        message = '服务不可用'
        break;
      case 504:
        message = '网络超时'
        break;
      case 505:
    }
    if (message) {
      alert(message)
    }
  }
  return err;
});


export default {
  //get请求
  get(url, param) {
    return new Promise((resolve, reject) => {
      instance({
        method: 'get',
        url,
        params: param
      }).then(res => {
        resolve(res.data)
      })
    })
  },
  //post请求
  post(url, param) {
    param = Qs.stringify(param)
    return new Promise((resolve, reject) => {
      instance({
        method: 'post',
        url,
        data: param
      }).then(res => {
        resolve(res.data)
      })
    })
  }
}


