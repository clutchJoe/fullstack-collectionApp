const axios = require("axios");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

async function getData() {
    try {
        const response = await axios.get("https://www.baidu.com/s?rtt=1&bsst=1&cl=2&tn=news&word=aaa&ie=utf-8&ie=utf-8");
        console.log(response.request.connection.servername);
    } catch (error) {
        console.error(error);
    }
}
getData();
// app.get("/", async (req, res) => {
//     const data = await getData();
//     res.send(JSON.parse(data));
// });

// const port = process.env.PORT || 4444;

// app.listen(port, () => console.log(`Server running on port ${port}...`));
