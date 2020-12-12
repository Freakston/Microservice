const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');

const storage = multer.diskStorage({
	destination: './fil/',
	filename: function(request, file, callback){
		callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({
	storage: storage,
	limits:{fileSize: 10000000},
	fileFilter: function(request, file, callback){
		checkType(file, callback);
	}
}).single('myImage');

function checkType(file, callback){
	const filetypes = /jpeg|jpg|png/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if(mimetype && extname){
		return callback(null,true);
	} else {
		callback('Unable to upload. Allows only JPEG, JPG, PNG')
	}
}

const port = 6970; // we are using port 6970 here
app.listen(port, () => console.log(`Server started on port ${port}`));

app.get('/', (request, response) => response.render('index'));

app.post('/upload', (request, response) => {
	upload(request, response, (error) => {
		if(error){
			response.render('index', {
				msg: error
			});
		} else {
			console.log(request.file);
			response.send('Upload Successful');
		}
	})
});