//elementos de antDesing
import Vue from 'vue';

import 'ant-design-vue/dist/antd.css'
import Layout from 'ant-design-vue/lib/layout'
import LayoutContent from 'ant-design-vue/lib/layout'

import Calendar from 'ant-design-vue/lib/calendar'
import Badge from 'ant-design-vue/lib/badge'
import ConfigProvider from 'ant-design-vue/lib/config-provider'
import Notification from 'ant-design-vue/lib/notification'



Vue.component('antLayout', Layout)
Vue.component('antLayoutContent', LayoutContent)

Vue.component('antCalendar', Calendar)
Vue.component('antBadge', Badge)
Vue.component('antConfigProvider', ConfigProvider)
Vue.component('antNotification', Notification)

