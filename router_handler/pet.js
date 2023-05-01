//导入数据库操作模块
const db = require('../db/index')

// 新增宠物
exports.addPet = (req, res) => {
    const {pet_name, species, age, pet_gender,
           isSterilization, weight, ev_users_id} = req.body

    // 定义插入宠物的 SQL 语句
    const insertPetSql = 'insert into pet set ?'
    // 执行 SQL 语句
    db.query(insertPetSql, {
    pet_name,
    species,
    age, // 宠物年龄
    pet_gender, // 宠物性别
    isSterilization, // 是否绝育
    weight,
    ev_users_id
    }, function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // SQL 语句执行成功，但影响行数不为 1
    if (results.affectedRows !== 1) {
        return res.cc('新增宠物失败，请稍后再试！')
    }
    // 新增医生成功
    res.cc('新增宠物成功！', 0)
    })
}

// 获取用户宠物
exports.getPet = (req, res) => {
    //用户id
    const { ev_users_id } = req.body
    //定义获取宠物的 SQL 语句
    const getPetSql = 'select * from pet where ev_users_id = ?'
    //执行sql语句
    db.query(getPetSql, ev_users_id, function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // SQL 语句执行成功
    res.send({
        status: 0,
        message: '获取宠物列表成功！',
        data: results
    })
    })
}

// 修改宠物信息
exports.updatePet = (req, res) => {
    const {pet_name, species, age, pet_gender,
           isSterilization, weight, pet_id} = req.body

    // 定义更新宠物的 SQL 语句
    const insertPetSql = 'update pet set ? where pet_id=?'
    // 执行 SQL 语句
    db.query(insertPetSql, [{
    pet_name,
    species,
    age, // 宠物年龄
    pet_gender, // 宠物性别
    isSterilization, // 是否绝育
    weight,
    pet_id
    }, pet_id], function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // SQL 语句执行成功，但影响行数不为 1
    if (results.affectedRows !== 1) {
        return res.cc('修改宠物信息失败，请稍后再试！')
    }
    // 修改宠物信息成功
    res.cc('修改宠物信息成功！', 0)
    })
}

// 删除宠物
exports.deletePet = (req, res) => {
    // 删除宠物的id
    const { pet_id } = req.body

    //定义删除宠物的 SQL 语句
    const deletePetSql = 'delete from pet where pet_id=?';
    //执行 SQL 语句
    db.query(deletePetSql, [pet_id], function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // SQL 语句执行成功，但影响行数不为 1
    if (results.affectedRows !== 1) {
        return res.cc('删除宠物失败，请稍后再试！')
    }
    // 删除宠物成功
    res.cc('删除宠物成功！', 0)
    })
}