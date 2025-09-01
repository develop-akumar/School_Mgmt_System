const User = require("../models/User.Model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    console.log("req.body = ", req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "N",
        message: "All parameters required",
      });
    }

    const existingUser = await User.findOne({ email });
    console.log("existingUser = ", existingUser);

    if (existingUser) {
      return res.status(400).json({
        status: "N",
        message: "Email already exists.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword = ", hashedPassword);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    return res.status(200).json({
      status: "Y",
      message: "User registered successfully",
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      status: "N",
      error: `Internal server error : ${error}`,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.find();
    if (!user || user.length == 0) {
      return res.status(400).json({
        status: "N",
        message: "No records found",
      });
    }

    return res.status(200).json({
      status: "Y",
      message: "Successful",
      data: user,
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      status: "N",
      error: `Internal server error : ${error}`,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        status: "N",
        message: "No records found",
      });
    }

    await User.findByIdAndDelete(id);
    return res.status(200).json({
      status: "Y",
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      status: "N",
      error: `Internal server error : ${error}`,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "N",
        message: "All parameters required",
      });
    }

    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        status: "N",
        message: "No records found",
      });
    }

    await User.findByIdAndUpdate(id, { name, email, password });
    return res.status(200).json({
      status: "Y",
      message: "Updated successfully",
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      status: "N",
      error: `Internal server error : ${error}`,
    });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(400).json({
      status: "N",
      message: "All fields are required",
    });
  }

  const isEmailExists = await User.findOne({ email });
  if (!isEmailExists) {
    return res.status(400).json({
      status: "N",
      message: "Email or password is incorrect",
    });
  }

  const isPwdmatched = await bcrypt.compare(password, isEmailExists.password);
  if (!isPwdmatched) {
    return res.status(400).json({
      status: "N",
      message: "Email or password is incorrect.",
    });
  }

  const token = jwt.sign(
    {
      userId: isEmailExists._id,
      email: isEmailExists.email,
      name: isEmailExists.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    status : "Y",
    message : "Login successful",
    token,
    user : {
      id : isEmailExists._id,
      name : isEmailExists.name,
      email : isEmailExists.email

    }
  })

 

};
