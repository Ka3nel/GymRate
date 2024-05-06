const express = require("express");
const {
  getGyms,
  getGymsOnMap,
  getGym,
  createGym,
  deleteGym,
  updateGym,
} = require("../controllers/gymController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//require auth for all gym routes
//router.use(requireAuth);

//GET all gyms
router.get("/", getGyms);

//GET all gyms that appear on the maps
router.get("/onMap", getGymsOnMap);

//GET a single gym
router.get("/:id", getGym);

//POST a new gym
router.post("/", createGym);

//DELETE a gym
router.delete("/:id", deleteGym);

//UPDATE a gym
router.patch("/:id", updateGym);

module.exports = router;
