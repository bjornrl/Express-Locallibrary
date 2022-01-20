const { DateTime } = require("luxon");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author´s full name

AuthorSchema.virtual("name").get(function () {
  // To avoid errors in cases where an author does not have neither a family name or a first name
  // we want to make sure we handle the exception by returning an empty string
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ", " + this.first_name;
  }
  if (!this.first_name || !this.family_name) {
    fullname = "";
  }
  return fullname;
});

// Virtual for authors lifespan

AuthorSchema.virtual("lifespan").get(function () {
  let lifetime_string = "";
  if (this.data_of_birth) {
    lifetime_string = this.date_of_birth.getYear();
  }
  lifetime_string += " - ";
  if (this.date_of_death) {
    lifetime_string += this.data_of_birth.getYear();
  }
  return lifetime_string;
});

//Virtual for authors URL
AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});

AuthorSchema.virtual("Birth_date_formatter").get(function () {
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(
        DateTime.DATE_MED,
      ) + " - "
    : "";
});

AuthorSchema.virtual("Death_date_formatter").get(function () {
  return this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : "";
});

module.exports = mongoose.model("Author", AuthorSchema);
