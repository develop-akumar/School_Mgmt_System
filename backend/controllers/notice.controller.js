const Notice = require("../models/Notice.Model");

exports.createNotice = async (req, res) => {
  try {
    console.log('req.body = ', req.body);
    const { title, description, date, category } = req.body;
    if (!title || !description || !date || !category) {
      return res.status(400).json({
        status: "N",
        message: "All parameters required",
      });
    }

    const notice = new Notice({
      title,
      description,
      date,
      category
    });

    await notice.save();
    return res.status(200).json({
      status: "Y",
      message: "Notice saved successfully",
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      status: "N",
      error: `Internal server error : ${error}`,
    });
  }
};

exports.getNotice = async (req, res) => {
  try {
    const notice = await Notice.find();
    if (!notice || notice.length == 0) {
      return res.status(400).json({
        status: "N",
        message: "No records found",
      });
    }

    return res.status(200).json({
      status: "Y",
      message: "Successful",
      data: notice,
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      status: "N",
      error: `Internal server error : ${error}`,
    });
  }
};

exports.deleteNotice = async (req, res) => {
  try {
    const id = req.params.id;
    const notice = await Notice.findById(id);
    if (!notice) {
      return res.status(404).json({
        status: "N",
        message: "No records found",
      });
    }

    await Notice.findByIdAndDelete(id);
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

exports.updateNotice = async (req, res) => {
  try {
    const { title, description, date, category } = req.body;
    if (!title || !description || !date || !category ) {
      return res.status(400).json({
        status: "N",
        message: "All parameters required",
      });
    }

    const id = req.params.id;
    const gall = await Notice.findById(id);
    if (!gall) {
      return res.status(404).json({
        status: "N",
        message: "No records found",
      });
    }

    const upd = await Notice.findByIdAndUpdate(id, { title, description, date, category });
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
