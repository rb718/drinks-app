const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = Schema({
        avatar: String,
        name: String,
        google_id: String,
        email: String
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
)

module.exports = mongoose.model('User', userSchema)