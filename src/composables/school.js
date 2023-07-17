import axios from "../services"
import {ref} from 'vue'

export default function useSchool(){
    
    const school=ref({})
    const schools=ref([])
    const error=ref("")
    const working=ref(false)


    //code => codice meccanografico
    const getSchoolInfo=async(code)=>{
        
        schools.value=[]
        working.value=true
        let {data}=await axios.get(`/schools/mcode/${code}`)
        const doc = new DOMParser().parseFromString(data, 'text/html');
        const table = doc.querySelector('.sc-table > tbody ');
        let rows=Array.from(table.rows)
        
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
        
        working.value=false
    }

    

    return {
        schools,
        school,
        working,
        error,
        getSchoolInfo,
       
    }
}
