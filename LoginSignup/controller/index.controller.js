var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
var db = require('../models/index')


exports.home = (req, res) => {
    res.render('index', { title: 'Home', tagline:'This is the landing Page.' });
    res.end();
}

exports.about = async (req, res) => {
    res.render('index', { title: 'About', tagline:'This is the about page of the user (PROTECTED).' });
   
   
    res.end();
}

exports.profile = async (req, res) => {
    const email = localStorage.getItem('userEmail')
    await db.User.findOne(
        { email: email }
        ).then(result => {
            console.log(result)
            userFound = result
        }).catch(err => { userFound = false })
        res.render('profile', { title: 'Profile', tagline:'This is the profile page of the user (PROTECTED).', data:userFound  });

    // res.end();
}