const Drink = require('../models/drink')
const Comment = require('../models/comment')

// helper function to get the single drink object from db
const get_drink = async (id) => (await Drink.findById(id))
const update_drink = async (id, updates) => (await Drink.updateOne({id}, updates))

const index = async (req, res) => {
    const drinks = await Drink.find({})
    res.render('drinks/index', {drinks, title: 'All Drinks'})
}

const all = async (req, res) => {
    const drinks = await Drink.find({}).populate('comments')
    res.render('drinks/index', {drinks})
}

const add = (req, res) => {
    res.render('drinks/add', {title: "Add Drink"})
}

const create = async (req, res) => {
    const drink = Drink(req.body)
    drink.user = req.user
    await drink.save()
    console.log('user', req.user)
    res.redirect("/drinks/" + drink.id)
}

const show = async (req, res) => {
    const drink = await Drink.findById(req.params.id).populate([{
            path: 'comments',
            options: {sort: '-created_at'},
            populate: {path: 'user'}
        }, 'user']
    )
    res.render('drinks/show', {drink, title: "Drink Details"})
}

const edit = async (req, res) => {
    const drink = await get_drink(req.params.id)
    res.render('drinks/edit', {drink, title: 'Edit Drink'})
}

const update = async (req, res) => {
    const drink = await get_drink(req.params.id)
    const updates = req.body
    drink.photo = updates.photo
    drink.title = updates.title
    drink.about = updates.about
    drink.recipe = updates.recipe
    await drink.save()
    res.redirect('/drinks/' + req.params.id)
}

const destroy = async (req, res) => {
    const drink = await get_drink(req.params.id)
    await Comment.deleteMany({drink: drink.id})
    await Drink.findByIdAndRemove(drink.id)
    res.redirect('/drinks')
}


module.exports = {
    index,
    all,
    add,
    create,
    show,
    edit,
    update,
    destroy
}