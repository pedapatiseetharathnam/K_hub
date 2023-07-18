const connectToMongo = require("./Db");
const express = require("express");
const cors = require("cors");
const Note = require("./models/Note");

connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/note/add", async (req, res) => {
  // res.send(req.body);
  const note = await Note.create(req.body);
  res.send({ msg: "Upload Successfully", status: "success" });
});
app.get("/api/note/fetchall", async (req, res) => {
  const note = await Note.find();
  res.send(note);
});

app.get("/api/note/Age", async (req, res) => {
  // const keyToFind = 'Age';
  // Note.find({}, keyToFind)
  //   .then(docs => {
  //     res.send(docs);
  //   })
  //   .catch(err => {
  //     res.send(err);
  // //   });
  // const documents = await Note.find({ Age: { $exists: true } }).exec();
  // // Print the values of the "Age" field
  // const data = documents.map((doc) => doc.Age);
  // //   console.log("Ages:", ages);

  const result = await Note.aggregate([
    { $group: { _id: '$Age', count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);
  // Format the result
  const formattedResult = [['Age', 'age_count']];
  result.forEach(({ _id, count }) => {
    formattedResult.push([String(_id), count]);
  });
  res.send(formattedResult);
});

app.get("/api/note/Gender", async (req, res) => {
  const result = await Note.aggregate([
    { $group: { _id: '$Gender', count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);
  // Format the result
  const formattedResult = [['Gender', 'gender_count']];
  result.forEach(({ _id, count }) => {
    formattedResult.push([String(_id), count]);
  });
  res.send(formattedResult);
});

app.get("/api/note/Fav_Number", async (req, res) => {
  const result = await Note.aggregate([
    { $group: { _id: '$Fav_Number', count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);
  // Format the result
  const formattedResult = [['Fav_Number', 'Fav_Number_count']];
  result.forEach(({ _id, count }) => {
    formattedResult.push([String(_id), count]);
  });
  res.send(formattedResult);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
