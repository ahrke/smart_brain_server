const handleSignin = (db,bcrypt) => (req, res) => {
	const {email, password} = req.body;
	db.select('email','hash').from('login')
		.where('email','=',email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash, 10);
			if(isValid){
				db('users').select('*')
					.where('email','=',email)
					.then(user => {
						console.log(user[0].email)
						res.json(user[0])
					})
					.catch(err => res.status(400).json('can not sign in'))
			} else {
				res.status(400).json('wrong credentials')
			}
		})
		.catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
	handleSignin
}