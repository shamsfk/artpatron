import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/Admin.vue'
import Gallery from '@/components/Gallery/ItemsGallery.vue'
import Item from '@/components/Gallery/Item.vue'
import Authors from '@/components/Authors/Authors.vue'
import Museums from '@/components/Museums/Museums.vue'
import How from '@/components/How.vue'
import FAQ from '@/components/FAQ.vue'
import Profile from '@/components/Profile.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/gallery',
      name: 'ItemsGallery',
      component: Gallery
    },
    {
      path: '/gallery/:item',
      name: 'Item',
      component: Item
    },
    {
      path: '/authors',
      name: 'Authors',
      component: Authors
    },
    {
      path: '/museums',
      name: 'Museums',
      component: Museums
    },
    {
      path: '/how',
      name: 'How',
      component: How
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: FAQ
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
