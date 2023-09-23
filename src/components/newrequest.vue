<template>
  
    
    <div class="col-md-4 mx-auto">
      
     <div v-if="requestSent">
        <div class="alert alert-success" style="margin-top: 25%;" role="alert" v-if="!error">
            <h4 class="alert-heading">La sua richiesta e' stata sottomessa con successo.</h4>
            <hr>
            <p class="mb-0">Per aiuto e/o ulteriori informazioni, la preghiamo di contattare <a href="mailto:info.lab2go@gmail.com">info.lab2go@gmail.com</a></p>
        </div>
        <div v-else>
            <div class="alert alert-danger mt-6 text-center" style="margin-top: 60px" role="alert" v-if="error"> 
                    {{error}}
            </div>
        </div>
     </div>
     
      <div  v-if="!requestSent" style="padding:20px 0">
      <div class="pending d-flex justify-content-center gap-5 align-items-center" v-if="pending">
        <div class="spinner-grow text-primary" role="status"></div>
        <div class="spinner-grow text-secondary" role="status"></div>
        <div class="spinner-grow text-success" role="status"></div>
        <div class="spinner-grow text-danger" role="status"></div>
        <div class="spinner-grow text-warning" role="status"></div>
        <div class="spinner-grow text-info" role="status"></div>
        <div class="spinner-grow text-light" role="status"></div>
        <div class="spinner-grow text-dark" role="status"></div>
      </div>
      <div class="alert alert-info text-center" style="margin-top: 50px;" role="alert">
             <p class="mb-0">Per aiuto e/o ulteriori informazioni, la preghiamo di contattare <a href="mailto:info.lab2go@gmail.com">info.lab2go@gmail.com</a></p>
      </div>
      <form  @submit.prevent="doSave">
         
          <div class="alert alert-danger text-center" style="margin:0;" v-if="errSchool" role="alert">
              <span class="alert-heading">{{ errSchool }}</span>
          </div>
          
          <br><br>
          <h2>Istituto</h2>
          <hr>
          <div class="col mb-6">
              <label>*Codice Meccanografico</label>
              <div class="row mb-3">
                  <div class="col-6">
                    
                      <input type="text" class="form-control" :class="{'is-invalid':vschool$.sc_tab_code.$error,'is-valid':!vschool$.sc_tab_code.$invalid}"  maxlength="10" v-model="schoolForm.sc_tab_code">
                 
                      <div class="invalid-feedback" v-for="(error, index) of vschool$.sc_tab_code.$errors" :key="index">
                        {{ error.$message }}
                      </div>
                      <div v-if="working" >Sto cercando...</div>
                     
                  </div>
                  <div class="col">
                      <button id="btFindCode" @click="searchCode" :disabled="!schoolForm.sc_tab_code" type="button" class="btn btn-primary w-100"><i class="fa-solid fa-magnifying-glass"></i>&nbsp;cerca</button>
                  </div>
              </div>
          </div>
          <div class="col mb-3">
              <label>Istituto Principale</label>
              <input type="text"  class="form-control bg-light"  :value="schoolForm.sc_tab_istituto" readonly>
          </div>
          <div class="col mb-3">
              <label>Plesso/Scuola</label>
              <select id="sc-tab-plesso" class="form-select" @change="onSchoolChanged($event.target.value)">
                  <option v-for="s in schools" :value="s.sc_tab_plesso">{{ s.sc_tab_plesso }}
                  </option>
              </select>
              <span class="error"></span>
          </div>
          <div class="col mb-3">
              <label>Codice Meccanografico Plesso/Scuola</label>
              <input type="text"  class="form-control bg-light"  :value="schoolForm.sc_tab_plesso_code" readonly>
          </div>
          <div class="col mb-3">
              <label>Indirizzo</label>
              <input type="text" class="form-control disabled bg-light" :value="schoolForm.sc_tab_indirizzo" readonly>
          </div>
          <div class="col mb-3">
              <label>Telefono</label>
              <input type="text"  class="form-control bg-light" :value="schoolForm.sc_tab_telefono" readonly>
          </div>
          <div class="col mb-3">
              <label>Indirizzo mail</label>
              <input type="text"   class="form-control bg-light" :value="schoolForm.sc_tab_email" readonly>
          </div>
          <br>
          <h2>Richiedente</h2>
          <hr>
          <div class="row mb-3">
              <div class="col">
                  <label>*Nome</label>
                  <input type="text" class="form-control" :class="{'is-invalid':v$.name.$error,'is-valid':!v$.name.$invalid}"  v-model="userForm.name" >
                  <div class="invalid-feedback" v-for="(error, index) of v$.name.$errors" :key="index">
                        {{ error.$message }}
                  </div>
              </div>
              <div class="col">
                  <label>*Cognome</label>
                  <input type="text"  class="form-control" :class="{'is-invalid':v$.surname.$error,'is-valid':!v$.surname.$invalid}"  v-model="userForm.surname" >
                  <div class="invalid-feedback" v-for="(error, index) of v$.surname.$errors" :key="index">
                        {{ error.$message }}
                  </div>
              </div>
          </div>
          <div class="mb-3">
              <label>*Indirizzo mail</label>
              <input type="text" name="usr_email" class="form-control" :class="{'is-invalid':v$.email.$error,'is-valid':!v$.email.$invalid}" data-desc="indirizzo mail" v-model="userForm.email">
              <div class="invalid-feedback" v-for="(error, index) of v$.email.$errors" :key="index">
                        {{ error.$message }}
            </div>
          </div>
          <div class="mb-3">
              <label>Ulteriori Indirizzo mail</label>
              <input type="text" name="usr_email_alt" class="form-control" :class="{'is-invalid':v$.emailAlt.$error,'is-valid':!v$.emailAlt.$invalid && userForm.emailAlt}"  v-model="userForm.emailAlt">
              <div class="invalid-feedback" v-for="(error, index) of v$.emailAlt.$errors" :key="index">
                        {{ error.$message }}
            </div>
          </div>
        
          <div class="col-md-6">
              <h4>Discipline</h4>
              <hr>
              <div class="mb-3">
                  <label>Prima preferenza</label>
                  <select  class="form-select" v-model="selectedDisci1" :class="{'is-invalid':!selectedDisci1 && submitted }" >
                      <option value="">Nessuna</option>
                      <option v-for="d in disciList1"  :value="d" >{{d.text}}</option>
                  </select>
                  <div class="invalid-feedback">
                        Disciplina non selezionata
                  </div>
              </div>
              <div class="mb-3">
                  <label>Seconda preferenza</label>
                  <select class="form-select" v-model="selectedDisci2" :disabled="!selectedDisci1">
                      <option value="">Nessuna</option>
                      <option v-for="d in disciList2" :value="d" >{{d.text}}</option>
                  </select>
              </div>
              <div class="mb-3">
                 
                  <label>Terza preferenza</label>
                  <select class="form-select" v-model="selectedDisci3" :disabled="!selectedDisci1" >
                      <option value="">Nessuna</option>
                      <option v-for="d in disciList3" :value="d" >{{d.text}}</option>
                  </select>
              </div>
          </div>
          <div class="mb-3">
              <label>Note</label>
              <textarea id="notes" class="form-control" style="resize: none;" v-model="userForm.notes" rows="5" cols="33"></textarea>
              <span class="error"></span>
          </div>
          
          <button type="submit" class="btn btn-primary w-100" >Invia richiesta</button>
   
      </form>
    </div>
  </div>

