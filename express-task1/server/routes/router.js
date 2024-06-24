const {
  getAllClubs,
  createClubs,
  getClubById,
  deleteClub,
  updateClub,
} = require("../controllers/clubs");

const router = require("express").Router();

router.route("/").get(getAllClubs).post(createClubs);
router.route("/:id").get(getClubById).delete(deleteClub).put(updateClub);

module.exports = router;
