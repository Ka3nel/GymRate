const express = require("express");
const {
  getGyms,
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

//GET a single gym
router.get("/:id", getGym);

//POST a new gym
router.post("/", createGym);

//DELETE a gym
router.delete("/:id", deleteGym);

//UPDATE a gym
router.patch("/:id", updateGym);

module.exports = router;
