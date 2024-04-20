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
router.get("/gyms", getGyms);

//GET a single gym
router.get("/gyms/:id", getGym);

//POST a new gym
router.post("/gyms", createGym);

//DELETE a gym
router.delete("/gyms/:id", deleteGym);

//UPDATE a gym
router.patch("/gyms/:id", updateGym);

module.exports = router;
