<template>
    <div>        
        <antConfigProvider :locale="locale">  <!-- idioma del calendar en esp -->
            <antCalendar @select="addEvent" @panelChange="onPanelChange" :value="selectedDate" :mode="mode">
                <ul slot="dateCellRender" slot-scope="value" class="events" >
                  <li v-for="event in getListData(value)" :key="event.content">
                      <antBadge :status="event.type" :text="`${event.hour}: ${event.content}`" />                                                                                                          
                  </li>
                </ul>
                <template slot="monthCellRender" slot-scope="value">
                <div v-if="getMonthData(value)" class="notes-month">
                    <section>{{ getMonthData(value) }}</section>
                    <span>Eventos</span>
                </div>
                </template>
            </antCalendar>
        </antConfigProvider>
        <EventsModal :visible="visible" :selectedDate="selectedDate"  @addNewEvent="addNewEvent" @closeModal="closeModal"  />
        
         <SidebarDetails :selectedDate="selectedDate" @openModal="openModal"/>
    </div>  
</template>
<script>

import { mapState, mapActions } from 'vuex'
import esEs from 'ant-design-vue/lib/locale-provider/es_ES'
import * as moment from 'moment'
import EventsModal from '@/components/calendar/EventsModal'
import SidebarDetails from '@/components/calendar/SidebarDetails'


export default {
  name: 'EventsCalendar',
  components : {
    EventsModal,
    SidebarDetails
  },
  async mounted(){  
       
      const payload = { month: this.selectedDate.month(), year: this.selectedDate.year() }
      await this.fetchEvents( payload )

      const date = {  year: this.selectedDate.year() }
      await this.fetchCountEventsForYear( date ) 

    },
    data() {
      return {
        locale: esEs,
        selectedDate: moment(),
        mode: 'month',
        visible: false        
      }
    },
    computed:{
      ...mapState('calendar',['eventsData','eventsDataCountForYear']),                    
    },
    methods: {
      ...mapActions('calendar',['fetchEvents','fetchCountEventsForYear']),
      getListData(value) {
        let listData
        if( value.month() === this.selectedDate.month() ){
          const day = value.date() 
          listData = this.eventsData[day]       
        }

        return listData || []
      },

      getMonthData(value) {
        return this.eventsDataCountForYear[ value.month() ]
      },      
      async addEvent (date) {
        const copySelectedDate = this.selectedDate;
        this.selectedDate = date
        if (this.mode === 'month' ) {            
            this.openSidebar()            
        } else {
            if ( copySelectedDate.month() !== date.month() ) {
              const payload = { month: date.month(), year: date.year() }
              await this.fetchEvents( payload )
            }
            this.mode = 'month'
        }
      },
      async onPanelChange( date ){

        let previousRequest = false

        if( date.year() !== this.selectedDate.year() ){
        const params = {  year: date.year() }
          await this.fetchCountEventsForYear( params ) 
          this.mode = 'year'
          previousRequest = true
        }
        if( date.month() !== this.selectedDate.month() ){
          this.mode = 'month'
        } else {
          this.mode = 'year'
        }

        this.selectedDate = date

        if( !previousRequest ){
          const payload = { month: date.month(), year: date.year() }
          await this.fetchEvents( payload )
        }

      },
      async addNewEvent (data) {

      },
      openSidebar() {
        this.$root.$emit('bv::toggle::collapse', 'sidebar-backdrop')
      },
      openModal(){
        this.visible = true
      },
      closeModal () {
          this.visible = false;
          this.mode = 'month';
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
