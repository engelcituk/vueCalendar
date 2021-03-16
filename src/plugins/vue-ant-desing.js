//elementos de antDesing
import Vue from 'vue';

import 'ant-design-vue/dist/antd.css'
import Calendar from 'ant-design-vue/lib/calendar'
import Badge from 'ant-design-vue/lib/badge'
import ConfigProvider from 'ant-design-vue/lib/config-provider'


Vue.component('antCalendar', Calendar)
Vue.component('antBadge', Badge)
Vue.component('antConfigProvider', ConfigProvider)
