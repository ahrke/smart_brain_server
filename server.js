const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'david',
		password: '',
		database: 'smart-brain'
	}
})

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'someone@somewhere.com',
			password: 'password',
			entries: 0,
			joined: new Date()
		},
		{
			id: '456',
			name: 'Veera',
			email: 'virago@warriors.ca',
			password: 'banana',
			entries: 0,
			joined: new Date()
		}
	]
}

app.get('/', (req, res) => {
	res.send(database.users);
})

app.get('/profile/:id', (req,res) => {
	const { id } = req.params;
	db.select('*').from('users').where({
		id: id
	})
		.then(user => {
			if(user.length) {
				res.json(user[0])
			} else {
				res.status(400).json('user not found')
			}
		})
})

app.post('/signin', (req, res) => {
	if(req.body.password === database.users[0].password 
		&& req.body.email === database.users[0].email) {
		res.json(database.users[0]);
	} else {
		res.status(400).json('error retrieving account');
	}
})

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	db('users')
		.returning('*')
		.insert({
			name: name,
			email: email,
			joined: new Date()
		})
		.then(user => res.json(user[0]))
		.catch(err => res.status(400).json("unable to register"))
})

app.put('/image', (req,res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id){
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	})

	if(!found){
		res.status(404).json('user not found');
	}
})

app.listen(3000, () => {
	console.log('app is running on port 3000');
})