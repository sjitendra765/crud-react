const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');


const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignIn = passport.authenticate('local', {session: false});





module.exports = function(app) {

    app.post('/signin', requireSignIn, Authentication.signin);

    app.post('/signup', Authentication.signup);

    app.post('/changepassword', requireAuth, Authentication.changePassword);

    app.post('/editinfo/:id', Authentication.editInfo);
    app.get('/getusers',  Authentication.getInfo);
    app.get('/usersearch/:username',  Authentication.userSearch);

    app.get('/getUserById/:id',  Authentication.getInfoById);

    app.delete('/delete/:id',  Authentication.deleteuser);


}