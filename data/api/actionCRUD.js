const express = require('express');

const router = express.Router();

const db = require('../helpers/actionModel.js');


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

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

module.exports = router;