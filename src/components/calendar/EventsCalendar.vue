<template>
    <div>        
        <antConfigProvider :locale="locale">  <!-- idioma del calendar en esp -->
            <antCalendar @select="addEvent" @panelChange="onPanelChange" :value="selectedDate" :mode="modeCalendar">
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

        <EventsModal
          :visible="visible"
          :selectedDate="selectedDate"
          @addNewEvent="addNewEvent"
          @closeModal="closeModal"
        />
        
        <SidebarDetails
          :selectedDate="selectedDate"
          @openModal="openModal"
        />

    </div>  
</template>
<script>

import { mapState, mapActions, mapMutations } from 'vuex'
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
      visible: false        
    }
  },
  computed:{
    ...mapState('calendar', ['modeCalendar','eventsData','eventsDataCountForYear']),                    
  },
  methods: {
    ...mapActions('calendar',['fetchEvents','fetchCountEventsForYear']),
    ...mapMutations('calendar',['setModeCalendar','setSelectedDate']),
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

    async addEvent ( date ) {
      const copySelectedDate = this.selectedDate
      //obtengo fecha (día del mes) y busco los eventos de ese día
      const dayInMonth = date.date()
      const eventsInDay = this.eventsData[dayInMonth]

      this.selectedDate = date //selectedDate se actualiza a la fecha obtenida
      this.setSelectedDate( date )

      if ( this.modeCalendar === 'month' ) {
        //si hay eventos para este día abro sidebar para detalles
        if( eventsInDay ){                     
          this.openSidebar()            
        }
        //sino hay eventos para este día abro modal de creación
        if( !eventsInDay ){
          this.openModal()                     
        }

      } else {
          if ( copySelectedDate.month() !== date.month() ) {
            const payload = { month: date.month(), year: date.year() }
            await this.fetchEvents( payload )            
          }
          this.setModeCalendar('month')
      }
    },

    async onPanelChange( date ){

      let previousRequest = false

      if( date.year() !== this.selectedDate.year() ){
        const params = {  year: date.year() }
        await this.fetchCountEventsForYear( params )
        this.setModeCalendar('year')
        previousRequest = true
      }
      if( date.month() !== this.selectedDate.month() ){
        this.setModeCalendar('month')
      } else {
        this.setModeCalendar('year')
      }

      this.selectedDate = date
      this.setSelectedDate( date )

      if( !previousRequest ){
        const payload = { month: date.month(), year: date.year() }
        await this.fetchEvents( payload )
      }        
    },
    
    async addNewEvent (data) {
      console.log(data)      
    },
    openSidebar() {
      this.$root.$emit('bv::toggle::collapse', 'sidebar-backdrop')
    },
    openModal(){
      this.visible = true
    },
    closeModal () {
        this.visible = false
        this.setModeCalendar('month')
    }      
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
