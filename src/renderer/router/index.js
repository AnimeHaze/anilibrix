import Vue from 'vue'
import Router from 'vue-router'

import ads from './ads'
import blank from './blank'
import video from './video'
import release from './release'
import catalog from './catalog'
import account from './account'
import releases from './releases'
import favorites from './favorites'

Vue.use(Router)

// Suppress router push errors
// Overwrite native push function
const push = Router.prototype.push
Router.prototype.push = function (location) {
  push.call(this, location).catch(() => null)
}

const router = new Router({
  routes: [].concat(
    ads,
    blank,
    video,
    release,
    catalog,
    account,
    releases,
    favorites
  )
})

export default router
