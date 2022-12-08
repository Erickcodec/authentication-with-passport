const jwt = require("jsonwebtoken");
const AuthController = require("./auth.controller");
const jwtSecret = require("../../config").api.jwtSecret;

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await AuthController.verify({ email, password });

    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        jwtSecret,
        {
          expiresIn: 40, // 2 minutes
        }
      );

      return res.status(200).json({
        id: user.id,
        token,
        message: "Authenticated succesfully",
        expiresIn: 2 * 60,
      });
    }

    return res.status(403).json({
      message: "Email or password incorrect.",
    });
  } catch (error) {}
}

module.exports = {
  login,
};
