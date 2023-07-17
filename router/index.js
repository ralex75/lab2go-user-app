import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SchoolIndex from '../components/school/SchoolIndex'
import CreateSchool from '@/components/school/SchoolCreate'
import EditSchool from '@/components/school/SchoolEdit'
import SchoolDetails from '@/components/school/SchoolDetails'
import StudentCreate from '@/components/students/StudentCreate'
import RequestEdit from '@/components/request/RequestEdit'
import storage from '@/composables/storage'
import userHelper from '@/composables/user.helper'

const routeGuard=(to, from, next)=>{
  
  let excludeRoutes=['login.index','signup.index','home.index']
  
  if(!excludeRoutes.some(r=>r==to.name))
  {
    let isAuthenticated= storage.get("session") ? true : false

    if(!isAuthenticated) 
    {
      return next('/login'); //go to '/login';
    }
  } 
 
  next(); //enter into the route
  
}

const {isAdmin}=userHelper()


const routes = [
  
  {
    path: '/',
    name: 'home.index',
    component: HomeView,
    meta: {
      title: "Home Page",
      subtitle: "",
      description:"home page"
   },
  },
  {
    path:'/signup',
    name:'signup.index',
    component: ()=>import('@/components/Signup.vue'),
    meta: {
      title: "Registrazione",
      subtitle: "",
   },
  },
  {
    path:'/login',
    name:'login.index',
    component: ()=>import('@/components/Login.vue'),
    meta: {
      title: "Accedi",
      subtitle: "",
   },
  },
  {
    path:'/logout',
    name:'logout.index',
    component: ()=>import('@/components/Logout.vue') 
  },
  {
    path:'/accounts',
    name:'useraccount.index',
    component: ()=>import('@/components/UserAccount.vue'),
    meta: {
      title: "Lista account",
      subtitle: "",
   },
  },
  {
    path: '/requests',
    name: 'requests.index',
    component: ()=>import('@/components/request/RequestIndex.vue'),
    meta: {
     
        title: "Richieste",
        subtitle:"",
        description:"lista delle richieste"
     
    }
  },
  {
    path: '/requests/add',
    name: 'requests.add',
    component: ()=>import('@/components/request/user/RequestAdd.vue'),
    meta: {
     
        title: "Nuova Richiesta",
        subtitle:"",
        description:""
     
    }
  },
  {
    path: '/requests/:id/',
    name: 'requests.edit',
    component: RequestEdit,
    
    meta: {
     
        title: "Richiesta",
        subtitle:"",
        description:""
     
    }
  },
  {
    path: '/schools',
    name: 'schools.index',
    component: SchoolIndex,
  
    meta: {
     
        title: "Scuole",
        subtitle:"",
        description:"lista delle scuole"
     
    }
  },
  {
    path: '/schools/:id/:year?',
    name: 'school.details',
    component: SchoolDetails,
    props:true,
  },
  {
    path: '/schools/add',
    name: 'schools.add',
    component: CreateSchool,
    meta: {
      title: "Nuova scuola",
      description:"inserisci una nuova scuola"
    }
  },
  {
    path: '/schools/:id/edit',
    name: 'schools.edit',
    component: EditSchool,
    props:true,
    meta: {
      title: "Modifica scuola",
      description:"In questa pagina puoi modificare i dati della scuola selezionata"
   }
  },
  {
    path: '/schools/:id/students/add',
    name: 'students.add',
    component: StudentCreate,
    props:true,
  },
  {
      path: '/about',
      name: 'about',
      component:AboutView,
      meta: {
        title: "About Page",
        subtitle: "",
        description:""
    }
   },
   { path: '/:pathMatch(.*)*', redirect: '/' },
  
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
   //{ component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue') }
  
]




const router = createRouter({
  history: createWebHistory(process.env.BASE_UR),
  routes
})

router.beforeEach(routeGuard)



export default router
