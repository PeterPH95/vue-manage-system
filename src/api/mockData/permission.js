import Mock from 'mockjs'
export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body)
        // 先判断用户是否存在
        // 判断账号和密码是否对应
        if (username === 'admin') {
            return {
                code: 20000,
                data: {
                    menu: [{
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'Home.vue'
                        },
                        {
                            path: '/mall',
                            name: 'mall',
                            label: '商品管理',
                            icon: 'news',
                            url: 'Mall.vue'
                        },
                        {
                            path: '/user',
                            name: 'user',
                            label: '用户管理',
                            icon: 'user',
                            url: 'User.vue'
                        },
                        {
                            label: '其他',
                            name: 'more',
                            icon: 'guide',
                            children: [{
                                    path: '/page1',
                                    name: 'page1',
                                    label: '页面1',
                                    icon: 'grape',
                                    url: 'PageOne'
                                },
                                {
                                    path: '/page2',
                                    name: 'page2',
                                    label: '页面2',
                                    icon: 'watermelon',
                                    url: 'PageTwo'
                                }
                            ]
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if (username !== '') {
            return {
                code: 20000,
                data: {
                    menu: [{
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'Home.vue'
                        },
                        {
                            path: '/mall',
                            name: 'mall',
                            label: '商品管理',
                            icon: 'news',
                            url: 'Mall.vue'
                        },
                        {
                            path: '/user',
                            name: 'user',
                            label: '用户管理',
                            icon: 'user',
                            url: 'User.vue'
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message: '密码错误'
                }
            }
        }

    },

    getBtn: config => {
        const { username, password } = JSON.parse(config.body)
        if (username === 'admin') {
            return {
                code: 20000,
                data: {
                    // 权限依次为 ‘新增’ ‘编辑’ ‘删除’
                    perms:[true, true, true],
                    message: '获取成功'
                }
            }
        }else if (username !== '') {
            return {
                code: 20000,
                data: {
                    perms:[false, true, false],
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message: '密码错误'
                }
            }
        }
    },

    getAddr: params => {
        return {
            code: 20000,
            data: {
                address:"中国 福建 福州",
                message: '获取成功'
            }
        }
    }
}