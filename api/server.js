const express = require("express");

const gateKeeper = require("../middleware/gatekeeperMiddleware.js");
const projectDb = require("../data/helpers/projectModel.js");
const actionDb = require("../data/helpers/actionModel.js");

const server = express();
server.use(express.json());

// PROJECTS

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

// ACTIONS

// get all actions
server.get("/api/actions", (req, res) => {
    actionDb.get().then(action => {
        res.status(200).json(action);
    }).catch(error => {
        res.status(500).json({ error: "The action could not be retrived." });
    });
})

// get action by id
server.get("/api/action/:id", (req, res) => {
    const { id } = req.params;
    actionDb.get(id).then(action => {
        if (action.length !== 0) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: "The action with the specified ID does not exist."});
        }
    }).catch(error => {
        res.status(500).json({ error: "The action information could not be retrieved." });
    });
})

// get action by project id
server.get("/api/actions/:id", gateKeeper, (req, res) => {
    const { id } = req.params;
    const projectId = id;
    projectDb.getProjectActions(projectId).then(action => {
        if (action.length !== 0) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: "The action with the specified ID does not exist." });
        }
    }).catch(error => {
        res.status(500).json({ error: "The action information could not be retrieved." });
    });
})

// add new action
server.post("/api/actions", (req, res) => {
    actionDb
      .insert(req.body)
      .then(action => {
        return actionDb
          .get(action.id)
          .then(action => {
            res.status(201).json(action);
          })
          .catch(error => {
            res
              .status(500)
              .json({
                error:
                  "There was an error while saving the action to the database"
              });
          });
      })
      .catch(error => {
        res
          .status(400)
          .json({ message: "Please provide a project id, a description, notes, and a completed value." });
      });
  });

// delete an action by id
server.delete("/api/actions/:id", (req, res) => {
    actionDb.remove(req.params.id).then(action => {
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: "The action with the specified ID does not exist." });
        }
    }).catch(error => {
        res.status(500).json({ error: "The action could not be removed" });
    });
})

module.exports = server;
