import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

// 1.安装插件
Vue.use(VueRouter) 

// 2.创建router
const routes = [
  {
    path: '/',
    component: Layout,
    hidden: true,
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    component: Layout,
    open: true,
    meta: { title: 'Dashboard', icon: 'mdi-monitor-dashboard' },
    children: [
      {
        path: '',
        meta: { title: 'Dashboard'},
        component: () => import('@/views/dashboard/index'),
      },
    ]
  },  
  {
    path: '/article',
    component: Layout,
    open: false,
    meta: { title: 'Artcile', subtitle: 'Content Management', icon: 'mdi-book-open-outline' },
    children: [
      {
        path: 'create',
        meta: { title: 'Create', icon: 'mdi-pencil' },
        component: () => import('@/views/article/create')
      },
      {
        path: 'management',
        meta: { title: 'Management', icon: 'mdi-view-list' },
        component: () => import('@/views/article/management')
      },      
      {
        path: 'edit/:id',
        hidden: true,
        meta: { title: 'Edit', icon: 'mdi-square-edit-outline' },
        component: () => import('@/views/article/edit')
      },
    ]
  },
  {
    path: '/login',
    hidden: true,
    meta: { title: 'Login' },
    component: () => import('@/views/login/index')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router