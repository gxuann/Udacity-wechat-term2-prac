// pages/trolley/trolley.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    locationAuthType: app.data.locationAuthType,
    orderList: [], // 订单列表
  },
  onTapLogin: function () {
    app.login({
      success: ({ userInfo }) => {
        this.setData({
          userInfo,
          locationAuthType: app.data.locationAuthType
        })
      },
      error: () => {
        this.setData({
          locationAuthType: app.data.locationAuthType
        })
      }
    });
    this.getOrder();
  },
  getOrder() {
    wx.showLoading({
      title: '正在加载订单…',
    })
    qcloud.request({
      url: config.service.orderList,
      login: true,
      success: result => {
        wx.hideLoading();
        console.log(result)
        let data = result.data
        if(!data.code){
          this.setData({
            orderList: data.data
          })
        }else {
          wx.showToast({
            title: '订单数据加载失败…',
            icon: 'none'
          })
        }
      },
      fail: result => {
        wx.hideLoading();
        wx.showToast({
          title: '订单数据加载失败…',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      locationAuthType: app.data.locationAuthType
    })
    app.checkSession({
      success: ({ userInfo }) => {
        this.setData({
          userInfo
        });
        this.getOrder();
      }
    })
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

  }
})