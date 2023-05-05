const express = require('express')
const router = express.Router()

// 导入医生管理路由处理函数模块
const treat = require('../router_handler/treat')

// 只能诊疗
router.post('/treat', treat.treat)

module.exports = router