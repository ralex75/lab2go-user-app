const {Router}=require("express")
const db = require("../models/index");
const {sendMail} = require("../api/mailer");
const global=require("../api/global")

const router=Router()


const sendAskConfirm=async (request)=>{

    const moment=require("moment")
    const {readTemplate,replaceInTemplate}=require("../api/utils")
    let {requestToken,school_json_data,user_json_data,createdAt}=request
    let txt=readTemplate("pending_request.txt")
    txt=replaceInTemplate(txt,JSON.parse(school_json_data))
    txt=replaceInTemplate(txt,JSON.parse(user_json_data))
    let LINK_ACCEPT=`${global.LAB2GO_BASE_URL.DEV}/api/requests/confirm?tk=${requestToken}&status=accept`
    let LINK_DISCARD=`${global.LAB2GO_BASE_URL.DEV}/api/requests/confirm?tk=${requestToken}&status=discard`
    
    //rimuove eventuali multipli backslash nell'URL
    LINK_ACCEPT=LINK_ACCEPT.replace(/([^:]\/)\/+/g, "$1")
    LINK_DISCARD=LINK_DISCARD.replace(/([^:]\/)\/+/g, "$1")

    LINK_ACCEPT=`<a href="${LINK_ACCEPT}">accettare</a>`
    LINK_DISCARD=`<a href="${LINK_DISCARD}">scartare</a>`
    let TIME=moment(createdAt).format("HH:mm")
    let DATE=moment(createdAt).format("DD-MM-YYYY")
    txt=replaceInTemplate(txt,{LINK_ACCEPT,LINK_DISCARD,DATE,TIME})
    
    await sendMail(global.mail.NO_REPLY,global.mail.LAB2GO_MAIL,"[lab2go] Richiesta di approvazione",txt,global.mail.LAB2GO_MAIL,global.mailext.REQSUB)

}

router.get("/confirm",async (req,res)=>{
    let {tk,status}=req.query
    if(!tk || !status) return res.sendStatus(403)
    if(status!='discard' && status!='accept') return res.sendStatus(403)
    const {accept,discard}=require("../api/confirm")
    const actions= {"accept":accept,"discard":discard}
    let request=await db.request.findOne({where:{requestToken:tk}})
    if(!request || request.status!='PENDING') return res.sendStatus(403)
    
    try{
        let result=await actions[status](request)
        sendMail(global.mail.NO_REPLY,global.mail.LAB2GO_MAIL,`[lab2go] Notifica di avvenuta gestione richiesta ID:${request.id}`,result,global.mail.LAB2GO_MAIL,global.mailext.REQACC)
        res.send(result)
    }
    catch(exc){
        console.log(exc)
        res.sendStatus(500)
    }
})

router.post("/create",async (req,res)=>{
    const crypto = require("crypto")
    
    let {school,user}=req.body
   
    //recupera il token in base al codice meccanografico dell'istituto e dell'anno corrente
    let request= await db.request.findOne({attributes:['token'],raw:true, where: { school_mec_code: school.sc_tab_code,year:new Date().getFullYear()} });
    
    //se non c'è ne genera uno
    let token = request?.token || crypto.randomBytes(64).toString('hex')

    try{
        
       
        request=await db.request.create({token:token,
                                                 requestToken:crypto.randomBytes(64).toString('hex'),
                                                 school_mec_code:school.sc_tab_code,
                                                 plesso_mec_code:school.sc_tab_plesso_code,
                                                 school_json_data:JSON.stringify(school),user_json_data:JSON.stringify(user),
                                                 userEmail:user.email})
        
       
       
        try{
            sendAskConfirm(request.toJSON())
        }
        catch(exc){
            console.log("SendAskConfirm:",exc)
        }
        res.json({request})
    }
    catch(exc)
    {
        console.log("Exc:",exc)
        return res.status(500).json({"exc":exc})
    }
    
    
})

module.exports=router