</template>

<script setup>
import { reactive,ref,computed } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required,minLength,email,helpers } from '@vuelidate/validators'


import useSchool from '@/composables/school.js'
import useRequest from '@/composables/request.js'

/*import Img1 from '@/images/image1.png'
import Img2 from '@/images/image2.png'
import Img3 from '@/images/image3.png'
import Img4 from '@/images/image4.png'
import Img5 from '@/images/image5.png'
import Img6 from '@/images/image6.png'




const images=[Img1,Img3,Img2,Img5,Img4,Img6]*/


const requestSent=ref(false)
const {getSchoolInfo, schools, working, error:errSchool}=useSchool()

const {saveRequest,error:errRequest,pending}=useRequest()
let schoolForm=reactive({"sc_tab_code":""})
let userForm=reactive({"name":"","surname":"","email":"","emailAlt":"","discipline":[],"notes":""})
//init campi form dati scuola
const schoolInit={"usr_email_alt":"","usr_email":"","sc_tab_istituto":"","sc_tab_plesso":"","sc_tab_plesso_code":"","sc_tab_email":"","sc_tab_indirizzo":"","sc_tab_telefono":""}

const customRequired=helpers.withMessage("Il campo non è valido",required)
const customEmail=helpers.withMessage("Il campo non è valido",email)


const validateRule=(value,regex)=>{
   
    if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return new RegExp(regex,"i").test(value)
}

