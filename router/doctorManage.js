const express = require('express')
const router = express.Router()

// 导入医生管理路由处理函数模块
const doctorManageHandler = require('../router_handler/doctorManage')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { add_doctor_schema, delete_doctor_schema } = require('../schema/doctor')

// 新增医生
router.post('/addDoctor', expressJoi(add_doctor_schema), doctorManageHandler.addDoctor)

// 获取所有医生信息
router.get('/getAllDoctor', doctorManageHandler.getAllDoctor)

// 根据id删除医生
router.delete('/deleteDoctor', expressJoi(delete_doctor_schema), doctorManageHandler.deleteDoctor)

module.exports = router