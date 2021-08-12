const { ObjectId } = require("mongodb");

const mongo = require("../shared/mongo");

const service = {
  getUser() {
    return mongo.db.collection("AMAZON").find({});
  },
};

module.exports = service;
