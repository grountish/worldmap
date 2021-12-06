import Vue from 'vue'
import slugify from 'slugify'
import filesize from 'filesize'

import { kebabCase } from 'lodash'

Vue.filter('filesize', (val) => filesize(val))
Vue.filter('kebab', (string) => kebabCase(string))
Vue.filter('slugify', (string) => slugify(string.toLowerCase()))
Vue.filter('capitalize', (string) => string[0].toUpperCase() + string.slice(1))

Vue.filter('number', (val, params = {}) => val.toLocaleString('en-US', params))
Vue.filter('percent', (val) => val.toLocaleString('en-US', { style: 'percent' }))
Vue.filter('currency', (val, params = {}) => val.toLocaleString('en-US', { style: 'currency', currency: 'USD', ...params }))
Vue.filter('date', (val, params = {}) => val && new Date(val).toLocaleDateString('en-US', params))
