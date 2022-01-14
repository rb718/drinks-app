const Drink = require('../models/drink')
const Comment = require('../models/comment')

const create = async (req, res) => {
    const formData = req.body
    const drink = await Drink.findById(formData.drink)
    const comment = new Comment({message: formData.message, drink: drink})
    comment.user = req.user
    await comment.save()
    drink.comments.push(comment)
    await drink.save()
    res.redirect("/drinks/" + formData.drink)
}

const update = async (req, res) => {
    const comment = await Comment.findById(req.params.id).populate('drink')
    comment.message = req.body.message
    await comment.save()
    res.redirect("/drinks/" + comment.drink.id)
}

const destroy = async (req, res) => {
    const comment = await Comment.findById(req.params.id).populate('drink')
    const drink_id = comment.drink.id
    const drink = await Drink.findById(drink_id).populate('comments')
    drink.comments.remove(comment.id)
    await drink.save()
    await Comment.findByIdAndRemove(req.params.id)
    res.redirect("/drinks/" + drink_id)
}

module.exports = {
    create,
    update,
    destroy
}