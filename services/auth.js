const passport = require('passport');

const User = require('../models/user_model');

const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');

const passportInstance = passport.initialize();
const passportSession = passport.session();

// function restrict(req, res, next) {
//     console.log('req.isauthed() -> ',req.isAuthenticated());
//     if (req.isAuthenticated()) {
//         console.log('user authenticated correctly!!')
//         next();
//     } else {
//         console.log('user didnt authenticate correctly');
//         res.redirect('/user/login');
//     }
// }

function restrict(req, res, next) {
    console.log('req.isauthed() -> ', req.isAuthenticated());
    if (req.isAuthenticated()) {
        console.log('user authenticated correctly!!')
        next();
    } else if (req.method == 'POST'){
        res.send('logged out');
    } else {
        res.redirect('/users/login');
    }
}

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((userObj, done) => {
    User
        .findByEmail(userObj.email)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            console.log('ERROR in deserializeUser:', err);
            done(null, false);
        });
});

passport.use(
    'local-signup',
    new LocalStrategy({
            usernameField: 'user[email]',
            passwordField: 'user[password]',
            passReqToCallback: true
        },
        (req, email, password, done) => {
            User
                .create(req.body.user)
                .then((user) => {
                    console.log('user signed up correctly', user)
                    return done(null, user);
                })
                .catch((err) => {
                    console.log('ERROR signing up user:', err);
                    return done(null, false);
                });
        })
);

passport.use(
    'local-login',
    new LocalStrategy({
            usernameField: 'user[email]',
            passwordField: 'user[password]',
            passReqToCallback: true
        },
        (req, email, password, done) => {
            User
                .findByEmail(email)
                .then((user) => {
                    console.log('the user  id after findByEmail->',user.id);
                    if (user) {
                        const isAuthed = bcrypt.compareSync(password, user.password_digest);
                        console.log('passwords match bcrypt:');
                        console.log(isAuthed)
                        if (isAuthed) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    } else {
                        return done(null, false);
                    }
                });
        })
);

module.exports = { passportInstance, passportSession, restrict };
