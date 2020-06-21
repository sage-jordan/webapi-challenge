const express = require('express');

const router = express.Router();

const db = require('../helpers/actionModel.js');
const pdb = require('../helpers/projectModel');


// ACTION CRUD

// GET

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get(id)
        .then(action => {
            if(action){
                res.status(200).json({ success: true, action });
            } else {
                res.status(404).json({ success: false, message: `could not find a action with id: ${id}` });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        })
});

// POST

router.post('/', validateAction, (req, res) => {
    const newAction = req.body;
    db.insert(newAction)
        .then(action => {
            res.status(200).json({ success: true, action });
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        })
});

// PUT 

router.put('/:id', validateActionId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db.update(id, changes)
        .then(newAction => {
            res.status(200).json({ success: true, newAction });
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
            res.status(204).json({ success: true, message: `action with id ${id} has successfully been deleted.`});
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
})

// CUSTOM MIDDLEWARE

function validateActionId(req, res, next) {
    const id = req.params.id;
    db.get(id)
        .then(action => {
            if(action) {
                req.action = action;
                next();
            } else {
                res.status(404).json({ message: "invalid action id" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The action information could not be retrieved.", err });
        });
};

function validateAction(req, res, next) {
    const action = req.body;
    const id = action.project_id;
    if(id && action.description && action.notes){
        pdb.get(id)
        .then(project => {
            if(project){
                next();
            } else {
                res.status(404).json({ success: false, message: `There is not project with id ${id}` });
            }
        })
        .catch(err => {
            res.stats(500).json({ success: false, err });
        })
    } else {
        res.status(404).json({ success: false, message: `Please provide a valid project_id, description, and notes.`})
    }
}

module.exports = router;