var db = require('../models/index')
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

exports.get_login = (req, res) => {
    res.render('login', { title: 'login', notValid: true })
}

exports.post_login = async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body
    console.log('email :>> ', email);
    var userData;
    await db.User.findOne(
        {
            $or: [
                { userName: email },
                { email: email }]
        }
    ).then(result => {
        userData = result
    }).catch(err => console.log(err))

    if (userData != null) {
        console.log('userData :>> ', userData);
        if ((email === userData.email || email ===userData.userName) && password === userData.password) {
            localStorage.setItem('userEmail',userData.email )
            res.redirect('/profile')
        } else {
            res.render('login', { title: 'Login', notValid: false, alertData: 'Invalid userid or password!'  })

        }

    }
else{
    res.render('login', { title: 'Login', notValid: false, alertData: 'No record found.' })
}

    // res.end()
}

exports.get_signup = (req, res) => {
    res.render('signup', { title: 'SignUp', notValid: true })

}

exports.post_signup = async (req, res) => {
    const { username, email, firstName, lastName, password } = req.body
    var userFound;
    if (username !== "" && email !== "" && firstName !== "" && lastName !== "" && password !== "") {

        await db.User.findOne({
            $or: [
                { userName: username },
                { email: email }]
        }).then(result => {
            console.log(result)
            userFound = result
        }).catch(err => { userFound = false })

        if (userFound != null) {
            res.render('signup', { title: 'SignUp', notValid: false, alertData: 'Username or Email already exist!' })

        }
        else {

            const newUser = new db.User(
                {
                    userName: username,
                    email,
                    firstName,
                    lastName,
                    password,
                }
            )

            newUser.save().
                then(
                    (result) => {
                        console.log('Result Posted')
                        res.redirect('/login')
                    }
                ).
                catch(err => console.log(err))
        }

    }
    else {
        res.render('signup', { title: 'SignUp', notValid: false, alertData: 'Please fill out every field.' })
    }
}

exports.logout = function (req, res){
localStorage.clear();
res.redirect('/login')
}