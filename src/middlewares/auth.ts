import passport from "passport";

/**
 * Auth middleware
 * @returns passport-jwt middleware
 */
export default function auth() {
    return passport.authenticate("jwt", { session: false, });
}