const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Kullanıcı modeli
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,  // Kullanıcı adının benzersiz olmasını sağlıyoruz
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);
