const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
   name : {
       type : String,
       required : [true, 'Please add the job name for this interview'],
       unique : true,
       dropDups : true,
    },

   startTime : {
    type : String,
    required : [true, 'Please add the start time'],
   },

   endTime : {
    type : String,
    required : [true, 'Please add the start time'],
   },

   participants : Array

});

const interview = mongoose.model('interview', InterviewSchema);

module.exports = interview;