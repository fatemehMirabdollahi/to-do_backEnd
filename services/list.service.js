const express = require("express");

module.exports = {
  getLists: (req, res) => {
    const menu = {
      "Number 9": 1.99,
      "Number 9 Large": 2.99,
      "Number 6 with Extra Dip": 3.25,
      "Number 7": 3.99,
      "Number 45": 3.45,
    };

    return res.status(200).json({ menu: menu });
  },
};
