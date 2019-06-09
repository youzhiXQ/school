Page({
  onShareAppMessage() {
    return {
      title: 'tab',
      path: 'page/component/pages/tab/tab'
    }
  },
  data: {
    currentIndex: 0,
  },
  //swiper切换时会调用
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex;
      currentPageIndex = (currentPageIndex +1) %3;
      // 如果有this指向不明的，可先将this赋值给其他变量，再进行使用。
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },
  onLoad(option) {

    var app = getApp();
    var that = this;
    wx.request({
      url: app.globalData.schoolurl + "/enroll/getproinfo",
      method: "POST",
      data: {},
      success: function (res) {
        var status = res.data.code;
        var dates = res.data.data;
      
        if (status == 1) {
          that.setData({
            tabdata: dates,
          })
          
        } else {
          wx.showToast({
            title: "网络请求超时",
            duration: 2500
          });
        }


      },
      fail: function () {
        // fail
        wx.showToast({
          title: '访问失败！',
          duration: 2000
        });
      }

    })
  }


})