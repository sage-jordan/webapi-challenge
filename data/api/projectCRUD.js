const express = require('express');

const router = express.Router();

const db = require('../helpers/projectModel');


// PROJECT CRUD

// GET

router.get('/:id', validateProjectId, (req, res) => {
    const id = req.params.id;
    db.get(id)
        .then(project => {
            res.status(200).json({ success: true, project });
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        })
});

// GET PROJECT ACTIONS

router.get('/:id/actions', validateProjectId, (req, res) => {
    const id = req.params.id;
    db.getProjectActions(id)
        .then(actions => {
            if(actions.length > 0){
                res.status(200).json({ success: true, actions });
            } else {
                res.status(200).json({ success: true, message: `Project with id: ${id} does not have any acitons.`})
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
})

// project

router.post('/', (req, res) => {
    const newProject = req.body;
    db.insert(newProject)
        .then(project => {
            res.status(200).json({ success: true, project });
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        })
});

// PUT 

router.put('/:id', validateProjectId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db.update(id, changes)
        .then(newProject => {
            res.status(200).json({ success: true, newProject });
        })
        .catch( err => {
            res.status(500).json({ success: false, err });
        });
})

// DELETE

router.delete('/:id', validateProjectId, (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(() => {
            res.status(204).json({ success: true, message: `Project with id ${id} has successfully been deleted.`});
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
})

// CUSTOM MIDDLEWARE 

function validateProjectId(req, res, next) {
    const id = req.params.id;
    db.get(id)
        .then(project => {
            if(project) {
                req.project = project;
                next();
            } else {
                res.status(404).json({ message: "invalid project id" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The project information could not be retrieved.", err });
        });
};

module.exports = router;