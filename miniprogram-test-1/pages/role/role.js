Page({
  onShareAppMessage() {
    return {
      title: 'role',
      path: 'page/component/pages/role/role'
    }
  },

  data: {
   
  },
  
  onLoad(option) {
   
  },


  student() {
   wx.navigateTo({
     url: '../regedit/regedit?role=student',
     data: {
       role: "student"
     }
   })
    // this.setData({
    //   chosen: ''
    // })
  },
  teacher() {
    wx.navigateTo({
      url: '../regedit/regedit?role=teacher',
       
    })
    // this.setData({
    //   chosen: ''
    // })
  }
})
