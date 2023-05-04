const express = require('express')
const router = express.Router()

// 导入医生管理路由处理函数模块
const speciesHander = require('../router_handler/pet_species')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { addPetTypes_schema } = require('../schema/pet')

// 新增宠物类别
router.post('/addPetSpecies', expressJoi(addPetTypes_schema), speciesHander.addPetTypes)

// 获取所有宠物类别
router.get('/getPetTypes', speciesHander.getPetTypes)

module.exports = router