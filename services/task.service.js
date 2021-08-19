const express = require("express");
const pool = require("../postgress");

module.exports = {
  getTasks: (req, res) => {
    pool.query("SELECT * FROM task ", (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  },
};
