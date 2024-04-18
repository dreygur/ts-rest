import passport from "passport";

// Passport local auth strategy
export default function () {
  // EXAMPLE: https://www.passportjs.org/howtos/password/
  return passport.authenticate('local', {
    session: false,
  });
}