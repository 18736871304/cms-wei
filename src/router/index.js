import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/vuex/store.js'

Vue.use(VueRouter);

var routes = [{
    path: "/",
    redirect: '/login',

  },
  {
    path: '/login',
    name: "登录",
    meta: {
      title: ''
    },
    component: () => import("../views/login/login.vue"),
  },


  {
    path: '/home',
    component: () => import("@/views/index/index.vue"),
    // name: '系统管理',
    iconCls: 'fa fa-home',
    children: [{
        path: '/home',
        component: () => import("@/views/home/home.vue"),
        name: '欢迎页',
      },

      // admin
      {
        path: '/admin/team/teamMan',
        component: () => import("@/views/admin/team/teamMan.vue"),
        name: '团队管理'
      },
      {
        path: '/admin/user/userunlock',
        component: () => import("@/views/admin/user/userunlock.vue"),
        name: '用户解锁'
      },
      // organ
      {
        path: '/organ/OrganManage',
        component: () => import("@/views/organ/OrganManage.vue"),
        name:'机构管理'
      },


      //authority
      {
        path: '/authority/AuthManage',
        component: () => import("@/views/authority/AuthManage.vue"),
        name:'权限管理'
      },
      {
        path: '/authority/UserAuthority',
        component: () => import("@/views/authority/UserAuthority.vue"),
        name:'用户权限'
      },
      {
        path: '/authority/PasswordManage',
        component: () => import("@/views/authority/PasswordManage.vue"),
        name:'密码管理'
      },

      // {
      //   path: '/AuthManage',
      //   component: () => import("@/views/organ/AuthManage.vue"),
      // },
      // {
      //   path: '/UserAuthority',
      //   component: () => import("@/views/organ/UserAuthority.vue"),
      // },






    ]
  },


  {
    path: '/404',
    component: () => import("@/views/404/404.vue"),
    name: '',
  },
  {
    path: '*',
    redirect: {
      path: '/404'
    }
  }

];

const router = new VueRouter({
  routes,
  mode: 'history'
  // mode: 'hash'
})


export default routes;