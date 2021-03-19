<template>
  <div>        
    <HeaderCalendar :selectedDate="selectedDate" @panel-change="onPanelChange"/>    
    <antConfigProvider :locale="locale">  <!-- idioma del calendar en esp -->
          <antCalendar @select="addEvent" @panelChange="onPanelChange" :value="selectedDate" :mode="modeCalendar">
              <ul slot="dateCellRender" slot-scope="value" class="events" >
                <li v-for="event in getListData(value)" :key="event.content">
                    <antBadge :status="event.type" :text="`${event.hour}: ${event.content}`"/>              
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

      <CreateEvent
        :visible="visibleModalCreate"
        :selectedDate="selectedDate"
        @addNewEvent="addNewEvent"
        @closeModalCreate="closeModalCreate"
      />
      
      <SidebarDetails
        :selectedDate="selectedDate"
        @openModalCreate="openModalCreate"          
      />
  </div>  
</template>
<script>

import { mapState, mapActions, mapMutations } from 'vuex'
import esEs from 'ant-design-vue/lib/locale-provider/es_ES'
import * as moment from 'moment'
import HeaderCalendar from '@/components/calendar/HeaderCalendar'
import CreateEvent from '@/components/calendar/CreateEvent'
import SidebarDetails from '@/components/calendar/SidebarDetails'

export default {
  name: 'EventsCalendar',
  components : {
    HeaderCalendar,
    CreateEvent,
    SidebarDetails
  },
  async mounted(){               
      await this.fetchEvents( { month: this.selectedDate.month(), year: this.selectedDate.year() } )      
      await this.fetchCountEventsForYear( {  year: this.selectedDate.year() } )       
  },
  data() {
    return {
      locale: esEs,
      selectedDate: moment(),
      visibleModalCreate: false        
    }
  },
  computed:{
    ...mapState('calendar', ['modeCalendar','eventsData','eventsDataCountForYear']),                    
  },
  methods: {
    ...mapActions('calendar',['fetchEvents','fetchCountEventsForYear','saveEvent']),
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
      //selectedDate se actualiza a la fecha obtenida
      this.selectedDate = date 
      this.setSelectedDate( date )
      if ( this.modeCalendar === 'month' ) {
        //si hay eventos para este día abro sidebar para detalles
        if( eventsInDay ){                     
          this.$root.$emit('bv::toggle::collapse', 'sidebar-backdrop') //abro sidebar detalle                   
        }
        //sino hay eventos para este día abro modal de creación
        if( !eventsInDay ){
          this.openModalCreate()                     
        }
      } else {
          if ( copySelectedDate.month() !== date.month() ) {            
            await this.fetchEvents( { month: date.month(), year: date.year() } )            
          }
          this.setModeCalendar('month')
      }
    },

    async onPanelChange( date, mode ){      
      let previousRequest = false
      //si el año del panel es diferente del año de la fecha selecionada
      if( date.year() !== this.selectedDate.year() ){        
        await this.fetchCountEventsForYear( {  year: date.year() } )
        previousRequest = true
      }
      
      this.setModeCalendar(mode)
      this.selectedDate = date
      this.setSelectedDate( date )

      if( !previousRequest ){        
        await this.fetchEvents( { month: date.month(), year: date.year() } )
      }        
    },
    
    async addNewEvent (data) {
      await this.saveEvent( data )   
      this.closeModalCreate()       
      await this.fetchEvents( { month: this.selectedDate.month(), year: this.selectedDate.year() } )       
      await this.fetchCountEventsForYear( {  year: this.selectedDate.year() } )    
    },    
    openModalCreate(){
      this.visibleModalCreate = true
    },

    closeModalCreate () {
        this.visibleModalCreate = false
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
