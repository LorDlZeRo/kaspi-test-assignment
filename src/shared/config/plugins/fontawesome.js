// plugins/fontawesome.js
import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// Add all icons to the library so you can use them in your app
library.add(fas)

// Register the component globally
Vue.component('font-awesome-icon', FontAwesomeIcon)
