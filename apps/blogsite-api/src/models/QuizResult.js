const { Schema, model } = require('mongoose');

const QuizResultSchema = new Schema({
  answers: { type: [String], required: true },
  result: {
    title: { type: String, required: true },
    items: { type: [String], required: true }
  },
  meta: { type: Object },
  quiz_result_id: { type: String, index: true, unique: true },
  createdAt: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = model('QuizResult', QuizResultSchema);


