const {Router}=require("express")

const router=Router()

router.get("/mcode/:code",async(req,res)=>{
    
    const https = require("https")
    const crypto = require("crypto")

    const allowLegacyRenegotiationforNodeJsOptions = {
        httpsAgent: new https.Agent({
          // for self signed you could also add
          // rejectUnauthorized: false,
          // allow legacy server
          secureOptions: crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION,
        }),
    };

    const axios=require("axios")
    const {code}=req.params
    const url=`https://cercalatuascuola.istruzione.it/cercalatuascuola/ricerca/risultati?rapida=${code}&tipoRicerca=RAPIDA&gidf=1`
    
    let {data}=await axios({...allowLegacyRenegotiationforNodeJsOptions,url,method:'GET'})
    let result=data.substring(data.indexOf(`<article class="sc-internal-content">`),data.indexOf("</article>"))
    
    res.json(result)
   
})

module.exports=router