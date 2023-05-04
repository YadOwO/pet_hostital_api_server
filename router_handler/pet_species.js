//导入数据库操作模块
const db = require('../db/index')

// 新增宠物类别处理函数
exports.addPetTypes = (req, res) => {
    // 接受表单数据
    const { species, species_name } = req.body;
  
    // 定义新增宠物类别的 SQL 语句
    const insertPetCategorySql = 'INSERT INTO pet_types (species, species_name) VALUES (?, ?)';
    // 执行 SQL 语句
    db.query(insertPetCategorySql, [species, species_name], function (err, results) {
      // 执行 SQL 语句失败
      if (err) return res.cc(err);
      // SQL 语句执行成功，但影响行数不为 1
      if (results.affectedRows !== 1) {
        return res.cc('新增宠物类别失败，请稍后再试！');
      }
      // 新增宠物类别成功
      res.cc('新增宠物类别成功！', 0);
    });
  };
  
// 获取所有宠物类别处理函数
exports.getPetTypes = (req, res) => {
    // 定义获取所有宠物类别的 SQL 语句
    const getPetCategoriesSql = 'SELECT * FROM pet_types';
    // 执行 SQL 语句
    db.query(getPetCategoriesSql, function (err, results) {
      // 执行 SQL 语句失败
      if (err) return res.cc(err);
      // 获取所有宠物类别成功
      res.send({
        status: 0,
        message: '获取所有宠物类别成功！',
        data: results,
      });
    });
  };
  