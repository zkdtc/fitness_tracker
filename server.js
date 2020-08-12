const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3090;

const db = require("./models");
const path = require("path");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


app.get("/", (req, res) => {
  console.log('Start');
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.put("/", (req, res) => {
  console.log('Start');
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public/stats.html"));
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~ Linked to 'new workout' button  in index.html ~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public/exercise.html"));
 });

 // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~ Linked to 'continue workout' button  in index.html ~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get("/exercise?", (req, res) => {
  console.log(req.query);
  db.Workout.find({_id:req.query.id})
    .then(exercise => {
      console.log()
      res.sendFile(path.join(__dirname, "public/exercise.html"));
      //res.render('exercise');
      //res.json(exercise);
    })
    .catch(err => {
      res.json(err);
    });
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~ Linked to getLastWorkout ~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get("/api/workouts", (req, res) => {
  db.Workout.find({}).lean()
    .then(workouts => {
      var n=workouts.length;
      for (i=0; i<n; i++){
        workout=workouts[i];
        n2=workout.exercises.length;
        var t=0;
        for (j=0;j<n2;j++){
          t=t+workout.exercises[j].duration;
        }
        workouts[i].totalDuration=t;
      }
      // console.log(workouts[0]);
      res.json(workouts);
    })
    .catch(err => {
      res.json(err);
    });
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~ Linked to createWorkout  ~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.post("/api/workouts", ({body}, res) => {
  db.Workout.create({exercises:[]})
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    res.json(err);
  });
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~ Linked to addExercise    ~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.put("/api/workouts/:id?", (req, res) => {
  console.log('/api/workouts/:id');
  console.log('req',req.params,req.body);
  if(req.body.name){   // If entry not empty
  db.Workout.findOneAndUpdate({_id:req.params.id},{$push:{exercises:req.body}})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
}
    else{
      //res.sendFile(path.join(__dirname, "public/index.html"));
     res.redirect("/");
    }
})


app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      console.log('/api/workouts/range data in app',dbWorkout)
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});