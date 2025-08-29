const Gallery = require("../models/Gallery.Model");

exports.createGallery = async (req, res) => {
  try {
    console.log('req.body = ', req.body);
    const { title, imageUrl, date } = req.body;
    if (!title || !imageUrl || !date) {
      return res.status(400).json({
        status: "N",
        message: "All parameters required",
      });
    }

    const gallery = new Gallery({
      title,
      imageUrl,
      date,
    });

    await gallery.save();
    return res.status(200).json({
      status: "Y",
      message: "Gallery saved successfully",
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      status: "N",
      error: `Internal server error : ${error}`,
    });
  }
};

exports.getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find();
    if (!gallery || gallery.length == 0) {
      return res.status(400).json({
        status: "N",
        message: "No records found",
      });
    }

    return res.status(200).json({
      status: "Y",
      message: "Successfull",
      data: gallery,
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      status: "N",
      error: `Internal server error : ${error}`,
    });
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    const id = req.params.id;
    const gall = await Gallery.findById(id);
    if (!gall) {
      return res.status(404).json({
        status: "N",
        message: "No records found",
      });
    }

    const delGall = await Gallery.findByIdAndDelete(id);
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

exports.updateGallery = async (req, res) => {
  try {
    const { title, imageUrl, date } = req.body;
    if (!title || !imageUrl || !date) {
      return res.status(400).json({
        status: "N",
        message: "All parameters required",
      });
    }

    const id = req.params.id;
    const gall = await Gallery.findById(id);
    if (!gall) {
      return res.status(404).json({
        status: "N",
        message: "No records found",
      });
    }

    const upd = await Gallery.findByIdAndUpdate(id, { title, imageUrl, date });
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
