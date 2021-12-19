const Candidate = require('../models/candidate');
const interview = require('../models/interview');

const handleErrors = (err) => {
    let errors = {email: '', username: ''};

    if(err.code == 11000){
      if( err.keyPattern.email == 1) errors.email = 'That email is already registered ';

       return errors;

    }

    if(err.message){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });

        return errors;
    }
   
    if(err){ return err};
}

exports.addCandidate = async(req, res) =>{

    console.log('adding candidate data ', req.body);

    try {
        const candidate = new Candidate(req.body);

        let newCandidate = await candidate.save();

        if(newCandidate){
            res.status(200)
                .json({success : true});
        }
        else throw 'error new user not found';
    } catch (error) {

        if(error)console.log('error in backend registering user', error);
        const errors = handleErrors(error);
        res.status(400).json({errors});
        
    }
}

exports.SelectCandidates = async(req, res) => {

    const {name, startTime, endTime} = req.body;

    try {

        const find = await interview.findOne({name: name});

        console.log(find);

        if(find){
            throw 'Already a interview is scheduled for this Job';
        }

        const interviews = await interview.find();
        const notAvailable = new Set();

        for(let i of interviews){
            if(i.endTime < startTime || i.startTime > endTime){
            }
            else{
                for(let p of i.participants)
                    notAvailable.add(p);
            }
        }

        const available = new Set();
        const candidates = await Candidate.find();

        for(let c of candidates){
            if(notAvailable.has(c.email)){}
            else available.add(c);
        }

        if(available.length < 2){
            throw 'Please change the timings, as less than 2 candidates are available in this time slot';
        }

        res.cookie('name', name);
        res.cookie('candidates', [...available]);
        res.cookie('startTime', startTime);
        res.cookie('endTime', endTime);

        res.status(200)
            .json({success : true});
        
    } catch (error) {
        res.status(400).json({error});
    }

    
}