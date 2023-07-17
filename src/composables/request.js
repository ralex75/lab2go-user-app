import axios from "../services"
import {ref} from 'vue'


export default function useRequest(){
    
   
    const error=ref("")
    
  
    const saveRequest=async(formdata)=>{
        try{
            await axios.post(`/requests/create`,formdata) 
            router.push({"name":"requests.index"})
        }
        catch(exc){
            error.value=exc
        }

    }

    
    return {
        saveRequest,
        error
    }
}
