const express = require('express')
const router = express.Router()

// 导入医生管理路由处理函数模块
const appointmentManageHandler = require('../router_handler/appointment')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { add_appointment, delete_appointment, update_appointment } = require('../schema/appointment')

// 新增预约单
router.post('/addAppointment', expressJoi(add_appointment), appointmentManageHandler.addAppointment)

// 删除预约单
router.delete('/deleteAppointment', expressJoi(delete_appointment), appointmentManageHandler.deleteAppointment)

// 修改预约单
router.post('/updateDppointment', expressJoi(update_appointment), appointmentManageHandler.updateAppointment)

module.exports = router