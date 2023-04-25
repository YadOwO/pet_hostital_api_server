const express = require('express')
const router = express.Router()

// 导入医生管理路由处理函数模块
const petHander = require('../router_handler/pet')

// 新增宠物
router.post('/addPet', petHander.addPet)

module.exports = router