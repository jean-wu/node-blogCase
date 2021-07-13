var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/user')
var Schema = mongoose.Schema
var userSchema = new Schema({
    email: {
        type: String,
        requires: true
    },
    nickname: {
        type: String,
        requires: true
    },
    password: {
        type: String,
        requires: true
    },
    created_time: {
        type: Date,
        default: Date.now
    },
    last_modify_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/public/img/avatar-default.png'
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        defaule: -1
    },
    birthday: {
        type: Date
    },
    statue: {
        type: Number,
        enum: [0, 1, 2],
        default: 0
    }
})
module.exports = mongoose.model('User', userSchema)