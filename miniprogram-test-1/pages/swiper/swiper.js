

Page({
  onShareAppMessage() {
    return {
      
      title: 'swiper',
      path: 'pages/swiper/swiper'
    }
  },

  data: {
    // background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
   
  },

  onLoad(option) {
    var that = this;
    var app = getApp();
   
    //ajax请求数据
    wx.request({
      url: app.globalData.schoolurl + "/enroll/getnews",
      method: "post",
      data: {},
      success: function (res) {
        //--init data
        var status = res.data.code;
        var date = res.data.data;
        var time = require('../../utils/util.js');
        for(var i=0;i<date.length;i++){
          date[i].ctime = time.formatTimeTwo((date[i].ctime / 1000).toFixed(3), 'Y/M/D h:m:s')
        }
       if (status == 1) {
        
          that.setData({
            newsdata: date,
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
  },

  // 在线申请的方法
  onlineadd: function (e) {
    wx.navigateTo({
      url: '../form/form',
    })
  },
  // 招生简章
   admissionBrochure:function(e){
     var app=getApp();
     var that=this;
   wx.request({
     url: app.globalData.schoolurl + "/enroll/getregulations",
     method:"POST",
     data:{},
   success:function(res){
var status=res.data.code;
var  date=res.data.data;
if(status==1){

 console.log(date.info);
  wx.navigateTo({
    url: "../admissionBrochure/admissionBrochure",
  })

} else {
  wx.showToast({
    title: "网络请求超时",
    duration: 2500
  });
}


},
   fail:function(){
     // fail
     wx.showToast({
       title: '访问失败！',
       duration: 2000
     });
}

})
   },
  //  专业介绍
  professionalIntroduction:function(e){

wx.navigateTo({
  url: '../tab/tab',
})

  },
  // 招生问答
  questionsAndAnswers:function(e){

  },
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  }
})
