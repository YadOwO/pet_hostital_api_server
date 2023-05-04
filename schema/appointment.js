const joi = require('joi');

// 时间检验
const datetimeSchema = joi.string().max(45).required();

// id
const id = joi.number().integer().min(1).required();

// 预约姓名
const appointment_name = joi.string().min(1).max(50).required();

// 新增预约单
module.exports.add_appointment = {
    body: {
        ev_user_id: id,
        doctor_id: id,
        appointment_name,
        date: datetimeSchema,
    }
};

// 删除预约单
module.exports.delete_appointment = {
    body: {
        appointment_id: id
    }
}

// 修改预约单
module.exports.update_appointment = {
    body: {
        appointment_id: id,
        date: datetimeSchema,
        appointment_name
    }
}