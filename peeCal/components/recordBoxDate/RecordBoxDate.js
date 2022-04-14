// components/recordBoxDate/RecordBoxDate.js
let app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        date: Object,
        value: Number,
        measure: String,
        title: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        displayDate: null,
        datePickerValue: null,
        displayValue: null,
        isSelected: false,
        displayDeleteButton: false,
    },

    pageLifetimes: {
        show: function() {
            console.log("page show")
            this.update()
        }
    },

    observers: {
        "**": function(value){
            app.globalData.saveData()
        },
        "value" : function(value) {
            console.log("value is changing")
            this.setData({
                displayValue: value
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onDateChange: function(e) {
            let date = e.detail.value
            let dateArr = date.split("-")
            dateArr = dateArr.map((item) => {
                return parseInt(item)
            })

            this.setData({
                datePickerValue: date,
                displayDate: dateArr[0] + "年" + dateArr[1] + "月" + dateArr[2] + "日"
            })

            let detail = {
                date: e.detail.value,
                index: this.dataset.index,
                value: this.data.value,
            }
            this.triggerEvent("dateChange", detail)
        },

        onLongTap: function(e){
            this.setData({
                displayDeleteButton: true,
            })
        },

        onDelete: function(e) {
            console.log('deleting index = ' + this.dataset.index)
            let detail = {
                index: this.dataset.index,
            }
            this.triggerEvent("deleteDate", detail)
        },

        hideDeleteButton: function(e) {
            this.setData({
                displayDeleteButton: false,
            })
        },

        doNothing: function(e){},

        update: function(){
            const {date, title, measure, value} = this.properties
            this.setData({
                title,
                displayValue: value,
                datePickerValue: date.year + "-" + date.month + "-" + date.day,
                displayDate: date.year + "年" + date.month + "月" + date.day + "日",
                measure
            })
        },


    },

    ready: function() 
    {
        console.log("ready")
        this.update()
    },
})
