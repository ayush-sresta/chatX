import { User } from "../models/user.model.js";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    if (!fullname || !email || !password) {
      return res.json({ success: false, message: "Missing Fields" });
    }

    const user = await User.findOne({ email });

    if(user) {
        return res.json({success: false, message: "Account already exists with this credentials"})
    }
  } catch (error) {}
};
