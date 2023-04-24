const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */


// id
const id = joi.number().integer().min(1).required()

//医生姓名
const doctor_name = joi.string().min(2).max(8).regex(/^[\u4E00-\u9FA5]{2,4}$/).required();

//医生电话号码
const phone = joi.string().length(11).regex(/^1[3456789]\d{9}$/).required();

//医生微信号码
const weChat = joi.string().max(20).required();

//医生简介、医生标签、医生擅长领域
const ProfileLabelSkilled = joi.string().max(255).required();

//粉丝数、处方数、问诊数
const number = joi.number().integer().min(0);

//粉丝数、处方数、问诊数(更新信息时必填)
const numberRequired = joi.number().integer().min(0).required();

//医生头衔
const jobTitle = joi.string().max(50).required();

// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().required()

// 新增医生的验证规则对象
exports.add_doctor_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
      doctor_name,
      phone,
      weChat,
      profile: ProfileLabelSkilled,
      label: ProfileLabelSkilled,
      skilled: ProfileLabelSkilled,
      fans: number,
      chuFang: number,
      askNum: number,
      jobTitle
    },
}

// 更新医生信息的验证规则对象
exports.update_doctor_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    id,
    doctor_name,
    phone,
    weChat,
    profile: ProfileLabelSkilled,
    label: ProfileLabelSkilled,
    skilled: ProfileLabelSkilled,
    fans: numberRequired,
    chuFang: numberRequired,
    askNum: numberRequired,
    jobTitle
  },
}

// 验证规则对象 - 删除医生
exports.delete_doctor_schema = {
  body: {
    id,
  },
}

// 验证规则对象 - 更新头像
exports.update_avatar_schema = {
  body: {
    avatar,
    id
  },
}