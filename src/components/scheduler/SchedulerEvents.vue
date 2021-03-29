<template>
  <b-container fluid>
    <b-row class="mt-2">    
      <b-col class="col-md-3" v-if="sidebarGroupVisible">            
          <SidebarGroups @openModalCreateGroup="openModalCreateGroup" :sidebarGroupVisible="sidebarGroupVisible" />
      </b-col>
      <b-col :class="sidebarGroupVisible ? 'col-md-9': 'col-md-12' ">
        <HeaderCalendar
          :selectedDate="selectedDate"
          :sidebarGroupVisible="sidebarGroupVisible"
          @change-sidebar-group-visible="changeSidebarGroupVisible"
          :currentMonthName="currentMonthName"
        />  
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>                              
              <tr>
                <th >Loc / días </th>
                <th v-for="(day) in days" :key="day.key">
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
                    <td v-for="(day, index) in days" :key="index" class="text-center cursor-table" @click="addEvent(location.id, day.momentDate, day.dayNumber)" :style=" countEvents( location.id, day.momentDate.year(), day.momentDate.month(), day.dayNumber ) > 0 ? 'background:#e3f2fd': '' ">
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
            :selectedLocation="selectedLocation || 0"
            @change-selected-location="changeSelectedLocation"
            @addNewEvent="addNewEvent"
            @closeModalCreateEvent="closeModalCreateEvent"
          />
          
          <CreateGroup
            :visible="visibleModalCreateGroup"  
            :selectedDate="selectedDate"    
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
    const days = await getDaysArray( moment().year(), moment().month() )
    this.setDaysMonth( days )
    await this.fetchEventsScheduler( this.selectedDate )  
    await this.fetchLocationsScheduler() 
    this.fetchGroupsScheduler()    

  },
  // 2021-02-19 18:31:48
  data() {
    return {
      selectedDate: moment(),
      currentMonthName: moment().format('MMMM'),
      sidebarGroupVisible: false,
      visibleModalCreateEvent: false,
      visibleModalCreateGroup: false ,
    }
  },
  computed:{
    ...mapState('calendar', ['days','modeCalendar','eventsData','locations','selectedLocation']),                    
  },
  methods: {
    moment,
    ...mapActions('calendar',['fetchEventsScheduler','fetchLocationsScheduler','fetchGroupsScheduler','saveEvent','saveGroup']),
    ...mapMutations('calendar',['setDaysMonth','setSelectedDate','setSelectedLocation','setEventsInSelectedDate']), 
    countEvents(idLocation, year, month, day ) {
      const formatDate = moment( new Date(year, month, day) ).format("YYYY-MM-DD")      
      const count = countEventsInLocationByDay(idLocation, formatDate, this.eventsData)        
      return count > 0 ? count : ''
    }, 
    async addEvent ( idLocation, date,  dayNumber  ) {      
      this.selectedDate = moment( new Date(date.year(), date.month(), dayNumber) )
      this.setSelectedDate( this.selectedDate )      
      this.setSelectedLocation( idLocation )                  
      const formatDate = moment( new Date(date.year(), date.month(), dayNumber) ).format("YYYY-MM-DD")
      const count = countEventsInLocationByDay(idLocation, formatDate, this.eventsData)
      const eventsInSelectedDate = this.eventsData.filter( event => event.fechaInicio === formatDate
                                                    && event.location === idLocation ) || []
      this.setEventsInSelectedDate( eventsInSelectedDate )   

      if( count > 0 ){
        this.$root.$emit('bv::toggle::collapse', 'sidebar-backdrop') //abro sidebar detalle                   
      } else {
          this.openModalCreateEvent()                     
      }    
    },        
    async addNewEvent (data) {
      // console.log(data)
      await this.saveEvent( data )   
      this.closeModalCreateEvent()       
      await this.fetchEventsScheduler( this.selectedDate  )
      await this.fetchLocationsScheduler()                        
    },
    async addNewGroup (data) {      
      await this.saveGroup( data )  
      this.closeModalCreateGroup() 
      this.fetchGroupsScheduler()    
         
    },  
    changeSelectedLocation( location ){
      this.setSelectedLocation( parseInt(location) )                  
    },  
    openModalCreateEvent(){      
      this.visibleModalCreateEvent = true
    },
    openModalCreateGroup(){
      this.visibleModalCreateGroup = true
    },
    closeModalCreateEvent() {
        this.visibleModalCreateEvent = false
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

