const express = require('express')
const router = express.Router()

// 导入医生管理路由处理函数模块
const petHander = require('../router_handler/pet')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { add_pet_schema, deletePet_schema } = require('../schema/pet')

// 新增宠物
router.post('/addPet', expressJoi(add_pet_schema), petHander.addPet)

// 修改宠物信息

// 删除宠物
router.post('/deletePet', expressJoi(deletePet_schema), petHander.deletePet)

module.exports = router