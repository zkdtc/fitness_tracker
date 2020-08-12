const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: { type:Date, default:Date.now},
    exercises: [
      // {
      //   type: {type:String},
      //   name: {type:String},
      //   duration: {type:Number},
      //   weight: {type:Number,default:0},
      //   reps: {type:Number,default:0},
      //   sets: {type:Number,default:0},
      //   distance: {type:Number, default:0}
      // }
    ]


});

WorkoutSchema.methods.setTotalDuration = function() {
  let total=0;
  this.exercises.forEach((exercise)=>{total=total+exercise.duration});
  this.totalDuration=total;
  return this.totalDuration;
};
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
