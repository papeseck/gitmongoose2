const mongoose = require("mongoose");
const Model = mongoose.Model;
let Schema = mongoose.Schema

// create schema
var personSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

//Create and Save a Record of a Model
let Diabel = new Person({
    name: "Diabel",
    age: 24,
    favoriteFoods: ['Apple', 'Banana']
});
Diabel.save( (err, person) => {
    if (err) {
        console.log("Failed");
    } else {
        console.log("Saved Successful");
    }
});
const createAndSavePerson = function (done) {

    done(null /*, data*/);

};

//create manyPeople
const createManyPeople = function (arrayOfPeople, done) {
    Model.create(arrayOfPeople, (err, data) => {
        if (err) {
            done(err);
        }
        done(null, data);
    })
};

//Use model.find() to Search Your Database
const findPeopleByName = function (personName, done) {
    let query = Person.find({ name: personName })
    query.exec(function (err, data) {
        if (err) return done(err)
        return done(null, data);
    });
}

//Use model.findOne() to Return a Single Matching Document from Your Database
let findOneByFood = function (food, done) {
    Person.findOne({ favoriteFoods: food },  (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};

//Use model.findById() to Search Your Database By _id
let findPersonById = (personId, done) => {
    Person.findById(Person.personId, (err, data) => err ? done(err) : done(null, data));
};

//Perform Classic Updates by Running Find, Edit, then Save
let findEditThenSave = function (personId, done) {
    let foodToAdd = 'hamburger';
    Person.findById(personId, function (err, data) {
        data.favoriteFoods.push(foodToAdd);
        data.save();
        if (err) {
            return done(err);
        }
        else {
            done(null, data);
        }
    });
};

//Perform New Updates on a Document Using model.findOneAndUpdate()
var findAndUpdate = function (personName, done) {
    var ageToSet = 20;

    Person.findOneAndUpdate(
        { name: personName },
        { $set: { age: ageToSet } },
        { new: true },
        (err, data) => {
            if (err) return done(err, data);
            return done(null, data);
        }
    );
};

//  Delete One Document Using model.findByIdAndRemove
let person_id = '5eb987e377d884411cac6b69';
Person.findByIdAndRemove(person_id, (err, docs) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Removed Person : ", docs);
    }
});
//MongoDB and Mongoose - Delete Many Documents with model.remove()
let removeManyPeople = function (done) {
    let nameToRemove = "Mary";
    Person.deleteMany({ name: nameToRemove }, function (err, data) {
        if (err) {
            done(err);
        } else {
            done(null, data);
        }
    });
};

//Chain Search Query Helpers to Narrow Search Results
let queryChain = function (done) {
    let foodToSearch = "burrito";
    Person.find({ favoriteFoods: foodToSearch }).sort({ name: "asc" }).limit(2).select("-age").exec((err, data) => {
        if (err)
            done(err);
        done(null, data);
    })
};