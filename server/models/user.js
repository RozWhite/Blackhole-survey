
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');


let User = mongoose.Schema
(
    {
        username:{
        type: String,
        required: true,
        trim: true,
        default: ''

    }, 
    email:{
        type: String,
        required: true,
        trim: true,
        index: {unique: true},
        default: ''
        
    },
    password: {
        type: String,
        required: true,
        trim: true, 
        // minlength: 2,
        default: ''

    },
    displayName: {
        type: String,
        default: '',
        required: true,
        trim: true

    },
    created: {
        type: Date,
        default: Date.now

    },
    Update: {
        type: Date,
        default: Date.now

    },
    },
    {
        collection: "users"
    }
);   
    

//configure option for our user model
let options = ({ missingPasswordError: 'Wrong / Missing Password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);

