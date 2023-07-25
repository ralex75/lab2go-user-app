const nodeMailer = require('nodemailer');
const {mail} = require("./global")

function sendMail(from,to,subj,body,replyTo=null,ext=""){
    
    let to_arr= Array.isArray(to) ? to : to.split(";")
   
    let transporter = nodeMailer.createTransport({
        host: 'smtp.roma1.infn.it',
        port: 25
    });


    
    //se esiste estensione di gruppo per GMAIL fa il replace dell'indirizzo GMAIL con +reqSUB o +reqACC
    if(ext){
        let idx=to_arr.indexOf(mail.LAB2GO_MAIL)
        if(idx>-1){
            let addr=mail.LAB2GO_MAIL.split("@")
            to_arr[idx]=`${addr[0]}+${ext}@${addr[1]}`
        }
    }

    
    let mailOptions={
        from:from,
        to:to_arr,
        subject:subj,
        html:body
    }

    if(replyTo){
        mailOptions["replyTo"]=replyTo
    }


    return new Promise(function(resolve,reject){
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error:",error)
                reject({success: false});
            } else {
                resolve({success: true})
            }
        });
    })
   
}

module.exports={sendMail};