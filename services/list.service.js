const e = require("express");
const express = require("express");
const pool = require("../postgress");
module.exports = {
  addList: (req, res) => {
    let done = false;
    let userSelcetedName = req.body.name.trim();
    const add = () => {
      pool.query(
        `INSERT INTO list(list_title) VALUES('${userSelcetedName}')`,
        (error, results) => {
          if (error) console.log(error);
          res.status(200).json("add");
        }
      );
    };
    const maxNum = (lists) => {
      let max = 0;
      for (let list of lists) {
        let title = list.list_title;
        let s = title.lastIndexOf("(") + 1;
        let end = title.lastIndexOf(")");
        let num = parseInt(title.slice(s, end));
        max = num > max ? num : max;
      }
      return max;
    };
    pool.query(
      `SELECT list_title from list WHERE list_title='${userSelcetedName}'`,
      (error, results) => {
        if (results.rows.length) {
          pool.query(
            `SELECT list_title from list WHERE list_title='${userSelcetedName} (1)'`,
            (error, results) => {
              if (results.rows.length == 0) {
                userSelcetedName += " (1)";
                done = true;
                add();
              } else {
                pool.query(
                  "SELECT * FROM list WHERE list_title  SIMILAR TO '" +
                    userSelcetedName +
                    "(\\s\\([0-9]+\\))?' ORDER BY list_title",
                  (error, results) => {
                    if (error) console.log(error);
                    if (results.rows.length == 1) {
                      userSelcetedName += " (1)";
                      add();
                    } else {
                      let last =
                        results.rows[results.rows.length - 1].list_title;
                      let name = last.slice(0, last.lastIndexOf("(") - 1);
                      let num = maxNum(results.rows) + 1;
                      userSelcetedName = name + " " + `(${num})`;
                      add();
                    }
                  }
                );
              }
            }
          );
        } else {
          add();
        }
      }
    );
  },
  deleteList:(req,res)=>{
    let list_title = req.body.title
    pool.query(
      `DELETE FROM task WHERE list_titile='${list_title}'`,
      (error)=>{
        if(error) console.log(error)
        pool.query(
          `DELETE FROM list WHERE list_titile='${list_title}'`,
          (error)=>{
              if(error) console.log(error);
              res.status(200).json('deleted');
            }
          )
      }
    )
  },
  getLists: (req, res) => {
    var lists = {};
    pool.query(
      "SELECT COUNT(task_id) FROM task WHERE important=true",
      (error, results) => {
        if (error) console.log(error);
        lists.important = results.rows[0].count;
        pool.query(
          "SELECT COUNT(task_id) FROM task WHERE myday=true",
          (error, results) => {
            if (error) console.log(error);
            lists.myday = results.rows[0].count;
            pool.query(
              "SELECT COUNT(task_id) FROM task WHERE done=false",
              (error, results) => {
                if (error) console.log(error);
                lists.all = results.rows[0].count;
                pool.query("SELECT * from list", (error, results) => {
                  if (error) console.log(error);
                  lists.lists = results.rows;
                  res.status(200).json(lists);
                });
              }
            );
          }
        );
      }
    );
  },
};
