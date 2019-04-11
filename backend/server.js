const express = require("express");
const cors = require("cors");
const AWS = require("aws-sdk");
const fs = require("fs");
const uuidv1 = require('uuid/v1');
const url = require('url');

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


//insert new customer
router.route("/insert/customer").post((req, res) =>{
  var req_body = req.body;
	var params = {
		TableName: "customers",
		Item: req_body["item"]
	};
	docClient.put(params,function(err, data) {
  		if (err) res.status(400).send(err);
  		else res.status(200).send("success");
  	});
});

// insert new supplier
router.route("/insert/supplier").post((req, res) => {
  var req_body = req.body;
  var params = {
    TableName: "suppliers",
    Item: req_body["item"]
  };
  docClient.put(params, function(err, data) {
    if (err) res.status(400).send(err);
    else res.status(200).send("success");
  });

});


// insert specific order
router.route("/insert/order").post((req, res) => {
  var req_body = req.body;
  var order_id = uuidv1();
  var item_obj = {};
  item_obj = req_body["item"];
  item_obj["order_id"] = order_id;
  var params = {
    TableName: "orders",
    Item: item_obj
  };
  docClient.put(params, function(err, data){
    if (err) res.status(400).post(err);
    else res.status(200).send("success");
  });

});


//get all suppliers
router.route("/get/suppliers").get((req, res) => {
  docClient.scan({ TableName: "suppliers" }, (err, data) => {
    if (err) res.status(400).send(err);
    else {
      const { Items } = data;
      res.status(200).send(Items);
    }
  });
});

// get all the orders of specific customer
router.route("/get/orders").get((req, res) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var customer_name = query.customer_name;
  var params = {
    TableName: "orders",
    ExpressionAttributeValues: {':name' : customer_name},
    ProjectionExpression: "order_id, supplier_name, products, #status_order",
    ExpressionAttributeNames: {
        "#customer_name": "customer_name",
        '#status_order': "status"
    },
    FilterExpression: '#customer_name = :name'
  };
  docClient.scan(params, function(err, data){
    if (err) {
      res.status(400).send(err);
    } else{
      res.status(200).send(data.Items);
    }
  });

});

//get supplier's roducts 
router.route("/supplier/products").get((req, res) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var supplier_name = query.supplier_name;
  var params = {
    TableName: "suppliers",
    KeyConditionExpression: "#supplierN = :supplierV",
    ExpressionAttributeNames:{
        "#supplierN": "supplier_name"
    },
    ExpressionAttributeValues: {
      ':supplierV': supplier_name
    }

  };
  docClient.query(params, function(err, data){
    if (err) {
      res.status(400).send(err);
    } else{
      res.status(200).send(data.Items[0].products);
    }
  });
});

// get specific order - GET request with parameter : order_id
router.route("/get/order").get((req, res) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var order_id = query.order_id;

  var params = {
    TableName: "orders",
    ExpressionAttributeValues: {
      ':id': order_id
    },
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames: {
      "#id": "order_id"
    }
  };
  docClient.query(params, function(err, data){
    if (err) {
      res.status(400).send(err);
    } else{
      res.status(200).send(data.Items);
    }
  });
});

router.route("/update_status/order").post((req, res) => {
  var req_body = req.body;
  var order_id = req_body["order_id"];
  var new_status = req_body["item"]["new_status"];
  var params = {
    TableName:"orders",
    Key:{
        "order_id": order_id
    },
    UpdateExpression: "set #current_status = :s",
    ExpressionAttributeValues:{
      ":s":new_status
    },
    ExpressionAttributeNames:{
      "#current_status": "status"
    }
  };
  docClient.update(params, function(err, data) {
    if (err) {
        res.status(400).send(err);
    } else {
        res.status(200).send("succeded");
    }
});
});




// router.route("/create/suppliersTable").post((req,res)=>{
//   var params = {
//       TableName : "Suppliers",
//       KeySchema: [
//         {AttributeName: "supplierName", KeyType: "Hash"},
//       ],
//       AttributeDefinitions: [
//         {AttributeName: "supplierName", KeyType: "S"},
//         {AttributeName: "kind", KeyType: "S"}
//       ],
//       ProvisionedThroughput: {       
//         ReadCapacityUnits: 10, 
//         WriteCapacityUnits: 10
//       }
//   };
//   dynamodb.createTable(params, function(err, data) {
//     if (err) {
//         console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
//     }
//   });

// });


app.use("/", router);
app.listen(4000, () => console.log("Server running on 4000"));
