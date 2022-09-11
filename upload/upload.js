const express = require('express')
const app = express()
const ConnectDB = require('./DBconnect/config')
ConnectDB();
const upload = require('./middleware/upload')

app.use('/profile', express.static('upload/images'))

app.post('/single', upload.single('profile'), (req, res)=>{
    console.log(req.file);
    res.json({
        success:1,
        profile_url: `http://localhost:4000/${req.file.filename}`
    })
})
app.post('/multiple', upload.array('profile', 4), (req, res)=>{
    console.log(req.file);
    try{
        res.send(req.files);
    } catch(error){
        console.log(error);
        res.send(400);
    }
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
app.listen(5000, ()=>{
    console.log('server is running');
})
