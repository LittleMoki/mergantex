const express = require('express')
const router = express.Router()
const multer = require('multer')

// uploads storage

const uploadsDestination = 'uploads'

const storage = multer.diskStorage({
	destination: uploadsDestination,
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})

const uploads = multer({ storage: storage })

router.get('/register', (req, res) => {
	res.send('reg')
})

module.exports = router
