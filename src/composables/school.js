import axios from "../services"
import {ref} from 'vue'

export default function useSchool(){
    
    const school=ref({})
    const schools=ref([])
    const error=ref("")
    const working=ref(false)


    //code => codice meccanografico
    const getSchoolInfo=async(code)=>{
        
        error.value=""
        schools.value=[]
        working.value=true
        let data=null
        try{
            let response=await axios.get(`/schools/mcode/${code}`)
            data=response.data
        }
        catch(exc){
            console.log("Error:",exc)
            error.value=exc.message

        }
        finally{
            working.value=false
        }

        if(error.value) return
       
        const doc = new DOMParser().parseFromString(data, 'text/html');
        const table = doc.querySelector('.sc-table > tbody ');
        let rows=Array.from(table.rows)
        
        
        if(!rows.length){
            error.value="Nessuna corrispondenza trovata."
            return
        }

        rows.forEach(r=>{
            let cells=Array.from(r.cells)
            let school={}
    
            cells.forEach(c=>{
                
                let k=c.classList[0].replaceAll("-","_")
                
                //pulisce la stringa da eventuali spazi vuoti multipli
                school[k]=c.children[0].outerText.split(" ").filter(i=>i).join(" ")
                if(k=='sc_tab_plesso')
                {
                    school[k+"_code"]=c.children[1].outerText.trim()
                }
            })

            schools.value.push(school)
        })
        
       
    }

    

    return {
        schools,
        school,
        working,
        error,
        getSchoolInfo,
       
    }
}
