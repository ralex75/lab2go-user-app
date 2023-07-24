//const {Router}=require("express")
const db = require("../models/index");
//const router=Router()
const global=require("./global")
const {sendMail}=require("./mailer")


const discard=async(request)=>{
    
    request.status="DISCARDED"
    request.save()
    return "Grazie, la richiesta è stata RIFIUTATA."
}

const accept=async (request)=>{
    
    const {readTemplate,replaceInTemplate}=require("./utils")
   
    let user=await db.users.findOne({ where: {email:request.userEmail},raw:true})
    
    if(!user){
        const code = request.plesso_mec_code
        const {name,surname,email}=JSON.parse(request.user_json_data) 
        const {createAccount} = require("./auth.js")
        user=await createAccount({"email":email,"password":code,"name":name,"surname":surname})
    }

    

    user["password"]=request.plesso_mec_code
    user["LINK_REQUEST_STATUS"]=global.LAB2GO_BASE_URL

    let mergedUserData={...user,...JSON.parse(request.user_json_data)}

    let txt=readTemplate("new_request.txt")
    txt=replaceInTemplate(txt,JSON.parse(request.school_json_data))
    txt=replaceInTemplate(txt,mergedUserData)
    
    sendMail(global.MASTER_MAIL,[user.email,user.emailAlt],"Nuova richiesta di partecipazione",txt,global.LAB2GO_MAIL)

    request.status='SUBMITTED'
    request.save()

    return "Grazie, la richiesta è stata APPROVATA!"

}


/*router.get("/",async (req,res)=>{
    let {tk,status}=req.query
    if(!tk || !status) return res.sendStatus(403)
    if(status!='discard' && status!='accept') return res.sendStatus(403)
    
    const actions= {"accept":accept,"discard":discard}
    let request=await db.partRequest.findOne({where:{requestToken:tk}})
    if(!request || request.status!='PENDING') return res.sendStatus(403)
    try{
        let result=await actions[status](request)
        sendMail(global.MASTER_MAIL,global.LAB2GO_MAIL,`[lab2go] Notifica di avvenuta gestione richiesta ID:${request.id}`,result,global.LAB2GO_MAIL)
        res.send(result)
    }
    catch(exc){
        res.sendStatus(500)
    }
})*/

module.exports={accept,discard}
