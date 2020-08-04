const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExeciseSchema = new Schema({
  name: String,
  type: String,
  duration: ,
  distance: ,
  weight: ,
  sets:, 
  reps: ,
  date: 



});

const Book = mongoose.model("Execise", ExeciseSchema);

module.exports = Execise;
