const express = require('express');
const router = express.Router();

const { addCandidate, SelectCandidates } = require('./controllers/candidateController');
const {sendMail} = require('./sendMail');
const {listAll, ScheduleInterview, EditInterview} = require('./controllers/interviewController');

router.get('/', listAll);

router.get('/add_a_candidate', (req, res) => {
    res.status(200).render('addCandidate');
});

router.post('/add', addCandidate);

router.get('/schedule_interview', (req, res) => {
    res.status(200).render('scheduleInterview');
});

router.post('/schedule_interview', ScheduleInterview, sendMail);

router.post('/select_candidates', SelectCandidates);

router.get('/select_candidates', (req, res) => {
    const name = req.cookies.name;
    const candidates = req.cookies.candidates;
    const startTime = req.cookies.startTime;
    const endTime = req.cookies.endTime;

    res.status(200).render('selectCandidates', {candidates, startTime, endTime, name});
});

router.post('/edit_interview', EditInterview);

router.get('/edit_interview', (req, res) => {
    const edit = req.cookies.edit;
    res.status(200).render('editInterview', {edit});
})


module.exports = router;