const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = Schema({
        message: String,
        drink: {type: Schema.Types.ObjectId, ref: 'Drink'},
        user: {type: Schema.Types.ObjectId, ref: 'User'}
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })

module.exports = mongoose.model('Comment', commentSchema)