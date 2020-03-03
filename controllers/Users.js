const { User } = require('../models')
const jwt = require('jsonwebtoken')

class UserController {
	static register(req, res){
		let { email, password } = req.body

		User.create( { email, password } )
		.then(user => {
			res.status(201).json(user)
		})
		.catch(err => {
			res.status(400).json(err)
		})
	}

	static login(req, res){
		User.findOne({ where: {
			 email: req.body.email
			} 
		})
		.then(user => {
			if(user !== null){
				let password = req.body.password
				if(user.password === password){
					const userToken = jwt.sign({
						id: user.id,
						email: user.email,
					},'secret' );
					
					req.headers.userToken = userToken
					res.status(200).json(userToken)
					
				}else{
					res.status(400).json('Wrong Email or Password!')
				}
			}else{
				res.status(400).json('Wrong Email or Password!')
			}
		})
	}
}

module.exports = UserController