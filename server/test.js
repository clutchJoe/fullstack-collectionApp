// const mongoose = require("mongoose");

// const mongoURI = "mongodb://clutch:0000@localhost:27017/clutchPin";

// mongoose.connect(mongoURI, { useNewUrlParser: true }, err => {
//     if (!err) {
//         var schema = new mongoose.Schema(
//             { age: Number, name: String },
//             { collection: "uploads.files" }
//         );
//         var temp = mongoose.model("temp", schema, "uploads.files");
//         temp.create({ name: "xiaowang" }, { name: "xiaoli" }, function(err, doc1, doc2) {
//             //{ __v: 0, name: 'xiaowang', _id: 59720d83ad8a953f5cd04664 }
//             console.log(doc1);
//             //{ __v: 0, name: 'xiaoli', _id: 59720d83ad8a953f5cd04665 }
//             console.log(doc2);
//         });
//     }
// });

const datas = [
    {
        partition: "East",
        division: "Atlantic",
        teamName: "Boston Celtics",
        simpleName: "Celtics",
        location: "Boston",
        teamId: "1610612738"
    },
    {
        partition: "East",
        division: "Atlantic",
        teamName: "Brooklyn Nets",
        simpleName: "Nets",
        location: "Brooklyn",
        teamId: "1610612751"
    },
    {
        partition: "East",
        division: "Atlantic",
        teamName: "New York Knicks",
        simpleName: "Knicks",
        location: "New York",
        teamId: "1610612752"
    }
];

const item = datas.map(data => ({ ...data, kk: 444 }));

console.log(item);
