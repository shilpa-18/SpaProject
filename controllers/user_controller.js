const User = require('../models/user_model');
const router = require('express').Router();
const passport = require('passport');

const auth = require('../services/auth');

// show signup page
router.get('/new', (req, res) => { 
    res.render('user/signup');
});

// logout process and redirect to home
router.get('/logout', (req, res) => {
    req.logout(); 
    res.redirect('/');
});


// show login page
router.get('/login', (req, res) => {
    res.render('user/login');
});

router.get('/savedSpas', (req, res) => {
    res.render('/spa/spa');
})

// authenticate process
router.post(
    '/',
    passport.authenticate(
        'local-signup', {
            failureRedirect: '/user/new',
            successRedirect: '/spa/spa',
        }
    )
);

// login process
router.post('/login', passport.authenticate(
    'local-login', {
        failureRedirect: '/user/login', 
        successRedirect: '/spa/'
    }
));

// show user profile after login
router.get(
    '/profile',
   
    auth.restrict, 
    (req, res) => {
        console.log('in handler for users/profile');
        console.log('req.user:');
        console.log(req.user);
        User
            .findByEmail(req.user.email)
            .then((user) => {
                res.render(
                    'users/profile', { user: user }
                );
            })
            .catch(err => console.log('ERROR:', err));
    }
);



module.exports = router;


