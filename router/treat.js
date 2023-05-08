const express = require('express')
const router = express.Router()

// 导入医生管理路由处理函数模块
const treat = require('../router_handler/treat')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { add_treatment } = require('../schema/pet')

// 智能诊疗
router.get('/treat', treat.treat)

// 添加诊疗
router.post('/addTreatment', expressJoi(add_treatment), treat.addTreatment)

// 查询
router.get('/getTreatmentById', treat.getTreatmentById)

// 删除
router.delete('/deleteTreatment', treat.deleteTreatmentById)

module.exports = router