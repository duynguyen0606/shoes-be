import passportJWT, {StrategyOptions} from "passport-jwt"
import { UserService } from "../services/userService"

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const TOKEN_SECRET: string = process.env.TOKEN_SECRET || "";

var jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: TOKEN_SECRET
}

const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {

    } catch (error) {
        return done(error, false);
    }
});

export default jwtStrategy;
