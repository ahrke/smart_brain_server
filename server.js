const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

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
	const found = false;
	database.users.forEach(user => {
		if(user.id === id) {
			found = true;
			res.json(user);
		} 

		if(!found) {
			res.status(404).json('no user found');
		}
	})
})

app.post('/signin', (req, res) => {
	if(req.body.password === database.users[0].password) {
		res.json('success');
	} else {
		res.status(400).json('error retrieving account');
	}
})

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	database.users.push({
		id: '100',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	})
	res.json('added new user ' + name);
})

app.post('/image', (req,res) => {
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