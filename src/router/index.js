import Vue from 'vue'
import Router from 'vue-router'
import Gallery from '@/components/Gallery.vue'
import Item from '@/components/Item.vue'
import Authors from '@/components/Authors.vue'
import Museums from '@/components/Museums.vue'
import How from '@/components/How.vue'
import FAQ from '@/components/FAQ.vue'
import Profile from '@/components/Profile.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/gallery',
      name: 'Gallery',
      component: Gallery
    },
    {
      path: '/gallery/:item',
      name: 'GalleryItem',
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
