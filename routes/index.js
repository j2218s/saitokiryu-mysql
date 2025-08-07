const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'todo_app'
};

router.get('/', function (req, res, next) {
  const connection = mysql.createConnection(connectionConfig);
  connection.query(
    'select * from tasks;',
    (error, results) => {
      connection.end();
      if (error) {
        console.error('Error fetching tasks:', error);
        return res.render('index', {
          title: 'ToDo App (Error)',
          todos: []
        });
      }
      res.render('index', {
        title: 'ToDo App',
        todos: results,
      });
    }
  );
});

router.post('/', function (req, res, next) {
  const connection = mysql.createConnection(connectionConfig);
  const todo = req.body.add;
  connection.query(
    `insert into tasks (user_id, content) values (1, '${todo}');`,
    (error, results) => {
      connection.end();
      if (error) {
        console.error('Error inserting task:', error);
      }
      res.redirect('/');
    }
  );
});

module.exports = router;