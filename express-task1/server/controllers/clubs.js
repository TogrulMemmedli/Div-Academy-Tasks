const { default: axios } = require("axios");
const dotenv = require("dotenv").config();
const mockUrl =
  process.env.MOCK_API_URL ||
  "https://66798d8318a459f639506e8f.mockapi.io/api/Clubs";

const getAllClubs = async (req, res) => {
  try {
    const response = await axios.get(
      "https://66798d8318a459f639506e8f.mockapi.io/api/Clubs"
    );
    const clubs = response.data;
    res.status(200).json({ clubs });
  } catch (error) {
    res.status(500).send({ msg: "500 Error" });
  }
};

const createClubs = async (req, res) => {
  try {
    const title = req.body.title;
    const logo = req.body.logo;
    let player_count = req.body.player_count;
    if (!title) {
      return res.status(400).send({ msg: "Each club should have a title" });
    }
    if (!logo) {
      return res.status(400).send({ msg: "Each club should have a logo" });
    }
    if (!player_count) {
      player_count = 0;
    }

    const club = await axios.post(`${mockUrl}`, {
      title: title,
      logo: logo,
      player_count: player_count,
    });
    res.status(201).json({ status: "success" });
  } catch (error) {
    res.status(500).send({ msg: "500 Error" });
  }
};

const getClubById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${mockUrl}`);
    const clubs = response.data.filter((item) => item.id === id)[0];
    if (!clubs) {
      return res.status(404).send({ msg: "404 Error" });
    }
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).send({ msg: "500 Error" });
  }
};

const deleteClub = async (req, res) => {
  try {
    const { id } = req.params;
    const clubs = await axios.delete(`${mockUrl}/${id}`);
    res.status(200).json({ msg: "Deleted Successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ msg: "500 Error" });
  }
};
const updateClub = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, logo, player_count } = req.body;

    if (!title) {
      return res.status(400).send({ msg: "Title field missed" });
    }
    if (!logo) {
      return res.status(400).send({ msg: "Logo field missed" });
    }
    if (!player_count) {
      return res.status(400).send({ msg: "Player Count field missed" });
    }

    const response = await axios.put(`${mockUrl}/${id}`, {
      title: title,
      logo: logo,
      player_count: player_count,
    });

    if (response.status === 400) {
      return res
        .status(400)
        .json({ msg: "There is not any data matches with this id 400" });
    }

    res.status(200).json({
      msg: "Updated Successfully",
      status: "success",
    });
  } catch (error) {
    console.log(error.response.status)
    if (error.response && error.response.status === 404) {
      res
        .status(404)
        .json({ msg: "There is not any data matches with this id 404" });
    } else {
      res.status(500).json({ msg: "500 Error" });
    }
  }
};

module.exports = {
  getAllClubs,
  createClubs,
  getClubById,
  deleteClub,
  updateClub,
};
