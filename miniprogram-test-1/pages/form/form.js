Page({
  onShareAppMessage() {
    return {
      title: 'form',
      path: 'page/component/pages/form/form'
    }
  },

  data: {
    pickerHidden: true,
    chosen: '',
    buylist: [],
  },
  
  onLoad(option) {
    var that = this;
    var  app=getApp();
     //ajax请求数据
    wx.request({
      url: app.globalData.schoolurl+"/enroll/getfields",
      method:"post",
      data: {
    
      },
      success: function (res) {
        //--init data
        var status = res.data.code;
        var date = res.data.data;
        var redioss = new Array();
        if (status == 1) {
          for (var i = 0; i < date.length; i++) {
            if (date[i].fieldType == "radiobox") {
              var rediojson = JSON.parse(date[i].fieldOption);
              for (var j = 0; j < rediojson.length; j++) {
                redioss[j] = rediojson[j].name;
              }
            }
          };
          that.setData({
            formdata: date,
            rediosss: redioss,
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

 
  pickerConfirm(e) {
    this.setData({
      pickerHidden: true
    })
    this.setData({
      chosen: e.detail.value
    })
  },

  pickerCancel() {
    this.setData({
      pickerHidden: true
    })
  },

  pickerShow() {
    this.setData({
      pickerHidden: false
    })
  },

  formSubmit(e) {
   
   
    var fields=[];
    // map=new Map();
    // map.set(value, "");
    for(var i=0;i<this.data.formdata.length;i++){
      var paras = this.data.formdata.fieldName;
      // console.log(this.data.formdata[i].id);
      // map.set(fieldid, this.data.formdata[i].id);
      // console.log(e.detail.value.姓名);
      console.log(paras);
    }
    ;
   
    // console.log(map);
    // // 提交事件
    // if (e.detail.value.姓名.length == 0 || e.detail.value.姓名.length == 0) {
    //   wx.showToast({
    //     title: '姓名不可为空!',
    //     icon: 'loading',
    //     duration: 1500
    //   })
    //   setTimeout(function () {
    //     wx.hideToast()
    //   }, 2000)
    // } else if (e.detail.value.身份证.length <=0) {
    //   wx.showToast({
    //     title: '请输入身份证!',
    //     icon: 'loading',
    //     duration: 1500
    //   })
    //   setTimeout(function () {
    //     wx.hideToast()
    //   }, 2000)
    // }else {
    //   wx.request({
    //     url: 'https://enrollminiapi.hxinsoft.com/enroll/setstudentinfo',
    //     header: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     },
    //     method: "POST",
    //     data: { 
    //       fields: e.detail.value.mobile, 
    //       appid: '' },
    //     success: function (res) {
    //       if (res.data.status == 0) {
    //         wx.showToast({
    //           title: res.data.msg,
    //           icon: 'loading',
    //           duration: 1500
    //         })
    //       } else {
    //         wx.showToast({
    //           title: res.data.msg,//这里打印出登录成功
    //           icon: 'success',
    //           duration: 1000
    //         })
    //       }
    //     }
    //   })

    // }

    








  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  }
})
