const passport = require('passport');
const passportJwt = require('passport-jwt');
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const Kitchen = require("../../Models/Kitchen");

passport.use('kitchen',new StrategyJwt(
	{
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.JWT_SECRET,
	},
	(jwtPayload, done) => {
	return Kitchen.findById(jwtPayload.id)
		.then((kitchen) => {
			return done(null, kitchen);
		})
		.catch((err) => {
			console.log(err, 'test')
			return done(err);
		});
	}
));

