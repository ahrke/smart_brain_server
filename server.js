const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const app = express();

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'david',
		password: '',
		database: 'smart-brain'
	}
})

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => res.send("hello"));

app.get('/profile/:id', )

app.post('/signin', signin.handleSignin(db,bcrypt));
app.post('/register', register.handleRegistration(db, bcrypt));
app.put('/image', image.handleImage(db));
app.post('/imageurl', image.handleApiCall());

app.listen(3000, () => {
	console.log('app is running on port 3000');
})