class NaiveBayes {
    constructor() {
      this.categories = new Set();
      this.wordsPerCategory = new Map();
      this.wordCountsPerCategory = new Map();
      this.totalWords = 0;
    }
  
    tokenize(text) {
      return text
        .toLowerCase()
        .split(/\W+/)
        .filter((token) => token.length > 0);
    }
  
    train(text, category) {
      this.categories.add(category);
  
      if (!this.wordsPerCategory.has(category)) {
        this.wordsPerCategory.set(category, new Map());
        this.wordCountsPerCategory.set(category, 0);
      }
  
      const tokens = this.tokenize(text);
      const words = this.wordsPerCategory.get(category);
      tokens.forEach((token) => {
        if (!words.has(token)) {
          words.set(token, 0);
        }
  
        words.set(token, words.get(token) + 1);
        this.wordCountsPerCategory.set(category, this.wordCountsPerCategory.get(category) + 1);
        this.totalWords += 1;
      });
    }
  
    predict(text) {
      const tokens = this.tokenize(text);
      const probabilities = new Map();
  
      this.categories.forEach((category) => {
        const words = this.wordsPerCategory.get(category);
        const wordCount = this.wordCountsPerCategory.get(category);
  
        let probability = Math.log(wordCount / this.totalWords);
  
        tokens.forEach((token) => {
          const tokenProbability =
            words.has(token) ? (words.get(token) + 1) / (wordCount + this.totalWords) : 1 / (wordCount + this.totalWords);
          probability += Math.log(tokenProbability);
        });
  
        probabilities.set(category, probability);
      });
  
      let bestCategory = null;
      let bestProbability = -Infinity;
  
      probabilities.forEach((probability, category) => {
        if (probability > bestProbability) {
          bestCategory = category;
          bestProbability = probability;
        }
      });
  
      return bestCategory;
    }
  }
  
// 向外共享 db 数据库连接对象
module.exports = NaiveBayes