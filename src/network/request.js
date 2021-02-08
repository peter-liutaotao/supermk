import axios from 'axios'

export function request(config){
  const  instance =axios.create({
    baseURL:'http://152.136.185.210:8000/api/w6',
    timeout:5000
  })

  ///http://152.136.185.210:8000/api/w6/category

  // //拦截
  // instance.interceptors.request.use(config=>{
  //     console.log(config);
  //     return config
  //   },
  //   err=>{
  //     // console.log(err)
  //   })
  //
  // instance.interceptors.request.use(res=>{
  //   return res.get
  // },err=>{
  //   console.log(err);
  // })

  return instance(config)
}

