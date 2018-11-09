const express = require("express");

const projectDb = require("../data/helpers/projectModel.js");

const server = express();
server.use(express.json());

// all projects
server.get("/api/projects", (req, res) => {
    projectDb
      .get()
      .then(project => {
        res.status(200).json(project);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The user information could not be retrieved." });
      });
  });

  // get project by id
  server.get('/api/projects/:id', (req, res) => {
      const { id } = req.params;

      projectDb.get(id).then(project => {
          if (project.length !== 0) {
              res.status(200).json(project);
          } else {
              res.status(404).json({ message: "The project with the specified ID does not exist." });
          }
      }).catch(error => {
          res.status(500).json({ error: "The project information could not be retrived." });
      });
  })

module.exports = server;