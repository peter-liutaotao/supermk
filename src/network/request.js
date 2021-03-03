import axios from 'axios'

export function request(config) {
  //创建实例
  const instance1 = axios.create({
    baseURL:'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })

  // 2.axios拦截 请求拦截
  instance1.interceptors.request.use(config => {
    return config
  },err => {

  })

  //响应后发送数据前拦截
  instance1.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })


    // 本身返回一个promise对象
  //发送真正的网络请求
  return instance1(config)

}

// 方法2
// export function request(config) {
//   return new Promise((resolve,reject) => {
//     const instance1 = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     })
//     instance1(config)
//     .then(res => {
//       //成功则返回这个
//       resolve(res)
//     }).catch(err => {
//       reject(err)
//     })
//   })
// }

// export function request(config,success,failuer) {
//   const instance1 = axios.create({
//           baseURL: 'http://123.207.32.32:8000',
//            timeout: 5000
//          })
//       instance1(config).then(res=>{
//         success(res)
//       }).catch(err => {
//         console.log(err);
//       })
// }