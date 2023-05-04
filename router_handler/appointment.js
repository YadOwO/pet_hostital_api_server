//导入数据库操作模块
const db = require('../db/index')

// 新增预约单处理函数
exports.addAppointment = (req, res) => {
  // 接受表单数据
  const { appointment_name, ev_user_id, doctor_id, date } = req.body;

  // 定义新增预约单的 SQL 语句
  const insertAppointmentSql = 'INSERT INTO appointment (appointment_name, ev_users_id, doctor_id, date) VALUES (?, ?, ?, ?)';
  // 执行 SQL 语句
  db.query(insertAppointmentSql, [appointment_name, ev_user_id, doctor_id, date], function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err);
    // SQL 语句执行成功，但影响行数不为 1
    if (results.affectedRows !== 1) {
      return res.cc('新增预约单失败，请稍后再试！');
    }
    // 新增预约单成功
    res.cc('新增预约单成功！', 0);
  });
};
  
// 删除预约单处理函数
exports.deleteAppointment = (req, res) => {
  // 接受请求参数中的预约单 ID
  const { appointment_id } = req.body;

  // 定义删除预约单的 SQL 语句
  const deleteAppointmentSql = 'DELETE FROM appointment WHERE appointment_id = ?';
  // 执行 SQL 语句
  db.query(deleteAppointmentSql, [appointment_id], function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err);
    // SQL 语句执行成功，但影响行数不为 1
    if (results.affectedRows !== 1) {
      return res.cc('删除预约单失败，请稍后再试！');
    }
    // 删除预约单成功
    res.cc('删除预约单成功！', 0);
  });
};

// 修改预约单处理函数
exports.updateAppointment = (req, res) => {
  // 接受表单数据
  const { appointment_name, date, appointment_id } = req.body;

  // 定义修改预约单的 SQL 语句
  const updateAppointmentSql = 'UPDATE appointment SET appointment_name = ?, date = ? WHERE appointment_id = ?';
  // 执行 SQL 语句
  db.query(updateAppointmentSql, [appointment_name, date, appointment_id], function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err);
    // SQL 语句执行成功，但影响行数不为 1
    if (results.affectedRows !== 1) {
      return res.cc('修改预约单失败，请稍后再试！');
    }
    // 修改预约单成功
    res.cc('修改预约单成功！', 0)
  });
};
