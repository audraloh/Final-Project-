const express = require('express')
const router = express.Router()
const ProfileSchema = require('../models/profile.js')
const PhotoSchema = require('../models/photo.js')
var fs = require('fs');
var path = require('path');
var multer = require('multer');

//get for ProfileSchema
router.get('/', (req, res) => {
    ProfileSchema.find(req.query)
    //'then' happens if find is succesful
    .then(profile => {
      console.log("succesfully got entire db!")
      console.log(profile)
      res.json(profile)
    })
    //if theres an error, 'catch' happens instead
    .catch(err => {
      console.error(err)
      res.json(err)
    })
})

//post for ProfileSchema
//we will be using the '/add' to do a POST request
router.post('/add', (req, res) => {
  ProfileSchema.create(req.body)
    .then(profile => {
      console.log(profile)
      res.send(profile)
    })
    .catch(err => {
      console.error(err)
      res.json(err)
    })
})

//post for PhotoSchema
//we will be using the '/add' to do a POST request
router.post('/add/photo', (req, res) => {
  console.log("wrong")
  PhotoSchema.create(req.body)
    .then(photo => {
      console.log(photo)
      res.send(photo)
    })
    .catch(err => {
      console.error(err)
      res.send(err)
    })
})


//push for ProfileSchema
router.put('/:id', (req, res) => {
    ProfileSchema.findByIdAndUpdate(req.params.id, req.body)
      .then(updated => {
        // returns the previously saved model
        res.send(updated)
      })
      .catch(err => {
        res.json(err)
      })
})

//push for PhotoSchema
router.put('/:id/photo', (req, res) => {
  PhotoSchema.findByIdAndUpdate(req.params.id, req.body)
    .then(updated => {
      // returns the previously saved model
      res.send(updated)
    })
    .catch(err => {
      res.json(err)
    })
})

//delete for ProfileSchema
router.delete('/:id', (req, res) => {
  ProfileSchema.findByIdAndDelete(req.params.id)
  .then(deleted => {
    res.send(deleted)
  })
  .catch(err => {
    res.json(err)
  })
})

//delete for PhotoSchema
router.delete('/:id/delete/photo', (req, res) => {
  PhotoSchema.findByIdAndDelete(req.params.id)
  .then(deleted => {
    res.send(deleted)
  })
  .catch(err => {
    res.json(err)
  })
})

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

var upload = multer({ storage: storage });

router.get('/get/allphoto', (req, res) => {
  PhotoSchema.find(req.query)
	.then((data, err)=>{
		if(err){
			console.log(err);
		}
		res.render('imagepage',{items: data})
	})
});


router.post('/post/allphoto', upload.single('image'), (req, res, next) => {

	var obj = {
		name: req.body.name,
		desc: req.body.desc,
		img: {
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
			contentType: 'image/png'
		}
	}
	PhotoSchema.create(obj)
	.then ((err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			// item.save();
			res.redirect('/');
		}
	});
});

module.exports = router

