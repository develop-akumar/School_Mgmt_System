const Teacher = require("../models/Teacher.Model");

exports.createTeacher = async (req, res) => {
  try {
    console.log("req.body = ", req.body);
    const { name, subject, designation, bio, image } = req.body;
    if (!name || !subject || !designation || !bio || !image) {
      return res.status(400).json({
        status: "N",
        message: "All parameters required",
      });
    }

    const teacher = new Teacher({
      name,
      subject,
      designation,
      bio,
      image,
    });

    await teacher.save();
    return res.status(200).json({
      status: "Y",
      message: "Teacher saved successfully",
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      status: "N",
      error: `Internal server error : ${error}`,
    });
  }
};

exports.getTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.find();
    if (!teacher || teacher.length == 0) {
      return res.status(400).json({
        status: "N",
        message: "No records found",
      });
    }

    return res.status(200).json({
      status: "Y",
      message: "Successful",
      data: teacher,
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      status: "N",
      error: `Internal server error : ${error}`,
    });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const id = req.params.id;
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({
        status: "N",
        message: "No records found",
      });
    }

    await Teacher.findByIdAndDelete(id);
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

exports.updateTeacher = async (req, res) => {
  try {
    const { name, subject, designation, bio, image } = req.body;
    if (!name || !subject || !designation || !bio || !image) {
      return res.status(400).json({
        status: "N",
        message: "All parameters required",
      });
    }

    const id = req.params.id;
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({
        status: "N",
        message: "No records found",
      });
    }

    await Teacher.findByIdAndUpdate(id, {
      name,
      subject,
      designation,
      bio,
      image,
    });
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
