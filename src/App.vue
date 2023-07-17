<template>
  <div class="container-fluid">
      <div class="col-md-4 mx-auto">
      
        
      <div class="alert alert-success text-center" style="margin-top: 50%;" role="alert" v-if="requestSent"> 
                Richiesta inviata
      </div>
      <div v-else>
      <div class="alert alert-danger mt-6 text-center" role="alert" v-if="error"> 
              {{error}}
      </div>
      <form @submit.prevent="doSave">
         
          <br><br>
          <h2>Istituto</h2>
          <hr>
          <div class="col mb-6">
              <label>*Codice Meccanografico</label>
              <div class="row mb-3">
                  <div class="col-6">
                      <input type="text" class="form-control"  maxlength="10" v-model="schoolForm.sc_tab_code">
                      <div v-if="working" >Sto cercando...</div>
                      <span class="error"></span>
                  </div>
                  <div class="col">
                      <button id="btFindCode" @click="searchCode" type="button" class="btn btn-primary w-100"><i class="fa-solid fa-magnifying-glass"></i>&nbsp;cerca</button>
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
                  <input type="text" class="form-control"  v-model="userForm.name" >
                  <span class="error"></span>
              </div>
              <div class="col">
                  <label>*Cognome</label>
                  <input type="text"  class="form-control"  v-model="userForm.surname" >
                  <span class="error"></span>
              </div>
          </div>
          <div class="mb-3">
              <label>*Indirizzo mail</label>
              <input type="text" name="usr_email" class="form-control" data-desc="indirizzo mail" v-model="userForm.email">
              <span class="error"></span>
          </div>
          <div class="mb-3">
              <label>Ulteriore Indirizzo mail</label>
              <input type="text" name="usr_email_alt" class="form-control" data-desc="altro indirizzo mail" v-model="userForm.emailAlt">
              <span class="error"></span>
          </div>
          
          <div class="col-md-6">
              <h4>Discipline</h4>
              <hr>
              <div class="mb-3">
                  <label>Prima preferenza</label>
                  <select  class="form-select" v-model="selectedDisci1" >
                      <option v-for="d in disciList1"  :value="d" >{{d.text}}</option>
                  </select>
                  <span class="error"></span>
              </div>
              <div class="mb-3">
                  <label>Seconda preferenza</label>
                  <select class="form-select" v-model="selectedDisci2">
                      <option value="">Nessuna</option>
                      <option v-for="d in disciList2" :value="d" >{{d.text}}</option>
                  </select>
              </div>
              <div class="mb-3">
                 
                  <label>Terza preferenza</label>
                  <select class="form-select" v-model="selectedDisci3" >
                      <option value="">Nessuna</option>
                      <option v-for="d in disciList3" :value="d" >{{d.text}}</option>
                  </select>
              </div>
          </div>
          <div class="mb-3">
              <label>Note</label>
              <textarea id="notes" class="form-control" v-model="userForm.notes" rows="5" cols="33"></textarea>
              <span class="error"></span>
          </div>
          
          <button type="submit" class="btn btn-primary w-100">Invia richiesta</button>
   
      </form>
    </div>
  </div>
</div>
</template>

<script setup>
import { reactive,ref,computed } from 'vue';
import useSchool from '@/composables/school.js'
import useRequest from '@/composables/request.js'

const requestSent=ref(false)
const {getSchoolInfo, schools, working}=useSchool()

const {saveRequest,error}=useRequest()
let schoolForm=reactive({"code":""})
let userForm=reactive({"name":"","surname":"","email":"","emailAlt":[],"discipline":[],"notes":""})
const doSave=()=>{

  userForm.discipline.length=0
  userForm.discipline.push(selectedDisci1.value.text)
  if(selectedDisci2.value) userForm.discipline.push(selectedDisci2.value.text)
  if(selectedDisci3.value) userForm.discipline.push(selectedDisci3.value.text)

  saveRequest({school:schoolForm,user:userForm}).then(res=>{
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

const selectedDisci1=ref(discipline[0])
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
  Object.assign(schoolForm,school)
}

const searchCode=()=>{
  getSchoolInfo(schoolForm.sc_tab_code).then(_=>{
      showSchoolInfo(schools.value[0])
  })
}

</script>

