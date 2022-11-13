import Mock from 'mockjs'
import homeApi from './mockData/home'
import user from "./mockData/user"
import permission from './mockData/permission'

// 拦截的路径要写完整
Mock.mock('/api/home/getData', homeApi.getStatisticalData)

// 表格相关的后端接口
Mock.mock('/api/user/add', 'post', user.createUser)
Mock.mock('/api/user/edit', 'post', user.updateUser)
Mock.mock('/api/user/del', 'post', user.deleteUser)
Mock.mock(/api\/user\/getUser/, 'get', user.getUserList)

// 登陆接口拦截，获取菜单权限
Mock.mock(/permission\/getMenu/, 'post', permission.getMenu)
// 获取按钮权限
Mock.mock(/permission\/getBtn/, 'post', permission.getBtn)
// 拦截地址请求
Mock.mock(/address/, 'get', permission.getAddr)