import { loginUser, registerUser } from "../services/auth.services.js";

const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await loginUser(email, password);

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { registerController, loginController };
