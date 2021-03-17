<template>
    <div>        
        <antConfigProvider :locale="locale">  <!-- idioma del calendar en esp -->
            <antCalendar>
                <ul slot="dateCellRender" slot-scope="value" class="events">
                <li v-for="item in getListData(value)" :key="item.content">
                    <antBadge :status="item.type" :text="item.content" />
                </li>
                </ul>
                <template slot="monthCellRender" slot-scope="value">
                <div v-if="getMonthData(value)" class="notes-month">
                    <section>{{ getMonthData(value) }}</section>
                    <span>Backlog number</span>
                </div>
                </template>
            </antCalendar>
        </antConfigProvider>
    </div>  
</template>
<script>

import {mapState, mapActions} from 'vuex'
import esEs from 'ant-design-vue/lib/locale-provider/es_ES'
import * as moment from 'moment'

export default {
    async mounted(){  
      // console.log( this.selectedDate.month() )    
      const payload = { month: this.selectedDate.month(), year: this.selectedDate.year() }
      await this.fetchEvents( payload ) 
    },
    data() {
      return {
        locale: esEs,
        selectedDate: moment(),
        mode: 'month',
        modalVisible: false,
      }
    },
    computed:{
      ...mapState('calendar',['eventsData']),                    
    },
    methods: {
      ...mapActions('calendar',['fetchEvents']),
    getListData(value) {
      let listData
      if( value.month() === this.selectedDate.month() ){
        const day = value.date() 
        listData = this.eventsData[day]       
      }

      return listData || []
    },

    getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
    },
  },  
}
</script>
<style scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
</style>
