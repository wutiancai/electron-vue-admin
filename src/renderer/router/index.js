import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        meta: {title: '运行管理', icon: 'el-icon-collection-tag', keepAlive: true},
        children: [
            {
                path: 'runing',
                name: 'runing',
                component: () => import('@/views/runing/runing'),
                meta: {title: '运行管理', icon: 'el-icon-open', keepAlive: true}
            }
        ]
    },
    // {
    //     path: '/datapack1',
    //     component: Layout,
    //     children: [
    //         {
    //             path: 'datapack',
    //             name: 'datapack',
    //             // component: () => import('@/views/datapack/datapack'),
    //             meta: {title: '文件', icon: 'el-icon-folder', keepAlive: true}
    //         }
    //     ]
    // },
    {
        path: '/datapack2',
        component: Layout,
        children: [
            {
                path: 'datapack',
                name: 'datapack',
                component: () => import('@/views/annotation/index'),
                meta: {title: '工具', icon: 'el-icon-s-tools', keepAlive: true}
            }
        ]
    },
    // {
    //     path: '/datapack3',
    //     component: Layout,
    //     children: [
    //         {
    //             path: 'datapack',
    //             name: 'datapack',
    //             // component: () => import('@/views/datapack/datapack'),
    //             meta: {title: '操作', icon: 'el-icon-s-cooperation', keepAlive: true}
    //         }
    //     ]
    // },
    // {
    //     path: '/datapack4',
    //     component: Layout,
    //     children: [
    //         {
    //             path: 'datapack',
    //             name: 'datapack',
    //             // component: () => import('@/views/datapack/datapack'),
    //             meta: {title: '运行控制', icon: 'el-icon-s-operation', keepAlive: true}
    //         }
    //     ]
    // },
    {
        path: '/datapack5',
        component: Layout,
        meta: {title: '建模', icon: 'el-icon-s-data', keepAlive: true},
        children: [
            {
                path: 'defect_conf',
                name: 'defect_conf',
                component: () => import('@/views/templateConf/defect_conf'),
                meta: {title: '缺陷处理', icon: '', keepAlive: true}
            },
            {
                path: 'datapack1',
                name: 'datapack1',
                component: () => import('@/views/templateConf/template_config'),
                meta: {title: '模板配置', icon: '', keepAlive: true}
            }
        ]
    },
    {
        path: '/datapack6',
        component: Layout,
        children: [
            {
                path: 'datapack',
                name: 'datapack',
                // component: () => import('@/views/datapack/datapack'),
                meta: {title: '用户管理', icon: 'el-icon-s-custom', keepAlive: true}
            }
        ]
    },
    // {
    //   path: '/train',
    //   component: Layout,
    //   redirect: '/task_train',
    //   name: 'Example',
    //   meta: { title: '模型管理', icon: 'el-icon-set-up' },
    //   children: [
    //     {
    //       path: 'task_train',
    //       name: 'task_train',
    //       // component: () => import('@/views/table/index'),
    //       component: () => import('@/views/task/task_train'),
    //       meta: { title: '模型训练', icon: 'table', keepAlive: true}
    //     },
    //     {
    //       path: 'task_detection',
    //       name: 'task_detection',
    //       // component: () => import('@/views/tree/index'),
    //       component: () => import('@/views/task/task_detection'),
    //       meta: { title: '模型评测', icon: 'tree', keepAlive: true}
    //     }
    //   ]
    // },

    // {
    //   path: '/deployment',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'deployment_model',
    //       name: 'Form',
    //       component: () => import('@/views/deployment/deployment_model'),
    //       meta: { title: '模型部署', icon: 'el-icon-mouse', keepAlive: true}
    //     }
    //   ]
    // },

    // {
    //   path: '/form',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'index',
    //       name: 'Form',
    //       component: () => import('@/views/form/index'),
    //       meta: { title: '帮助', icon: 'el-icon-warning-outline'}
    //     }
    //   ]
    // },
    // {
    //   path: '/form1',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'index1',
    //       name: 'Form1',
    //       component: () => import('@/views/form/index'),
    //       meta: { title: '关于', icon: 'el-icon-more' }
    //     }
    //   ]
    // },
    /* {
       path: '/form',
       component: Layout,
       children: [
         {
           path: 'index',
           name: 'Form',
           component: () => import('@/views/form/index'),
           meta: { title: 'Form', icon: 'form' }
         }
       ]
     },*/



    // 404 page must be placed at the end !!!
    {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

// export default router
export default new Router({
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})
