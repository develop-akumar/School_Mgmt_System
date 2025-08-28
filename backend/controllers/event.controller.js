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

exports.deleteEvent = async (req, res) => {
  try {
    let id = req.params.id;
    console.log("id = ", id);
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({
        status: "N",
        message: `event not found`,
      });
    }
    return res.status(200).json({
      status: "Y",
      message: `Event deleted successfully.`,
    });
  } catch (error) {
    console.log("error = ", error);
    return res
      .status(500)
      .json({ status: "N", error: `Internal server error : ${error}` });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    let id = req.params.id;

    // checking for required parameters
    const { title, description, shortDescription, date, location } = req.body;
    if (!title || !description || !shortDescription || !date || !location) {
      return res
        .status(400)
        .json({ status: "N", message: "All parameters required." });
    }

    // finding event in DB
    let event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        status: "N",
        message: "Event not found",
      });
    }

    let evObj = { title, description, shortDescription, date, location };
    let delEvent = await Event.findByIdAndUpdate(id, evObj);
    if (delEvent) {
      return res
        .status(200)
        .json({ status: "Y", message: "Event updated successfully" });
    }
  } catch (error) {
    console.log("error = ", error);
    return res
      .status(500)
      .json({ status: "N", error: `Internal server error : ${error}` });
  }
};
