const joi = require('joi')

// 宠物姓名
const pet_name = joi.string().min(1).max(50).required();

// 宠物种类
const species = joi.string().min(1).max(50).required();

// 宠物种类(猫或者狗)
const type = joi.string().min(1).max(10).required();

// 宠物年龄
const age = joi.number().integer().min(0).required();

// 医疗信息
const medical_info = joi.string().max(255);

// 宠物头像
const pet_pic = joi.string().uri();

// 用户id或者宠物id
const id = joi.number().integer().min(1).required()

// 宠物性别
const pet_gender = joi.string().min(1).max(50).required();

// 绝育状态
const isSterilization = joi.string().min(1).max(50).required();

// 体重
const weight = joi.number().min(0).required();

// 新增宠物的验证规则对象
exports.add_pet_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
      pet_name,
      species,
      age,
      medical_info,
      ev_users_id: id,
      pet_gender,
      isSterilization,
      weight
    },
}

// 更新宠物的验证规则对象
exports.update_pet_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
      pet_name,
      species,
      age,
      medical_info,
      pet_id: id,
      pet_gender,
      isSterilization,
      weight
    },
}

// 根据用户id获取宠物
exports.getPet_schema = {
    body: {
        ev_users_id: id
    }
}

// 删除宠物验证规则
exports.deletePet_schema = {
    body: {
        pet_id: id
    }
}

// 新增宠物类别
exports.addPetTypes_schema = {
    body: {
        species: type,
        species_name: species
    }
}

// 新增诊疗单
exports.add_treatment = {
    body: {
        ev_users_id: id,
        pet_name,
        symptom: pet_name,
        result: pet_name
    }
}