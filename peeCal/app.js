// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log("getting data")
    this.globalData.dateRecord = wx.getStorageSync('dateRecord', )
    console.log(this.globalData.dateRecord)
    if(!this.globalData.dateRecord)
      this.globalData.dateRecord = []
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    saveData: function() {
      wx.setStorage({
        key: "dateRecord",
        data: this.dateRecord,
        success: () => {console.log("success setting data")},
        fail: () => {console.log("fail setting data")}
      })
    },
    // dateRecord: 
    // [
    //   {
    //     id: 1,
    //     date:
    //     {
    //       year: new Date().getFullYear(),
    //       month: new Date().getMonth() + 1,
    //       day: new Date().getDate()
    //     },
    //     peeTotal: 2000,
    //     timeRecord: 
    //     [
    //       {
    //         id: 1,
    //         time: {hour: 22, min: 22},
    //         peeValue: 200,
    //       },
    //       {
    //         id: 2,
    //         time: {hour: 22, min: 22},
    //         peeValue: 200,
    //       },
    //       {
    //         id: 3
    //       }
    //     ]
    //   }
    // ]
  }
})
