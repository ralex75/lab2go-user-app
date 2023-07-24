const cors=require("cors")

//API
const school=require("./routes/school.api")
const request=require("./routes/request.api")

const express=require('express')
const db = require("./models/index.js");




//CORS OPTIONS
const whitelist = [ 
                    {"origin":`http://localhost:5173`}, 
                    {"origin":`http://localhost:8080`,'credentials':true},
                    {"origin":`http://webapp2.roma1.infn.it:9393`},
                    {"origin":`http://webapp2.roma1.infn.it:9292`,'credentials':true},
                    {"origin":`https://lab2gocc3m.roma1.infn.it`,'credentials':true}
                ]
let corsOptions = {
  origin: function (origin, callback) {
    console.log("Origin:",origin)
    if (!origin || whitelist.some(w=>w.origin.indexOf(origin)!=-1)) {
       
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const configureAPI=(app)=>{


    //EXPRESS SETTINGS
    const corsConfig = {
        origin: true,
        credentials: true,
      };
      
    app.use(cors(corsConfig));
    app.options('*', cors(corsConfig))

    app.use(express.json())
    app.use(express.urlencoded({ extended:true }))
 
    //ROUTES
    app.use('/api/schools',school)
    app.use('/api/requests',request)
    
}


db.sequelize.sync({}).then(_=>{
    
    //createRow()
})





module.exports={configureAPI}