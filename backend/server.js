const express = require("express");
const cors = require("cors");
const AWS = require("aws-sdk");
const fs = require("fs");

const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

// setup DB access
const localConfigPath = "./local_config.js";

try {
  if (fs.existsSync(localConfigPath)) {
    // for local work
    const localConfig = require("./local_config.js");
    AWS.config.update(localConfig.aws_remote_config);
  } else {
    // for EC2
    AWS.config.update({ region: "us-west-2" });
  }
} catch (err) {
  console.error(err);
}

const docClient = new AWS.DynamoDB.DocumentClient();

app.use(cors());
app.use(bodyParser.json());

router.route("/test").get((req, res) => {
  res.status(200).send("hakaton test!");
});

router.route("/getAll").get((req, res) => {
  docClient.scan({ TableName: "customers" }, (err, data) => {
    if (err) res.status(400).send(err);
    else {
      const { Items } = data;
      res.status(200).send(Items);
    }
  });
});

app.use("/", router);
app.listen(4000, () => console.log("Server running on 4000"));
