import Cookie from "js-cookie";
export default {
    state: {
        isCollapse: false,
        // 面包屑
        tabList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            },
        ],
        // 定义动态路由
        menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            if (val.name !== 'home') {
                const index = state.tabList.findIndex(item => item.name === val.name)
                if (index === -1) {
                    state.tabList.push(val)
                }
            }
        },
        colseTab(state, val) {
            const index = state.tabList.findIndex(item => 
                item.name === val.name
            )
            state.tabList.splice(index, 1)
        },
        // 退出登录清空面包屑tabs
        clearTab(state, val){
            state.tabList = [
                {
                    path: "/",
                    name: "home",
                    label: "首页",
                    icon: "s-home",
                    url: "Home/Home",
                },
            ]
        },
        setMenu(state, val){
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        // 退出登陆时，同时删除Cookie和vuex中的menu记录
        clearMenu(state, val){
            state.menu = val
            Cookie.remove('token')
            Cookie.remove('menu')
        },
        addMenu(state, router) {
            if (!Cookie.get('token')) {
                return
            }
            // 判断是否有menu
            if (!Cookie.get('menu')) {
                console.log('cookie中不含有menu,请登录！')
                return
            }
            // 保存路由表
            state.menu = JSON.parse(Cookie.get('menu'))
            const myMenu = []
            // 遍历路由，并将其push到路由表中，其实就是给state.menu动态导入组件
            state.menu.forEach(item => {
                if (item.children) {// 含子路由
                    item.children = item.children.map( val => {
                        // 动态导入组件
                        val.component = () => import(`../views/${val.url}`)
                        return val
                    } )
                    myMenu.push(...item.children)
                } else {// 无子路由
                    item.component = () => import(`../views/${item.url}`)
                    myMenu.push(item)
                }
            });
            console.log(myMenu, '获取当前角色路由');
            // 将路由表添加到路由中
            myMenu.forEach( item => {
                router.addRoute('Main', item)
            })
        }
    }
}