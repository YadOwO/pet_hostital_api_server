//导入数据库操作模块
const db = require('../db/index')

const NaiveBayes = require('naivebayes')
 
// 使用第三方中文分词库
const Segment = require('segment')
const segment = new Segment()
 
// 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
segment.useDefault()
 
// 分词测试
// console.log('测试中文分词库', segment.doSegment('这是一个基于Node.js的中文分词模块。', { simple: true }))
// 测试中文分词库 [ '这是', '一个', '基于', 'Node.js', '的', '中文', '分词', '模块', '。' ]
 
const classifier = new NaiveBayes({
    // 自定义分词器
    tokenizer(sentence) {
        // 仅保留英文、中文、数字
        const sanitized = sentence.replace(/[^(a-zA-Z\u4e00-\u9fa50-9_)+\s]/g, ' ')
        // 中英文分词
        return segment.doSegment(sanitized, { simple: true })
    }
})

// 向分类器添加训练数据
classifier.learn('耳朵痒，耳朵分泌物，耳朵异味', '耳螨感染');
classifier.learn('痒，皮肤发红，皮肤发炎', '跳蚤感染');
classifier.learn('眼部红肿，流眼泪，分泌物', '结膜炎');
classifier.learn('咳嗽，呼吸急促，乏力，减肥', '心丝虫病');
classifier.learn('呕吐，腹泻，食欲不振', '胃肠炎');
classifier.learn('体重下降，喝水量增加，尿量增加', '糖尿病');
classifier.learn('皮肤红肿，瘙痒，脱毛', '皮肤过敏');
classifier.learn('鼻涕，打喷嚏，眼分泌物', '上呼吸道感染');
classifier.learn('跛行，关节肿胀，活动受限', '关节炎');
classifier.learn('尿频，尿急，尿痛', '尿路感染');
classifier.learn('口臭，牙齿松动，牙龈红肿', '牙周病');
classifier.learn('心跳过快，呼吸困难，活动耐力降低', '心脏病');
classifier.learn('眼球突出，体重减轻，心悸', '甲状腺功能亢进');
classifier.learn('抓痒，皮肤破损，脓疱', '疥螨感染');
classifier.learn('喘息，咳嗽，呼吸困难', '气管炎');
classifier.learn('腹胀，便秘，恶心', '肠梗阻');
classifier.learn('喝水量减少，尿量减少，食欲不振', '肾脏病');
classifier.learn('疼痛，瘀血，软组织肿胀', '软组织损伤');
classifier.learn('发热，嗜睡，肌肉关节疼痛', '病毒性疾病');
classifier.learn('肿块，异常出血，体重下降', '肿瘤');
classifier.learn('抽搐，瞪大眼睛，僵硬', '癫痫发作');
classifier.learn('脱水，虚弱，心率增快', '热射病');
classifier.learn('不规律性走路，平衡失调，头晕', '前庭疾病');
classifier.learn('拒食，流口水，瞳孔放大', '中毒');

// 获取对于各分类的概率数组
console.log(classifier.categorize('发热，嗜睡，肌肉关节疼痛'))
console.log(classifier.probabilities('发热，嗜睡，肌肉关节疼痛'))


// 诊疗处理函数
exports.treat = (req, res) => {
    const { symptoms } = req.query
    let data = {
        bing: classifier.categorize(symptoms),
        gailv: classifier.probabilities(symptoms)
    }
    res.send({
        status: 0,
        message: '诊疗结果',
        data
    })
}

// 添加诊疗处理函数
exports.addTreatment = (req, res) => {
    const { pet_name, symptom, result, ev_users_id } = req.body;
    const insertTreatmentSql = 'INSERT INTO treatment (pet_name, symptom, result, ev_users_id) VALUES (?, ?, ?, ?)';
    db.query(insertTreatmentSql, [pet_name, symptom, result, ev_users_id], function (err, results) {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) {
        return res.cc('新增诊疗单失败，请稍后再试！');
      }
      res.cc('新增诊疗单成功！', 0);
    // res.send(req.body)
    });
  };

  // 查询征辽
  exports.getTreatmentById = (req, res) => {
    const id = req.query.id;
    // console.log(req)
    const selectTreatmentSql = 'SELECT * FROM treatment WHERE ev_users_id = ?';
    db.query(selectTreatmentSql, [id], function (err, results) {
      if (err) return res.cc(err);
      if (results.length === 0) return res.cc('查询诊疗单失败，请检查诊疗单ID是否正确');
      res.send({
        status: 0,
        message: '查询诊疗单成功',
        data: results,
      });
    });
  };
  
  // 删除
  exports.deleteTreatmentById = (req, res) => {
    const id = req.query.id;
    const deleteTreatmentSql = 'DELETE FROM treatment WHERE id = ?';
    db.query(deleteTreatmentSql, [id], function (err, results) {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) {
        return res.cc('删除诊疗单失败，请检查诊疗单ID是否正确');
      }
      res.cc('删除诊疗单成功', 0);
    });
  };
  
  