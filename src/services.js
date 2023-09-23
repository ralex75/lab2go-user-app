import axios from 'axios'

 
const baseURL={"PROD":'/lab2go/richieste/api',
                "DEV":'/api'}




// FOR PRODUCTION
const instance=axios.create({
  baseURL:baseURL.PROD,
  timeout: 5000,
});


export default instance