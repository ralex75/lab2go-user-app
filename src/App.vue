<template>
  <div class="container-fluid">

    <div style="width: 80%;margin:0 auto;text-align: center;">
      <div style="display: flex;flex-direction: row;justify-content: center;gap:30px;margin:10px 0;">
        <img v-for="img in images" :src="img" style="height:100px;" class="rounded" alt="...">
      </div>
      <h2 style="width: 100%;margin-top: 20px;">Richieste di partecipazione a LAB2GO A.S 2023-2024</h2>
      <a :href="policyURL.PROD" target="_blank">Privacy Policy</a>
    </div>

    <section v-if="settings">
      <newrequest v-if="allowEditRequest" />
      <ednrequest v-else />
    </section>
  </div>
</template>

<script setup>

import Img1 from '@/images/image1.png'
import Img2 from '@/images/image2.png'
import Img3 from '@/images/image3.png'
import Img4 from '@/images/image4.png'
import Img5 from '@/images/image5.png'
import Img6 from '@/images/image6.png'




const images=[Img1,Img3,Img2,Img5,Img4,Img6]

import newrequest from '@/components/newrequest.vue'
import ednrequest from '@/components/endrequest.vue'
import { onMounted,ref } from 'vue';
import useAppSettings from '@/composables/settings.composable'


const {allowEditRequest,getAllSettings,settings}=useAppSettings()

const policyURL=ref({"PROD":"/lab2go/admin/api/policy","DEV":"http://localhost:3000/policy"})

onMounted(getAllSettings)


</script>