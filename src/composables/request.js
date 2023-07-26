import axios from "../services"
import {ref} from 'vue'


export default function useRequest(){
    
   
    const error=ref("")
    const pending=ref(false)
  
    const saveRequest=async(formdata)=>{
        pending.value=true
        
        try{
            await axios.post(`/requests/create`,formdata) 
        }
        catch(exc){
            console.log("Error:",exc)
            error.value="Spiacenti si è verificato un errore."
        }
        finally{
            pending.value=false
        }

    }

    
    return {
        saveRequest,
        pending,
        error
    }
}
