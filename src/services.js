import axios from 'axios'

 
const baseURL={"PROD":'/lab2go/admin/api',
                "DEV":'/api'}




// FOR PRODUCTION
const instance=axios.create({
  baseURL:baseURL.DEV,
  timeout: 5000,
});


export default instance