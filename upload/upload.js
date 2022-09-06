const express = require('express')
const app = express()
const multer = require('multer')
const path = require('path')

const upload = multer({
    storage:multer.diskStorage({
    destination: './upload/images',
    limits:{fileSize:100},
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
})

app.use('/profile', express.static('upload/images'))
app.post('/upload', upload.single('profile'), (req, res)=>{
    console.log(req.file);
    res.json({
        success:1,
        profile_url: `http://localhost:4000/profile/${req.file.filename}`
    })
})
/* function errHandler(err, req, res, next){
    if(err instanceof multer.MulterError){
        res.json({
            success: 0,
            message:err.message
        })
    }
}
app.use(errHandler);
*/
app.listen(4000, ()=>{
    console.log('server is running');
})