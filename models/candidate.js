
const mongoose = require('mongoose');
const validator = require('validator');

const CandidateSchema = new mongoose.Schema({
    username: {
        type : String,
        required : [true, 'Please add the candidate name'],
        minLength : [3, "Minimum length of name must be 3"],
        maxLength : [8,  "Maximum length of name must be 8"],
    },
    email :{
        type : String, 
        required : [true, 'Email must not be empty' ],
        unique : true,
        dropDups: true,
        lowercase : true,
        validate : [validator.isEmail, 'Please enter a correct email']
    }
});

const Candidate = mongoose.model('Candidate', CandidateSchema);

module.exports = Candidate;