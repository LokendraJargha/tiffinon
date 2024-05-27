const passport = require('passport');
const passportJwt = require('passport-jwt');
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const Admin = require("../../Models/Admin");

passport.use('admin',new StrategyJwt(
	{
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.JWT_SECRET,
	},
	(jwtPayload, done) => {
	return Admin.findById(jwtPayload.id)
		.then((admin) => {
			return done(null, admin);
		})
		.catch((err) => {
			console.log(err, 'test')
			return done(err);
		});
	}
));

