const Event = require("../models/Event.Model");

exports.createEvent = async (req, res) => {
  try {
    const { title, description, shortDescription, date, location } = req.body;
    if (!title || !description || !shortDescription || !date || !location) {
      return res
        .status(400)
        .json({ status: "N", message: "All parameters required." });
    }

    let event = new Event({
      title,
      description,
      shortDescription,
      date,
      location,
    });
    await event.save();
    res.status(201).json({
      status: "Y",
      message: "Event saved successfully",
    });
  } catch (error) {
    console.log("error = ", error);
    res.status(500).json({
      status: "N",
      error: `Internal server error : ${error}`,
    });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.find();
    if (!event || event.length == 0) {
      return res.status(400).json({ status: "N", message: "No records found" });
    }
    return res.status(200).json({
      status: "Y",
      message: "Events fetched successfully",
      data: event,
    });
  } catch (error) {
    console.log("error = ", error);
    res.status(500).json({
      status: "N",
      message: `Internal server error : ${error}`,
    });
  }
};

// exports.deleteEvent = async (req, res) => {
//     let id = req.
    
// }
