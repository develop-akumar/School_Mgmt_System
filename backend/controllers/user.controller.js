const User = require("../models/User.Model");

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

    const user = new User({ name, email, password });

    await user.save();
    return res.status(200).json({
      status: "Y",
      message: "User saved successfully",
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
