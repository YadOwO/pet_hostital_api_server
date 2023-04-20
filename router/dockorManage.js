const express = require('express')
const router = express.Router()

// 导入医生管理路由处理函数模块
const dockorManageHandler = require('../router_handler/dockorManage')

// 新增医生
router.post('/addDockor', dockorManageHandler.addDockor)

module.exports = router