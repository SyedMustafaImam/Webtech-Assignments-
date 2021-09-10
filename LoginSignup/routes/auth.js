var db = require('../models/index')
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

exports.User = async (req, res, next) => {
    const email = localStorage.getItem('userEmail')
    var userFound; 
    console.log('Local Storage email =', localStorage.getItem('userEmail'))
    if (email != null) {

        await db.User.findOne(
            { email: email }
        ).then(result => {
            console.log(result)
            userFound = result
        }).catch(err => { userFound = false })

        if (userFound != null) {
            console.log('Authenticated User')
            next();
        }
        else{
            console.log('Not Authenticated User!')
            res.redirect('/login')
        }


    }else{
        console.log('Not LogedIn!')
        res.redirect('/login')
    }
}