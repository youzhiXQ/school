Page({
  onShareAppMessage() {
    return {
      title: 'form',
      path: 'page/component/pages/form/form'
    }
  },

  data: {
    roles: null,
  },
   
  onLoad(option) {
    this.setData({ roles: decodeURIComponent(option.role) })
  },
 
  formSubmit(e) {
    
    // 提交事件
    if (e.detail.value.name.length == 0 ) {
      wx.showToast({
        title: '姓名不可为空!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    
    }else {
      wx.request({
        url: app.globalData.schoolurl + "/user/wxregist",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "GET",
        data: { 
          role: roles, 
          appid: '' ,
          name: e.detail.value.name,
          },
        success: function (res) {
          if (res.data.status == 0) {
            wx.showToast({
              title: res.data.msg,
              icon: 'loading',
              duration: 1500
            });
          
          } else {
            wx.showToast({
              title: res.data.msg,//这里打印出登录成功
              icon: 'success',
              duration: 1000
            })
            wx.request({
              url: '../swiper/swiper',
            });
          }
        }
      })

    }

    








  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  }
})
