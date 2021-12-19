const Candidate = require('../models/candidate');
const Interview = require('../models/interview');

exports.listAll = async(req, res) => {
    try {
        const interview = await Interview.find();
        const candidate = await Candidate.find();

        const list1 = new Array;
        const list2 = new Array;

        for(let i of interview){
            list1.push(i);
        } 

        for(let c of candidate){
            list2.push(c.username, c.email);
        } 

        // console.log('list of candidates ',list2);
        
        res.status(200)
            .render('home', {list1, list2});

    } catch (error) {
        console.log(error);
        res.status(400);
    }
}

exports.ScheduleInterview = async(req, res, next) => {
    try {
        const candidates = req.body.allCandidates;

        const startTime = req.cookies.startTime;
        const endTime = req.cookies.endTime;
        const name = req.cookies.name;  

        console.log('selected candidates are ', candidates);

        const interview = new Interview({name: name, startTime: startTime, endTime: endTime, participants: candidates});
        const newInterview = await interview.save();

        
        if(newInterview){
            next();
        }
        else throw 'Interview can not be scheduled';
        
    } catch (error) {
        res.status(400).json({error});
    }
}

exports.EditInterview = async(req, res) => {
    // console.log('edit interview req', req.body);
    try {
        const name = req.body.interviewName;
        const interview = await Interview.findOne({name: name});

        res.cookie('edit', interview);

        const done = await Interview.deleteOne({name: name});

            res.status(200)
            .json({success: true});

    } catch (error) {
        res.status(400)
            .json({error});
    }
}

