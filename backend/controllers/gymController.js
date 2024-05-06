const Gym = require("../models/gymModel");
const mongoose = require("mongoose");

//get all gyms
const getGyms = async (req, res) => {
  const gyms = await Gym.find().sort({ createdAt: -1 });

  res.status(200).json(gyms);
};

//get all gyms with a certain latitude and longitude
const getGymsOnMap = async (req, res) => {
  const swLat = parseFloat(req.query.swLat);
  const swLng = parseFloat(req.query.swLng);
  const neLat = parseFloat(req.query.neLat);
  const neLng = parseFloat(req.query.neLng);

  const gyms = await Gym.find().sort({
    createdAt: -1,
    latitude: 1,
    longitude: 1,
  });

  const gymsOnMap = gyms.filter(
    (gym) =>
      gym.latitude > swLat &&
      gym.latitude < neLat &&
      gym.longitude > swLng &&
      gym.longitude < neLng
  );

  res.status(200).json(gymsOnMap);
};

//get a single gym
const getGym = async (req, res) => {
  const { id } = req.params;

  //not a valid object id (done to avoid a crash)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such gym" });
  }

  const gym = await Gym.findById(id);

  if (!gym) {
    return res.status(404).json({ error: "No such gym" });
  }

  res.status(200).json(gym);
};

//create new gym
const createGym = async (req, res) => {
  const { name, details, latitude, longitude, total_rating } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!details) {
    emptyFields.push("details");
  }
  if (!latitude) {
    emptyFields.push("latitude");
  }
  if (!longitude) {
    emptyFields.push("longitude");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  //add doc to db
  try {
    const gym = await Gym.create({
      name,
      details,
      latitude,
      longitude,
    });
    res.status(200).json(gym);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a hym
const deleteGym = async (req, res) => {
  const { id } = req.params;

  //not a valid object id (done to avoid a crash)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such gym" });
  }

  const gym = await Gym.findOneAndDelete({ _id: id });

  if (!gym) {
    return res.status(404).json({ error: "No such gym" });
  }

  res.status(200).json(gym);
};

//update a gym
const updateGym = async (req, res) => {
  const { id } = req.params;

  //not a valid object id (done to avoid a crash)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such gym" });
  }

  const gym = await Gym.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!gym) {
    return res.status(400).json({ error: "No such gym" });
  }

  res.status(200).json(gym);
};

module.exports = {
  getGyms,
  getGymsOnMap,
  getGym,
  createGym,
  deleteGym,
  updateGym,
};
