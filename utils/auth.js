import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
	let token = req.body.token || req.params.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, process.env.secret, (err, decoded) => {
			if(err) res.status(400).json({ success: false, message: 'Bad Request'})
			else req.decoded = decoded
		next()
		})
	} else {
		return res.status(401).send({
			success: false,
			message: 'No token provided'
		})
	}
}