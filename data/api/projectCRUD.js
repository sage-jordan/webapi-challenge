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
                res.status(404).json({ success: false, message: `could not find a prject with id: ${id}` });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        })
});

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

// DELETE

module.exports = router;