const namesurname=(value)=>validateRule(value,"^[a-zA-Z\\s]+$")
const multiEmail=(value)=>validateRule(value,"^[\\W]*([\\w+\\-.%]+@[\\w\\-.]+\\.[A-Za-z]{2,4}[\\W]*,{1}[\\W]*)*([\\w+\\-.%]+@[\\w\\-.]+\\.[A-Za-z]{2,4})[\\W]*$")


const curstomNameRule=helpers.withMessage("Il campo non è valido",namesurname)
const customMultiEmail=helpers.withMessage("Il campo non è valido",multiEmail)
const customMinLength=helpers.withMessage("Il campo deve essere di almeno 10 caratteri",minLength(10))


const submitted=ref(false)

const rules = {
      name: { customRequired,curstomNameRule }, // Matches state.firstName
      surname: { customRequired,curstomNameRule }, // Matches state.lastName
      email: { customRequired, customEmail }, // Matches email
      emailAlt: { customMultiEmail }
    }


const schoolRule={
  sc_tab_code:{ customRequired, minLength: customMinLength }
}

const v$ = useVuelidate(rules, userForm)
const vschool$=useVuelidate(schoolRule, schoolForm)



const formIsValid=async()=>{

  
  const userValid   = await v$.value.$validate() 
  const schoolValid = await vschool$.value.$validate()
    
  return userValid && schoolValid && schools.value.length && selectedDisci1.value

}

const doSave=async ()=>{

  submitted.value=true
  let _formIsValid=await formIsValid()
  if(!_formIsValid ) return

  userForm.discipline.length=0
  userForm.discipline.push(selectedDisci1.value.text)
  if(selectedDisci2.value) userForm.discipline.push(selectedDisci2.value.text)
  if(selectedDisci3.value) userForm.discipline.push(selectedDisci3.value.text)

  let emailAlt=userForm.emailAlt
  if(emailAlt.length){

    emailAlt=emailAlt.split(",")
    emailAlt=new Set([userForm.email,...emailAlt])
    emailAlt=Array.from(emailAlt)
    emailAlt.splice(emailAlt.indexOf(userForm.email),1)
    
  }

  const userFormCpy=Object.assign({},userForm)
  userFormCpy.emailAlt=emailAlt
  requestSent.value=false
  saveRequest({school:schoolForm,user:userFormCpy}).then(_=>{
    requestSent.value=true
  })

}


const discipline=[
  {"value":1,"text":"Biologia Animale"},
  {"value":2,"text":"Biologia Vegetale"},
  {"value":3,"text":"Chimica"},
  {"value":4,"text":"Fisica"},
  {"value":5,"text":"Musei Scientifici"},
  {"value":6,"text":"Robotica"},
  {"value":7,"text":"Scienze della Terra"} ]

const selectedDisci1=ref("")
const selectedDisci2=ref("")
const selectedDisci3=ref("")

const disciList1=computed(()=>{
  return discipline.filter(d=>d.value!=selectedDisci2.value?.value && d.value!=selectedDisci3.value?.value)
})

const disciList2=computed(()=>{
  return discipline.filter(d=>d.value!=selectedDisci1.value.value && d.value!=selectedDisci3.value?.value)
})

const disciList3=computed(()=>{
  return discipline.filter(d=>d.value!=selectedDisci1.value.value && d.value!=selectedDisci2.value?.value)
})

const onSchoolChanged=(plesso)=>{

  let school=schools.value.find(s=>s.sc_tab_plesso==plesso)
  showSchoolInfo(school)
}

const showSchoolInfo=(school)=>{
  
  school = school || schoolInit
  Object.assign(schoolForm,school)
  //reso necessario cambiare nome per evitare problemi con le API del server
  if(school && school.sc_tab_istituto_code)
  {
    schoolForm.sc_tab_code=school.sc_tab_istituto_code
  }
}

const searchCode=async ()=>{
  
  await vschool$.value.sc_tab_code.$validate()
  if(vschool$.value.sc_tab_code.$errors.length>0) { return }
  
  getSchoolInfo(schoolForm.sc_tab_code).then(_=>{
      showSchoolInfo(schools.value[0])
  })
}

const error=computed(()=>{
    return errRequest.value || errSchool.value ? "Spiacenti, si è verificato un errore":false
})

</script>

<style scoped>
.pending{
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(80, 80, 80, 0.7);
  z-index: 1000;
}
</style>