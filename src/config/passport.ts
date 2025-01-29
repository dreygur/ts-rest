import { Strategy as JWTStrategy, ExtractJwt, StrategyOptionsWithoutRequest, VerifiedCallback } from 'passport-jwt';

const options: StrategyOptionsWithoutRequest = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
};

/**
 * JWT Strategy
 * @param payload Any Object
 * @param done Callback to be called after verification
 */
function verify(payload: any, done: VerifiedCallback) {
    // Your Strategy
    done(null, payload);
}

const strategy = new JWTStrategy(options, verify);

export default strategy;