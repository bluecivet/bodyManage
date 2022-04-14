// components/recordBoxTime/RecordBoxTime.js
let app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // timeRecord: Object,
        // currentTime: Object,
        title: String,
        measure: String, 
        value: Number,
        time: String,
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentTimeStr: "",
        timePickerValue: "",
        displayValue: null,
        oldTime: null,
        oldValue: null,
        isSelected: false,
        displayDeleteButton: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bindTimeChange: function(e) {
            this.setData({
              oldTime: this.data.timePickerValue,
              timePickerValue: e.detail.value
            })
            let detail = {
                index: this.dataset.index,
                time: e.detail.value,
                value: this.data.displayValue,
                oldTime: this.data.oldTime,
            }
            this.triggerEvent("timeChange", detail)
        },

        bindInputBlur: function(e) {
            this.setData({
                oldValue: this.data.displayValue,
                displayValue: e.detail.value,
            })

            let detail = {
                index: this.dataset.index,
                value: parseInt(e.detail.value),
                time: this.data.timePickerValue,
                oldValue: this.data.oldValue,

            }
            this.triggerEvent("inputBlur", detail)
            // this.setData({
            //     defaultPeeValue: null
            // })
        },

        onLongTap: function(e){
            this.setData({
                displayDeleteButton: true,
            })
        },

        onDelete: function(e) {
            let detail = {
                index: this.dataset.index,
            }
            this.triggerEvent("deleteTime", detail)
        },

        hideDeleteButton: function(e) {
            this.setData({
                displayDeleteButton: false,
            })
        },

    },

    attached: function()
    {
        console.log(this.properties)
        const {time, title, value, measure} = this.properties
        
        let currentTime;
        if(!time || time == ''){
            currentTime = new Date()
            currentTime = currentTime.getHours() + ":" + currentTime.getMinutes()
        }
        this.setData({
            title,
            displayValue:  value || this.data.displayValue,
            measure,
            time,
            timePickerValue: time || currentTime,
            oldTime: this.data.timePickerValue,
            oldValue: this.data.displayValue
        })
    }   
})
