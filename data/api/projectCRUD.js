const express = require('express');

const router = express.Router();

const db = require('../helpers/projectModel');


// PROJECT CRUD

// GET

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get(id)
        .then(project => {
            if(project){
                res.status(200).json({ success: true, project });
            } else {
                res.status(404).json({ success: false, message: `could not find a project with id: ${id}` });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        })
});

// GET PROJECT ACTIONS

router.get('/:id/actions', (req, res) => {
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

// POST

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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(() => {
            res.status(204).json({ success: true, message: `Project with id ${id} has successfully been deleted.`});
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
})

module.exports = router;