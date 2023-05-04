const express = require('express')
const router = express.Router()

// 导入医生管理路由处理函数模块
const doctorManageHandler = require('../router_handler/doctorManage')

// 导入预约单管理路由处理函数模块
const appointmentManageHandler = require('../router_handler/appointment')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { add_doctor_schema, delete_doctor_schema, 
        update_doctor_schema, update_avatar_schema } = require('../schema/doctor')

// 新增医生
router.post('/addDoctor', expressJoi(add_doctor_schema), doctorManageHandler.addDoctor)

// 更新医生信息
router.post('/updateDoctor', expressJoi(update_doctor_schema), doctorManageHandler.updateDoctor)

// 更新医生头像
router.post('/updateAvatar', expressJoi(update_avatar_schema), doctorManageHandler.updateAvatar)

// 获取所有医生信息
router.get('/getAllDoctor', doctorManageHandler.getAllDoctor)

// 根据id删除医生
router.delete('/deleteDoctor', expressJoi(delete_doctor_schema), doctorManageHandler.deleteDoctor)

// 根据 doctor_id 查询预约单
router.get('/getAppointmentsByDoctorId', appointmentManageHandler.getAppointmentsByDoctorId)

module.exports = router