const express = require('express');
const router = express.Router();
const drinksCtrl = require('../controllers/drink')
const isLoggedIn = require('../config/auth')

// View all drinks added by logged in user
router.get('/', drinksCtrl.index)

// View all drinks regardless of who added
router.get('/all', drinksCtrl.all)

// View a form for adding a drink
router.get('/new', isLoggedIn, drinksCtrl.add)

// Handle new drink form being submitted
router.post('/create', isLoggedIn, drinksCtrl.create)

// View the details of any drink
router.get('/:id', drinksCtrl.show)

// View a form for editing a drink (restrict to user who added the drink)
router.get('/:id/edit', isLoggedIn, drinksCtrl.edit)

// Handle the edit drink form being submitted (restrict to user who submitted the drink)
router.put('/:id', isLoggedIn, drinksCtrl.update)

// Delete a drink (restrict to user who submitted the drink)
router.delete('/:id', isLoggedIn, drinksCtrl.destroy)

module.exports = router;