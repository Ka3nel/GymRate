const Gym = require("../models/gymModel");
const mongoose = require("mongoose");

//get all gyms
const getGyms = async (req, res) => {
  const gyms = await Gym.find().sort({ createdAt: -1 });

  res.status(200).json(gyms);
};

//get all gyms with a certain latitude and longitude
const getGymsOnMap = async (req, res) => {
  let gymsonMap = await Gym.find();

  if (req.query.swLat) {
    const swLat = parseFloat(req.query.swLat);
    const swLng = parseFloat(req.query.swLng);
    const neLat = parseFloat(req.query.neLat);
    const neLng = parseFloat(req.query.neLng);

    gymsonMap = gymsonMap.filter(
      (gym) =>
        gym.latitude > swLat &&
        gym.latitude < neLat &&
        gym.longitude > swLng &&
        gym.longitude < neLng
    );
  }

  if (req.query.searchedText && req.query.searchedText !== "") {
    const searchedText = req.query.searchedText;

    gymsonMap = gymsonMap.filter((gym) =>
      gym.name.toLowerCase().includes(searchedText.toLowerCase())
    );
  }

  if (req.query.nameFilter) {
    gymsonMap.sort((a, b) => {
      if (a.name === b.name) return 0;
      if (a.name > b.name) return 1;
      return -1;
    });
  }

  if (req.query.ratingFilter) {
    gymsonMap.sort((a, b) => b.total_rating - a.total_rating);
  }

  if (req.query.sizeFilter) {
    gymsonMap.sort((a, b) => b.size ?? 0 - a.size ?? 0);
  }

  res.status(200).json(gymsonMap);
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
  const {
    name,
    details,
    address,
    size,
    latitude,
    longitude,
    opening_time,
    closing_time,
    total_rating,
    review_count,
  } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!details) {
    emptyFields.push("details");
  }
  if (!address) {
    emptyFields.push("address");
  }
  if (!size) {
    emptyFields.push("size");
  }
  if (!latitude) {
    emptyFields.push("latitude");
  }
  if (!longitude) {
    emptyFields.push("longitude");
  }
  if (!opening_time) {
    emptyFields.push("opening_time");
  }
  if (!closing_time) {
    emptyFields.push("closing_time");
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
      address,
      size,
      latitude,
      longitude,
      opening_time,
      closing_time,
      total_rating,
      review_count,
    });
    res.status(200).json(gym);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a gym
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
