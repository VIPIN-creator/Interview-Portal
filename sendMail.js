// Sending Mail Middleware

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vipin.wizwack@gmail.com',
    pass: 'Vipin@121'
  }
});

exports.sendMail = async(req, res) => {
    try {
        const candidates = req.body.allCandidates;
        for(let candidate of candidates){
            var mailOptions = {
                from: 'vipin.wizwack@gmail.com',
                to: candidate,
                subject: 'Interview Scheduled',
                text: 'Congratulations your interview is scheduled'
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            });

            
        }
        res.status(200)
                .json({success : true});
    } catch (error) {
        res.status(400).json({error});
    }
    
}

