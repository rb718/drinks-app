const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const drinkSchema = Schema({
        photo: String,
        title: String,
        about: String,
        recipe: String,
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })

module.exports = mongoose.model('Drink', drinkSchema)