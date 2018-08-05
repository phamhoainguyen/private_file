let express = require('express');
let bodyParser = require ('body-parser');
let jwt = require ('jsonwebtoken');
let Promise = require ('bluebird');

let users = require ("./api/routes/userRoutes");
let auth = require ("./api/routes/auth");
let records = require("./api/routes/recordRoutes");

const app = express();
let port = process.env.PORT || 4000;
process.env.TZ = 'Asia/Ho_Chi_Minh';

mongoose = require('mongoose');
let url = process.env.MONGOLAB_URI;
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://NguyenPham:Nguyen171096@ds121665.mlab.com:21665/bikesharingdb', {
    useMongoClient: true
});

process.env.JWT_SECRET = "mysecurekey";

app.use(bodyParser.urlencoded({ extended: true }));
//https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0
app.use(bodyParser.json());



app.use("/api/users", users);
app.use("/api/records", records);
app.use("/api/auth", auth);

// app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html"));
// });

app.listen(port, function () {
    console.log('Now listening for request');
});
