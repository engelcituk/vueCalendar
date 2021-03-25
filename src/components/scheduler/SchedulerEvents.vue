<template>
  <b-container fluid>
    <b-row class="mt-2">    
      <b-col class="col-md-3" v-if="sidebarGroupVisible">            
          <SidebarGroups @openModalCreateGroup="openModalCreateGroup" :sidebarGroupVisible="sidebarGroupVisible" />
      </b-col>
      <b-col :class="sidebarGroupVisible ? 'col-md-9': 'col-md-12' ">
          <HeaderCalendar :selectedDate="selectedDate" :sidebarGroupVisible="sidebarGroupVisible" @change-sidebar-group-visible="changeSidebarGroupVisible"/>  
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>                              
              <tr>
                <th >Loc / días </th>
                <th v-for="(day) in dias" :key="day.key">
                  <div class="text-center text-small">
                    {{day.dayName}} <br>
                    {{day.dayNumber}}
                  </div>
                </th>                                    
              </tr> 
            </thead>
            <tbody>
                <tr v-for="(location, index) in locations" :key="index">
                    <td >{{location.nombre}}</td>
                    <td v-for="(day, index) in dias" :key="index" class="text-center" @click="addEvent(location.id, day.momentDate, day.dayNumber)">
                      {{ countEvents( location.id, day.momentDate.year(), day.momentDate.month(), day.dayNumber ) }}
                      <!-- mes:{{day.momentDate.month()}} -->
                    </td>
                </tr>
            </tbody>
          </table>
        </div> 
        <CreateEvent
            :visible="visibleModalCreateEvent"
            :selectedDate="selectedDate"
            @addNewEvent="addNewEvent"
            @closeModalCreateEvent="closeModalCreateEvent"
          />
          
          <CreateGroup
            :visible="visibleModalCreateGroup"      
            @addNewGroup="addNewGroup"
            @closeModalCreateGroup="closeModalCreateGroup"
          />

          <SidebarDetails
            :selectedDate="selectedDate"
            @openModalCreateEvent="openModalCreateEvent"          
          />     
      </b-col>
    
  </b-row> 
  </b-container>                  
</template>
<script>

import { mapState, mapActions, mapMutations } from 'vuex'
import * as moment from 'moment'
import HeaderCalendar from '@/components/calendar/HeaderCalendar'
import CreateEvent from '@/components/calendar/CreateEvent'
import CreateGroup from '@/components/calendar/CreateGroup'
import SidebarGroups from '@/components/calendar/SidebarGroups'
import SidebarDetails from '@/components/calendar/SidebarDetails'
import { getDaysArray, countEventsInLocationByDay} from '@/helpers/helpers' 


export default {
  name: 'SchedulerEvents',
  components : {
    HeaderCalendar,
    CreateEvent,
    CreateGroup,
    SidebarGroups,
    SidebarDetails
  },
  async mounted(){                
      await this.fetchEventsScheduler( {month: this.selectedDate.month(this.currentMonthName).format("M"), year: this.selectedDate.year() } )  
      await this.fetchLocationsScheduler() 
  },
  // 2021-02-19 18:31:48
  data() {
    return {
      selectedDate: moment(),
      currentMonthName: moment().format('MMMM'),
      sidebarGroupVisible: false,
      visibleModalCreateEvent: false,
      visibleModalCreateGroup: false ,
      dias: getDaysArray( moment().year(), moment().month() ), //helper         
    }
  },
  computed:{
    ...mapState('calendar', ['modeCalendar','eventsData','locations']),                    
  },
  methods: {
    moment,
    ...mapActions('calendar',['fetchEventsScheduler','fetchLocationsScheduler','saveEvent']),
    ...mapMutations('calendar',['setModeCalendar','setSelectedDate','setEventsInSelectedDate']), 
    countEvents(idLocation, year, month, day ) {
      const formatDate = moment( new Date(year, month, day) ).format("YYYY-MM-DD")
      
      const count = countEventsInLocationByDay(idLocation, formatDate, this.eventsData)        
      return count > 0 ? count : ''
    }, 
    async addEvent ( idLocation, date,  dayNumber  ) {      
      this.selectedDate = moment( new Date(date.year(), date.month(), dayNumber) )
      this.setSelectedDate( this.selectedDate )
                  
      const formatDate = moment( new Date(date.year(), date.month(), dayNumber) ).format("YYYY-MM-DD")
      const count = countEventsInLocationByDay(idLocation, formatDate, this.eventsData)

      const eventsInSelectedDate = this.eventsData.filter( event => event.dateEvent === formatDate
                                                    && event.location === idLocation ) || []
      this.setEventsInSelectedDate( eventsInSelectedDate )   

      if( count > 0 ){
        this.$root.$emit('bv::toggle::collapse', 'sidebar-backdrop') //abro sidebar detalle                   
      } else {
          this.openModalCreateEvent()                     
      }    
    },        
    async addNewEvent (data) {
      await this.saveEvent( data )   
      this.closeModalCreateEvent()       
      await this.fetchEventsScheduler( { month: this.selectedDate.month(), year: this.selectedDate.year() } )        
    },
    async addNewGroup (data) {
      // await this.saveEvent( data )   
         
    },     
    openModalCreateEvent(){      
      this.visibleModalCreateEvent = true
    },
    openModalCreateGroup(){
      this.visibleModalCreateGroup = true
    },
    closeModalCreateEvent() {
        this.visibleModalCreateEvent = false
        this.setModeCalendar('month')
    },
    closeModalCreateGroup() {
        this.visibleModalCreateGroup = false        
    },
    changeSidebarGroupVisible(booleano){      
        this.sidebarGroupVisible = booleano        
    }
  },      
}
</script>
<style>
  .table-responsive::-webkit-scrollbar
  {
    height: 7px; 
    width: 7px;
    background-color: #F5F5F5;
  }
  .table-responsive::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
  }

  .table-responsive::-webkit-scrollbar-thumb:horizontal
  {
    background-color: #0ae;	
    background-image: -webkit-gradient(linear, 0 0, 0 100%, color-stop(.5, rgba(255, 255, 255, .2)), color-stop(.5, transparent), to(transparent));
  }
  .text-small{
    font-size: .7em;
  }
  th:first-child, td:first-child
{
  position:sticky;
  left:0px;
  background-color:#dee2e6;
}
</style>
