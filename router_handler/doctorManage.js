//导入数据库操作模块
const db = require('../db/index')

//新增医生处理函数
exports.addDoctor = (req, res) => {
    // 接受表单数据
    const { doctor_name, phone, profile, weChat,jobTitle,
            label, skilled, fans, chuFang, askNum, } = req.body

    // 定义新增医生的 SQL 语句
    const insertDoctorSql = 'insert into doctor set ?'
    // 执行 SQL 语句
    db.query(insertDoctorSql, {
        doctor_name,
        phone,
        profile,
        weChat,
        label,
        skilled,
        fans,
        chuFang,
        askNum,
        jobTitle
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

// 获取所有医生信息
exports.getAllDoctor = (req, res) => {
    // 定义获取所有医生信息的 SQL 语句
    const getAllDoctorsSql = 'select * from doctor'
    // 执行 SQL 语句
    db.query(getAllDoctorsSql, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取医生列表成功',
            data: results
        })
    })
}