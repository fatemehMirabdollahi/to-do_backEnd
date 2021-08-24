const express = require("express");
const pool = require("../postgress");

module.exports = {
  getLists: (req, res) => {
    let promises = [];
    var lists ={}
    pool.query(
      "SELECT COUNT(task_id) FROM task WHERE important=true",
      (error, results) => {
        lists.important = results.rows[0].count;
        pool.query(
          "SELECT COUNT(task_id) FROM task WHERE myday=true",
          (error, results) => {
            lists.myday = results.rows[0].count;
            pool.query(
              "SELECT COUNT(task_id) FROM task WHERE done=false",
              (error, results) => {
                lists.all = results.rows[0].count;
                pool.query(
                  "SELECT list_title AS name,COUNT(task_id) AS undone FROM task where done=false AND list_title IS NOT NULL  GROUP BY list_title",
                  (error, results) => {
                    lists.lists = results.rows;
                    res.status(200).json(lists);
                  }
                );
              }
            );
          }
        );
      }
    );
  },
};
