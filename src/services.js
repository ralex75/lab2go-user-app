import axios from 'axios'

 
const baseURL={"PROD":'http://lab2go-apps.roma1.infn.it/lab2go/admin/api',
                "DEV":'http://localhost:3000/api'}




// FOR PRODUCTION
const instance=axios.create({
  baseURL:baseURL.PROD,
  timeout: 1000,
});


export default instance