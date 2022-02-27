import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInIdentifier from "@/views/SignInIdentifier";
import firebase from "firebase";
import Logout from "@/views/Logout";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/AppLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: HomeView,
        meta: {
          auth: true
        },
      },
      {
        path: '/logout',
        name: 'logout',
        component: Logout,
        meta: {
          auth: true
        }
      },
      {
        path: '/customers',
        name: 'customers',
        component: () => import('@/views/Customer.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: '/about',
        name: 'about',
        component: () => import( '../views/AboutView.vue'),
        meta: {
          auth: true
        }
      }
    ]
  },
  {
    path: '/auth',
    redirect: '/auth/login',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        redirect: '/auth/login/identifier',
        component: () => import('@/layouts/AuthLayoutLogin.vue'),
        children: [
          {
            path: 'identifier',
            name: 'signin',
            component: SignInIdentifier,

          }, {
            path: 'password/:email',
            name: 'password',
            component: () => import('@/views/SignInPassword.vue'),

          }
        ]
      },
      {
        path: '/register',
        name: 'signup',
        component: () => import('@/views/SignUp.vue'),

      }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        next('/auth');
      } else {
        next();
      }
    });
  } else {
    next();
  }
})

export default router
