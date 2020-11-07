const mongoClient = require("mongodb").MongoClient;
const uri = process.env.DB_HOST;
const dataBase = process.env.DB_NAME;
const CryptoJS = require("crypto-js");
const secret = require('../../config')
const url =
  "mongodb+srv://chiper_user:chiper1234@chiper.ug2eu.mongodb.net/test";

const dbName = "retoJWT";



const getDatabase = (callback) => {
  client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    callback(db, client);
  });
};

process.on("SIGINT", async function () {
  console.log("connection ended");
  const client = await mongoUtils().conn();
  client.close().then((data) => console.log("conn ended"));
});

const findUser = function (db, user, callback) {
  const collection = db.collection("Users");
  collection.find({ user: user }).toArray(function (err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
};

const createUser = function (db, uname, user, upass, callback) {
  const collection = db.collection("Users");
  collection
    .insertOne({
      nombre: uname,
      user: user,
      password: CryptoJS.AES.encrypt(upass,secret.secret),
    })
    .then((res) => {
      return res.ops[0];
    })
    .then((res) => {
      callback(res);
    });
};

exports.mongoUtils = mongoUtils();
exports.getDatabase = getDatabase();
exports.findUser = findUser();
exports.createUser = createUser();
