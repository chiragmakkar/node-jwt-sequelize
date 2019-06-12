import jwt from 'jsonwebtoken'
import { Users } from '../utils/connectDB'

export const auth = (req, res, next) => {
	let token = req.body.token || req.params.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, process.env.secret, async (err, decoded) => {
			if(err) res.status(400).json({ success: false, message: 'Bad Request'})
			else {
				let user = await Users.findOne({where : {id : decoded.id}})
				if(!user) res.status(401).json({ success: false, message: 'Invalid Token'})
				req.decoded = decoded
				next()
			}
		})
	} else {
		return res.status(401).send({
			success: false,
			message: 'No token provided'
		})
	}
}