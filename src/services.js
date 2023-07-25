import axios from 'axios'

 
const baseURL={"PROD":'api',
                "DEV":'http://localhost:5000/api'}




// FOR PRODUCTION
const instance=axios.create({
  baseURL:baseURL.PROD,
  timeout: 5000,
});


export default instance