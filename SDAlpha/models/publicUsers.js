// this file we build a schema for DB for users

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var publicUsersSchema = new Schema({
    name: String,
    tamaringaId:String,
    department: String,
    medicalProfile : String,
    birthYear : String,
    yearAtTwenty: String,
    countryAtTwenty: String,
    countryOrigin: String,
    languageOrigin : String,
    languageAtTwenty : String,
    yearOfImmigration : String,
    Genre1Select : String,
    Genre2Select : String,
    nursingHome : String,
    group: String,
    entrance: Number,
    songs: []
});

// the schema is useless so far
// we need to create a model using it
var PublicUsers = mongoose.model('PublicUsers', publicUsersSchema);

// make this available to our users in our Node applications
module.exports = PublicUsers;
