import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '@/components/welcome'
import Upload from '../components/upload'
import XFAudio from '../components/xfAudio'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
		{
			path: '/upload',
			name: 'upload',
			component: Upload
		},
		{
			path: '/xfAudio',
			name: 'xfAudio',
			component: XFAudio
		}
		
  ]
})
