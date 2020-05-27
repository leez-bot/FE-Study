import axios from '../libs/api.request'
import store from '../store'
import * as types from '../store/modules/index/mutation-type'

// get请求
export const getList = (param = {}) => {
    return axios.request({
      url: '/coam/devPassword',
      method: 'get'
    }, param)
}

export const getGradeList = async (param = {}) => {
    // pending
    store.commit(`indexState/${types.SETSTATE}`, { loading: true, gradeList: [] })
    try {
      // resolve
      let gradeList = await axios.request({
        url: '/master/amain',
        method: 'get'
      }, param) || []
      store.commit(`indexState/${types.SETSTATE}`, { loading: false, gradeList })
    } catch (error) {
      // reject
      store.commit(`indexState/${types.SETSTATE}`, { loading: false, gradeList: [] })
    }
}

// post请求 
// export const restoreTrash = msg_id => {
//     return axios.request({
//       url: 'message/restore',
//       method: 'post',
//       data: {
//         msg_id
//       }
//     })
// }
