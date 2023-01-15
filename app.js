const express = require('express');
const app = express();

app.dotenv = require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const authRouter = require('./components/auth/auth.router');
app.use('/auth', authRouter);

const port = 3001;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});