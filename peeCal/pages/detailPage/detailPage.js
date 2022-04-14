// pages/detailPage/detailPage.js
let app = getApp()
let dateRecordIndex;
let timeRecordArr;

function sortByTime(a, b) {
    if(!a.time || !b.time)
        return 1
    else {
        if(a.time.hour == b.time.hour)
            return a.time.min - b.time.min
        else 
            return a.time.hour - b.time.hour
    }
}

function shouldIncrease(timeRecordArr, index) {
    let lastElement = timeRecordArr[timeRecordArr.length - 1]
    console.log(lastElement)
    return index == timeRecordArr.length - 1 
        && (lastElement.time || lastElement.peeValue)
}

function getTotal(timeRecordArr) {
    let total = 0
    timeRecordArr.forEach((ele) => {
        if(ele.peeValue)
           total += ele.peeValue
    })
    return total
}


Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTime: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let index = new Number(options.index)
        let date = new Date();
        let time = {
            hour: date.getHours(),
            min: date.getMinutes()
        }
        dateRecordIndex = index
        timeRecordArr =  app
                            .globalData
                            .dateRecord[dateRecordIndex]
                            .timeRecord
        
        timeRecordArr.sort(sortByTime)

        this.setData({
            dateRecord: app.globalData.dateRecord[index],
            currentTime: time,
        })
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        timeRecordArr.sort(sortByTime)
        this.setData({...this.data})
        app.globalData.saveData()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    onTimeChange: function(e){
        const {detail} = e
        const {time, index} = detail
        let timeArr = time.split(":")
        let timeRecord = {
            hour: parseInt(timeArr[0]),
            min: parseInt(timeArr[1]),
        }
        
        timeRecordArr[index].time = timeRecord 

        if(shouldIncrease(timeRecordArr, index)) {
            timeRecordArr.push({
                id: timeRecordArr.length + 1,
            })
        }
                       
        this.setData({
            dateRecord: app.globalData.dateRecord[dateRecordIndex],
        })
        app.globalData.saveData()
    },

    onInputBlur: function(e) {
        const {detail} = e
        const {index} = detail

        timeRecordArr[index].peeValue = e.detail.value
        
        app.globalData.dateRecord[dateRecordIndex].peeTotal = getTotal(timeRecordArr)

         if(shouldIncrease(timeRecordArr, index)){
            timeRecordArr.push({
                id: timeRecordArr.length + 1,
            })
        }

         this.setData({
            dateRecord: app.globalData.dateRecord[dateRecordIndex],
        })
        app.globalData.saveData()
    },

    onDeleteTime: function(e) {
        const {index} = e.detail
        timeRecordArr.splice(index, 1)
        app.globalData.dateRecord[dateRecordIndex].peeTotal = getTotal(timeRecordArr)
        this.setData({
            dateRecord: app.globalData.dateRecord[dateRecordIndex],
        })
        app.globalData.saveData()
    }

})