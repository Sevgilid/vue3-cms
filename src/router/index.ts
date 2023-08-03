import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系: path => component
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      name: 'main',
      path: '/main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/notFound/notFound.vue')
    }
  ]
})
// 1.获取所有的路由
// const localRoutes = [
//   {
//     path: '/main/analysis/overview',
//     component: () => import('../views/main/analysis/overview/overview.vue')
//   },
//   {
//     path: '/main/analysis/dashboard',
//     component: () => import('../views/main/analysis/dashboard/dashboard.vue')
//   },
//   {
//     path: '/main/system/user',
//     component: () => import('../views/main/system/user/user.vue')
//   },
//   {
//     path: '/main/system/role',
//     component: () => import('../views/main/system/role/role.vue')
//   }
// ]
// // 2.动态的添加路由
// router.addRoute('main', localRoutes[0])

// 导航守卫
router.beforeEach((to) => {
  // 只有登录成功(token), 才能真正进入到main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }

  // 如果是进入到main
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
