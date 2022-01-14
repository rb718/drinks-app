const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/auth')

const commentsCtrl = require('../controllers/comment')

// Handle the new comment form
router.post('/create', isLoggedIn, commentsCtrl.create)

// Handle the edit comment form being submitted (restrict to user who submitted the comment)
router.put('/:id', isLoggedIn, commentsCtrl.update)

// Delete a comment (restrict to user who submitted the comment)
router.delete('/:id', isLoggedIn, commentsCtrl.destroy)

module.exports = router;


