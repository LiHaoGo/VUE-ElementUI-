import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/loginOrRegister'
  },
  {
    path: '/loginOrRegister',
    name: 'LoginOrRegister',
    component: () => import( /* webpackChunkName: "about" */ '../views/loginOrRegister/LoginOrRegister.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "about" */ '../views/login/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/index',
    meta:{title:'首页'},

    component: () => import( /* webpackChunkName: "about" */ '../views/home/Home.vue'),
    children: [{
        path: '/index', //首页
        name: 'Index',
        meta:{title:'首页'},
        component: () => import( /* webpackChunkName: "about" */ '../views/home/index/index.vue')
      },
      {
        path: '/stats', //数据统计
        name: 'Stats',
        meta:{title:'数据统计'},
        component: () => import( /* webpackChunkName: "about" */ '../views/home/stats/index.vue')
      },
      {
        path: '/wms', //信息管理
        name: 'Wms',
        meta:{title:'信息管理'},
        component: () => import( /* webpackChunkName: "about" */ '../views/home/wms/index.vue'),
        children: [
          {
            path: '/wms/list', //列表展示
            name: 'wmsList',
            meta:{title:'列表展示'},
            component: () => import( /* webpackChunkName: "about" */ '../views/home/wms/list.vue')
          }
        ]
      },
      {
        path: '/user', //用户管理
        name: 'User',
        component: () => import( /* webpackChunkName: "about" */ '../views/home/user/index.vue'),
        meta:{title:'用户管理'},
        children: [
          {
            path: '/user/stats', //用户统计
            name: 'userStats',
            component: () => import( /* webpackChunkName: "about" */ '../views/home/user/stats.vue'),
            meta:{title:'用户统计'},
          },{
            path: '/user/role', //角色统计
            name: 'userRole',
            component: () => import( /* webpackChunkName: "about" */ '../views/home/user/role.vue'),
            meta:{title:'角色统计'},
          }
          
        ]
      },{
        path: '/personcenter',
        name: 'Personcenter',
        meta:{title:'个人中心'},
        component: () => import( /* webpackChunkName: "about" */ '../views/home/personcenter/index.vue')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})
//路由拦截(路由守卫) ：路由跳转的时候做什么
router.beforeEach(function(to,from,next){
  // 获取到本地存储是否有username，如果没有就跳转到login
  console.log(!localStorage.getItem('isLogin'));
 if(!localStorage.getItem('isLogin')){
  if(to.path !=='/loginOrRegister'){
    // 如果页面不是登录页，就跳转到登录页
    next('/loginOrRegister')
  }
 }
// 如果没有就直接跳到下一个处理
 next()
})
export default router