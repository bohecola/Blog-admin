import router from './router'
import NProgress from 'nprogress'
import { getToken } from '@/utils/auth'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false
})

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  
  // set page title
  document.title = to.meta.title + ' - Bohecola\'s Blog'

  // determine whether the user has logged in
  const hasToken = getToken() !== null ? true : false

  if (hasToken) {
    if(to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})