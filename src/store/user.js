// 保存用户信息
export default {
    state: {
        // 登录用户信息
        userLoginData: {
            // 选择语言
            language: '简体中文',
            time: '',
            addr: '',
            name: '',
            role: '普通用户'
        },
        // 保存用户按钮权限信息
        perms: null
    },
    mutations: {
        setLoginData(state, val){
            // 设置登录时的语言
            state.userLoginData.language = val.language
            // 获取当前时间
            const time = new Date()
            state.userLoginData.time = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()
            // state.userLoginData.addr = val.address.trim().split('：')[2]//使用外部获取地址的端口
            state.userLoginData.addr = val.address// 通过mock生成的
            state.userLoginData.name = val.username.trim()[0].toUpperCase() + val.username.substring(1)
            // 通过是否包含用户管理判断角色
            val.menu.forEach(item => {
                if (item.name === 'more') {
                    state.userLoginData.role = '超级管理员'
                }
            });
            window.sessionStorage.setItem('userLoginData', JSON.stringify(state.userLoginData));
        },
        clearLoginData(state, i18n) {
            // 重置登录信息
            state.userLoginData = {
                // 选择语言
                language: '简体中文',
                time: '',
                addr: '',
                name: '',
                role: '普通用户'
            }
            // 国际化也要重置
            i18n.locale = 'zh'
            window.sessionStorage.removeItem('userLoginData');
        },
        setLanguage(state, val) {
            state.userLoginData.language = val
        },

        // 获取按钮权限
        setPerms(state, perms) {
            state.perms = perms
            // 防止刷新状态丢失
            window.sessionStorage.setItem('perms', JSON.stringify(state.perms));
        },
        // 清理按钮权限
        clearPerms(state, perms) {
            state.perms = null
            window.sessionStorage.removeItem('perms');
        }
    }
}