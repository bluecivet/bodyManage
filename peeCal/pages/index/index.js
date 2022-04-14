// index.js
// 获取应用实例
const app = getApp()
const dateRecordArr = app.globalData.dateRecord
const DAY_INCREASE = 1

Page({
  data: {    
  },

  onLoad: function(e) {
    this.setData({dateRecord: app.globalData.dateRecord})
  },

  onShow: function() {
    console.log("onShow")
    console.log(app.globalData.dateRecord)
    this.setData({dateRecord: app.globalData.dateRecord})
  },

 gotoDateDetail: function(e) {
    wx.navigateTo({
      url: '/pages/detailPage/detailPage?index=' + e.currentTarget.dataset.index,
    })
 },

 onDateChange: function(e) {
   const {date, index} = e.detail 
   let dateArr = date.split("-")
   dateArr = dateArr.map((item) => {
        return parseInt(item)
    })
   dateRecordArr[index].date = {
      year: dateArr[0],
      month: dateArr[1],
      day: dateArr[2]
   }
   this.setData({...this.data})
   app.globalData.saveData()
 },

 onDelete: function(e) {
   console.log(e.detail)
   const {index} = e.detail
   console.log("index.js deleting " + index)
   dateRecordArr.splice(index, 1)
   console.log("dateRecordArr = ", dateRecordArr)
   this.setData({
    dateRecord: app.globalData.dateRecord
   })
   app.globalData.saveData()
 },

 onAddButtonClick: function(e) {
   let lastDayInRecord
   let today = new Date()
   let nextDate
  
   if(dateRecordArr.length){
      lastDayInRecord  = dateRecordArr[dateRecordArr.length - 1].date
      const {year, month, day} = lastDayInRecord
      nextDate = new Date(year, month - 1, day + DAY_INCREASE);
   }
   else{
      nextDate = today
   }

   dateRecordArr.push({
     id: dateRecordArr.length + 1,
     date: {
       year: nextDate.getFullYear(),
       month: nextDate.getMonth() + 1,
       day: nextDate.getDate()
     },
     peeTotal: 0,
     timeRecord: [{id: 1}]
   })

   this.setData({dateRecord: app.globalData.dateRecord})
   app.globalData.saveData()
 }
})
