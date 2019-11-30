var express = require('express');
var router = express.Router(),
	uuid = require('uuid');

/* GET home page. */
router.get('/', function(req, res, next){
	res.render('index', { title: 'Express' });
});

router.post('/draw/save', function(req, res){
	let file = req.files.picture;
	const filename = uuid.v1() + '.jpg';
	file.mv('./public/outputSketch/' + filename, function(err){
		if (err) {
			console.log(err);
			return res.status(500).send(err);
		}

		res.send({ success: true, filename: filename });
	});
});

module.exports = router;
