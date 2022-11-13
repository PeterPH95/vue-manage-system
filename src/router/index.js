import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import Mall from '../views/Mall'
import User from '../views/User'
import Main from '../views/Main'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'
import Login from '../views/Login'
import NotFound from '../views/NotFound'

Vue.use(VueRouter)

// 解决重复点击相同路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


// 路由与组件映射
const routes = [
    {
        path: '/',
        component: Main,//匹配最外层路由的地方
        name: 'Main',
        redirect: '/home',
        children: [
            // 先匹配 / 再匹配 home
            // { path: 'home', name: 'home', component: Home },//首页
            // { path: "mall", name: "mall", component: Mall },//商品
            // { path: 'user', name: "user", component: User },//用户
            // { path: 'page1', name: "page1", component: PageOne },//页面一,虽然是二级菜单也属于嵌套中路由
            // { path: 'page2', name: "page2", component: PageTwo },//页面二
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '*',
        name: '404',
        // redirect: '/404',
        component: NotFound,
        // component: () => import(`../views/NotFound`),
    }
]

// 创建路由实例
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

// 对外暴露

export default router
