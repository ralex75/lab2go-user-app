const express=require("express")
const { createProxyMiddleware } = require('http-proxy-middleware');
const app=express()
const PORT=3000 //DEFAULT LISTENING PORT
app.use(express.static('dist'))


app.use('/api', createProxyMiddleware({ target: 'http://172.18.0.20:3000', changeOrigin: true }));

app.get("/",(req,res)=>{
    const path=require('path')
   
    res.sendFile(path.join(__dirname,'./../dist/index.html'))

})


app.listen(PORT,()=>{
    console.log("Proxy server UP on port:"+PORT)
}); 