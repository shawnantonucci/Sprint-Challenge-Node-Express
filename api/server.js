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
server.get("/api/projects/:id", (req, res) => {
  const { id } = req.params;

  projectDb
    .get(id)
    .then(project => {
      if (project.length !== 0) {
        res.status(200).json(project);
      } else {
        res
          .status(404)
          .json({
            message: "The project with the specified ID does not exist."
          });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The project information could not be retrived." });
    });
});

// add new project
server.post("/api/projects", (req, res) => {
  projectDb
    .insert(req.body)
    .then(project => {
      return projectDb
        .get(project.id)
        .then(project => {
          res.status(201).json(project);
        })
        .catch(error => {
          res
            .status(500)
            .json({
              error:
                "There was an error while saving the project to the database"
            });
          res
            .status(400)
            .json({ message: "Please provide a name and a description" });
        });
    })
    .catch(error => {
      res
        .status(400)
        .json({ message: "Please provide a name and a description" });
    });
});

// delete a project by id
server.delete("/api/projects/:id", (req, res) => {
    projectDb.remove(req.params.id).then(project => {
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: "The project with the specified ID does not exist." });
        }
    }).catch(error => {
        res.status(500).json({ error: "The project could not be removed" });
    });
})

// update a project by id
server.put("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    projectDb.update(id, changes).then(project => {
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: "The project with the specified ID does not exist." });
        }
    }).catch(error => {
        res.status(500).json({ error: "The project information can not be modified." });
    });
})

module.exports = server;
