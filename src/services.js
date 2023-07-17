import axios from 'axios'

 
const baseURL={"PROD":'http://webapp2.roma1.infn.it:9292/api',
                "DEV":'http://localhost:3000/api'}




// FOR PRODUCTION
const instance=axios.create({
  baseURL:baseURL.PROD,
  timeout: 1000,
});


export default instance