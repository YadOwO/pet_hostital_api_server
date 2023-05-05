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
classifier.learn('口臭，牙结石，牙龈发炎', '口腔问题');
classifier.learn('咳嗽，呼吸急促，乏力，减肥', '心丝虫病');

// 获取对于各分类的概率数组
console.log(classifier.categorize('牙结石'))
console.log(classifier.probabilities('牙结石'))


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