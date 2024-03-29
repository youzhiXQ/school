var network = require("/utils/network.js")



App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          var app = getApp();
          //发起网络请求
          wx.request({
            url: app.globalData.schoolurl + "/user/wxlogin",
            data: {
              wxcode: res.code
            }
          })
        } else {
          // console.log('登录失败！' + res.errMsg)
          wx.navigateTo({
            url: '../role/role',
          })
        }


      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    schoolurl:"https://enrollminiapi.hxinsoft.com",
    myAppID:"wx05751c6ba231d4ec",
  }
})