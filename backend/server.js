const express = require('express');
const cors = require('cors');

const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());


router.route('/test').get((req, res) => {
res.status(200).send('hakaton test!');
});


app.use('/', router);
app.listen(3000, () => console.log('Server running on 4000'));
