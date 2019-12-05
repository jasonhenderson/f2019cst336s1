const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const multer = require('multer');
const fs = require('fs');

// Customize how the uploaded files are stored
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        // Should be relative to the root project directory
        callback(null, './temp');
    },
    filename: function(req, file, callback) {
        console.log('file info', file);
        callback(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({ storage: storage });

/* GET file upload form. (/upload) */
router.get('/', function(req, res, next) {

    res.render('../public/examples/file-upload/upload', {
        title: 'Upload your file(s)'
    });

});

router.post('/files/fs', upload.array('files', 4), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.render('error', {
            message: 'No file to upload'
        })
    }

    // This example only handles a single file...you would
    // need to convert to async/await or use Promise.all to 
    // work with all the files at once
    const file = req.files[0]

    fs.rename(file.path, './public/files/' + file.filename, (err) => {
        
        const resultData = {
            id: file.filename,
            url: '/files/' + file.filename,
            name: file.originalname,
            size: file.size,
            type: file.mimetype
        };

        if (req.query.format && req.query.format === 'json') {
            res.json(resultData);
        }
        else {
            res.render('../public/examples/file-upload/done',
                Object.assign({}, {
                    title: 'File Upload to File System Complete'
                }, resultData)
            );
        }

    });

});

/* POST file blob. (/upload) */
router.post('/files/db', upload.array('files', 4), (req, res) => {
    console.log('uploaded files', req.files);

    if (!req.files || req.files.length === 0) {
        return res.render('error', {
            message: 'No file to upload'
        })
    }

    // This example only handles a single file...you would
    // need to convert to async/await or use Promise.all to 
    // work with all the files at once
    const file = req.files[0]

    const connection = mysql.createConnection({
        host: 'p2d0untihotgr5f6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'zsn9kncqtvumywkk',
        password: 'jrj24hhp4uchfj03',
        database: 'pvfhxur2aptwj0sr'
    });

    connection.connect();

    const fileData = fs.readFileSync(file.path);
    file.buffer = new Buffer(fileData);
  
    connection.query(`
INSERT INTO ex_uploaded_file(name, type, size, data) 
VALUES (?, ?, ?, ?)
`, [file.originalname, file.mimetype, file.size, file.buffer], // assuming POST
        (error, results, fields) => {
            if (error) throw error;

            const resultData = {
                id: results.insertId,
                url: '/upload/file/' + results.insertId,
                name: file.originalname,
                size: file.size,
                type: file.mimetype
            };

            if (req.query.format && req.query.format === 'json') {
                res.json(resultData);
            }
            else {
                res.render('../public/examples/file-upload/done',
                    Object.assign({}, {
                        title: 'File Upload to DB Complete'
                    }, resultData)
                );
            }
        });

    connection.end();
});

/* GET file blob. (/file/9887366) */
router.get('/file/:id', function(req, res) {

    const connection = mysql.createConnection({
        host: 'p2d0untihotgr5f6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'zsn9kncqtvumywkk',
        password: 'jrj24hhp4uchfj03',
        database: 'pvfhxur2aptwj0sr'
    });

    connection.connect();

    connection.query("SELECT * from `ex_uploaded_file` WHERE id = ?",
        req.params.id, (err, result) => {
            if (err) throw err;

            const row = result[0];

            // Got BLOB data:
            const data = row.data;
            console.log("BLOB data read!");

            // Converted to Buffer:
            const buf = new Buffer(data, "binary");

            // Send buffer 
            res.setHeader('Content-Type', row.type);
            res.send(buf);

            // // Write new file out:
            // fs.writeFileSync(outputfile, buf);
            // console.log("New file output:", outputfile);
        });

    connection.end();

});


module.exports = router;
