import { ref,computed } from "vue"
import axios from "../services"

export default function useAppSettings(){

    const settings=ref({})
    
    const getAllSettings=async ()=>{
        let response=await axios.get("/settings/")
        settings.value=response.data
    }

    const saveSettings=async ()=>{
        await axios.put("/settings/",{'settings':settings.value})
    }

    const allowEditRequest=computed(()=>{
        if(!settings.value) return false
        return false
        return new Date()<new Date(settings.value.allow_new_edit_request_date)
    })

    return {
        settings,
        allowEditRequest,
        getAllSettings,
        saveSettings
    }
}