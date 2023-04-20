//导入数据库操作模块
const db = require('../db/index')

//新增医生处理函数
exports.addDockor = (rep, res) => {
    // 定义新增医生的 SQL 语句
    const insertDoctorSql = 'insert into doctor set ?'
    // 执行 SQL 语句
    db.query(insertDoctorSql, {
        doctor_name: '医生名称',
        phone: '123456789',
        profile: '医生简介',
        weChat: '微信号',
        label: '医生标签',
        skilled: '擅长领域',
        fans: 1000,
        chuFang: 500,
        askNum: 10000,
        jobTitle: '医生职称'
        }, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // SQL 语句执行成功，但影响行数不为 1
        if (results.affectedRows !== 1) {
            return res.cc('新增医生失败，请稍后再试！')
        }
        // 新增医生成功
        res.cc('新增医生成功！', 0)
    })

}