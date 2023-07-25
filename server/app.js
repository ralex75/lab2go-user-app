const express=require('express')
const app=express()
const PORT=3000 //DEFAULT LISTENING PORT
const {configureAPI} = require("./configureAPI")
app.use(express.static('dist'))


configureAPI(app)

app.get("/",(req,res)=>{
    const path=require('path')
    
    //res.sendFile(path.join(__dirname,'public/dist/index.html'))
    res.sendFile(path.join(__dirname,'./../dist/index.html'))

})

//LISTENING
app.listen(PORT,()=>{
    console.log(`Server Lab2GO API listening on port:${PORT}`)
})