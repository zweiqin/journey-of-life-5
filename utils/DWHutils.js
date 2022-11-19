import { whoami } from '../api/auth'
import { J_USER_ID, J_USER_TOKEN, J_TOKEN_EXPIRE } from '../constant'
import { jsonp } from 'vue-jsonp'

/**
 * @description 解决小数计算精度问题（en，你应该使用big.js）
 * @param {Number, String} data 数字
 * @param {Number} accuracy 保留几位小数
 * @returns
 */
export const fomartNumber = (data, accuracy = 2) => {
  let temp = data + ''
  if (temp.includes('.')) {
    return (data * 1).toFixed(accuracy)
  }
  return data
}

/**
 * @description 批量清除缓存
 * @param {String[]} cacheArr 要清除的缓存string数组
 */
export const removeCache = cacheArr => {
  if (!Array.isArray(cacheArr)) {
    return
  }

  for (const item of cacheArr) {
    uni.removeStorageSync(item)
  }
}

/**
 * 检测登录是否有效
 */
export const checkWhoami = () => {
  // new Promise(async (resolve, reject) => {
  //   const userId = getUserId();
  //   const res = await whoami(userId);
  //   if (res.errno !== 0) {
  //     uni.navigateTo({
  //       url: "/pages/login/login",
  //     });
  //   }
  // });
}

/**
 * 获取用户userid
 * @returns
 */
export const getUserId = () => {
  const userId = uni.getStorageSync(J_USER_ID)
  if (!userId) {
    // uni.showToast({
    //   title: "登录已失效，请重新登录",
    //   duration: 2000,
    //   icon: "none",
    // });

    uni.showModal({
      title: '提示',
      content: '您还未登录，是否去登录？',
      success: function (res) {
        if (res.confirm) {
          uni.navigateTo({
            url: '/pages/login/login',
          })
        } else if (res.cancel) {
          // uni.navigateBack();
        }
      },
    })

    return
  }
  return userId
  // return 200
  // return 265;
}

/**
 * 点击复制
 * @param {*} text
 */
export const useCopy = text => {
  const input = document.createElement('input')
  input.value = text
  document.body.appendChild(input)
  input.select()
  document.execCommand('Copy')
  document.body.removeChild(input)
  uni.showToast({
    title: '单号复制成功',
  })
}

/**
 * @description 防抖函数
 * @param {*} func
 * @param {*} wait
 * @param {*} immediate
 * @returns
 */
export function handleDebounce(func, wait, immediate) {
  let timeout

  return function () {
    let context = this
    let args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      var callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }
}

export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

/**
 * 根据地址获取经纬度
 * @param {*} address
 * @returns
 */
export const getAddressLongitudeAndLatitude = address => {
  return new Promise((resolve, reject) => {
    jsonp('https://apis.map.qq.com/ws/geocoder/v1/', {
      key: '3ODBZ-FVG3V-BPQPQ-UBZRP-ZXRVV-AUFGH',
      address: address,
      output: 'jsonp',
    })
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * 根据经纬度逆解析地址
 */
export const getAdressDetailByLngLat = (lat, lng) => {
  return new Promise((resolve, reject) => {
    jsonp('http://apis.map.qq.com/ws/geocoder/v1/', {
      key: '3ODBZ-FVG3V-BPQPQ-UBZRP-ZXRVV-AUFGH',
      location: `${lat},${lng}`,
      output: 'jsonp',
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 延长登录
 */
export const delayedLoginStatus = () => {
  const userId = uni.getStorageSync(J_USER_ID)
  if (userId) {
    whoami(userId).then(({ data }) => {
      console.log(data)
      uni.setStorageSync(J_TOKEN_EXPIRE, data.expireTime)
      uni.setStorageSync(J_USER_TOKEN, data.token)
    })
  }
}

/**
 * 随即色
 * @returns 
 */
export const randomRGB = () => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return `rgb(${r}, ${g}, ${b})`
}