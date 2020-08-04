const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlanSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  execises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Execise"
    }
  ]
});

const Plan = mongoose.model("Plan", PlanSchema);

module.exports = Plan;
