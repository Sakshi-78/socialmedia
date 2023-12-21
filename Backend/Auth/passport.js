// // const passport = require('passport');
// // const LocalStrategy = require('passport-local').Strategy;
// // const JwtStrategy = require('passport-jwt').Strategy;
// // const ExtractJwt = require('passport-jwt').ExtractJwt;
// // const User = require("../models/users"); // Update the path to your User model
// // const secretKey = process.env.JWT_SECRET;
// // const bcrypt = require('bcrypt');
// // console.log(User);
// // // passport.initialize();

// // // // Local authentication strategy
// // // passport.use(
// // //   new LocalStrategy(
// // //     {
// // //       usernameField: 'email', // Assuming users sign up with an email
// // //     },
// // //     async (email, password, done) => {
// // //       try {
// // //         // Find the user by email
// // //         const user = await User.findOne({ email });

// // //         if (!user) {
// // //           return done(null, false, { message: 'User not found' });
// // //         }

// // //         // Check if the provided password matches the user's password
// // //         const isMatch = await bcrypt.compare(password, user.password);

// // //         if (!isMatch) {
// // //           return done(null, false, { message: 'Invalid password' });
// // //         }

// // //         return done(null, user);
// // //       } catch (err) {
// // //         return done(err);
// // //       }
// // //     }
// // //   )
// // // );

// // // // JWT authentication strategy
// // // const jwtOptions = {
// // //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// // //   secretOrKey: secretKey, // Replace with your secret key
// // // };

// // // passport.use(
// // //   new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
// // //     try {
// // //       const user = await User.findById(jwtPayload.id);

// // //       if (!user) {
// // //         return done(null, false);
// // //       }

// // //       return done(null, user);
// // //     } catch (err) {
// // //       return done(err, false);
// // //     }
// // //   })
// // // );

// // // // Serialize and deserialize user for session management (optional)
// // // passport.serializeUser((user, done) => {
// // //   done(null, user.id);
// // // });

// // // passport.deserializeUser((id, done) => {
// // //   User.findById(id, (err, user) => {
// // //     done(err, user);
// // //   });
// // // });

// // // module.exports = passport;



// //passport.js
// const passport = require("passport");
// const LocalStrategy = require('passport-local').Strategy;
// const User = require("../models/users");
// const passportJWT = require("passport-jwt");
// const JWTStrategy   = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;
// const secretKey = process.env.JWT_SECRET;

// passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password'
//     }, 
//     function (email, password, cb) {
//         //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
//         return User.findOne({email, password})
//            .then(user => {
//                if (!user) {
//                    return cb(null, false, {message: 'Incorrect email or password.'});
//                }
//                return cb(null, user, {message: 'Logged In Successfully'});
//           })
//           .catch(err => cb(err));
//     },
//     passport.use(new JWTStrategy({
//         jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//         secretOrKey   : secretKey
//     },
//     function (jwtPayload, cb) {

//         //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
//         return UserModel.findOneById(jwtPayload.id)
//             .then(user => {
//                 return cb(null, user);
//             })
//             .catch(err => {
//                 return cb(err);
//             });
//     }
// ))
// ))



const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const User = require("../models/users");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const secretKey = process.env.JWT_SECRET;


passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    function (email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return User.findOne({email, password})
           .then(user => {
               if (!user) {
                   return cb(null, false, {message: 'Incorrect email or password.'});
               }
               return cb(null, user, {message: 'Logged In Successfully'});
          })
          .catch(err => cb(err));
    }
    
))
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : "nbaxsjhc+653sdcdcd"
},
function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return User.findOneById(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}))
