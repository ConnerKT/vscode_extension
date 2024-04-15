const mongoose = require('mongoose');
const Problem = require('../models/problem');
const dotenv = require('dotenv').config();
const getNextSequenceValue = require('../utils/sequenceGenerator');

mongoose.connect(process.env.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });


exports.getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find({});
    res.json(problems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.createProblem = async (req, res) => {
  try {
    const { title, difficulty, description, link } = req.body;

    const maxIdProblem = await Problem.findOne({}).sort({ id: -1 });
    const nextId = maxIdProblem ? maxIdProblem.id + 1 : 1;

    // Create a new Problem instance with the generated id
    const newProblem = new Problem({
      id: nextId,
      title,
      difficulty,
      description,
      link
    });
    const savedProblem = await newProblem.save();
    res.status(201).json(savedProblem);

  }catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
exports.deleteProblem = async (req, res) => {
  const problemId = req.params.id;
  console.log(problemId);
  try {
    const deletedProblem = await Problem.findByIdAndDelete(problemId);
    console.error(deletedProblem);
    if (!deletedProblem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    res.json({ message: 'Problem deleted successfully', deletedProblem });
  }catch(err){
    res.status(500).json({ message: error.message });
    console.error(err);
  }
}