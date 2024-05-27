const passport = require('passport');
const passportJwt = require('passport-jwt');
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const User = require("../../Models/User");

passport.use('admin',new StrategyJwt(
	{
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.JWT_SECRET,
	},
	(jwtPayload, done) => {
	return User.findById(jwtPayload.id)
		.then((user) => {
			return done(null, user);
		})
		.catch((err) => {
			console.log(err, 'test')
			return done(err);
		});
	}
));

