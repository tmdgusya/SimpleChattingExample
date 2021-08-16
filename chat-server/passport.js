const passport = require("passport");
const kakaoOauth = require("passport-kakao").Strategy;
const model = require("./model");
const domain = "http://localhost:8080";

passport.use(
  "kakao",
  new kakaoOauth(
    {
      clientID: "e0781f8362fd1ef0ba13180cdf882b62",
      callbackURL: domain + "/oauth/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const { kakao_account } = JSON.parse(profile._raw);
      const { nickname, profile_image_url } = kakao_account.profile;
      const user = await model.User.create({
        nickname: nickname,
        authtoken: refreshToken,
        profileImg: profile_image_url,
      });
      return done(null, user);
    }
  )
);

module.exports = passport;
