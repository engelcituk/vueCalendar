<template>
  <b-container fluid>
    <b-row class="mt-2">    
      <b-col class="col-md-3" v-if="sidebarGroupVisible">            
          <SidebarGroups @openModalCreateGroup="openModalCreateGroup" :sidebarGroupVisible="sidebarGroupVisible" />
      </b-col>
      <b-col :class="sidebarGroupVisible ? 'col-md-9': 'col-md-12' ">
        <div class="table-responsive">
          <HeaderCalendar :selectedDate="selectedDate" @panel-change="onPanelChange" :sidebarGroupVisible="sidebarGroupVisible" @change-sidebar-group-visible="changeSidebarGroupVisible"/>  
          <table class="table table-striped table-bordered">
            <thead>                              
              <tr>
                <th>Localizaciones/días </th>
                <th v-for="(day) in dias" :key="day.key">
                  <div class="text-center">
                    {{day.dayName}} <br>
                    {{day.dayNumber}}
                  </div>
                </th>                                    
              </tr> 
            </thead>
            <tbody>
                <tr v-for="(producto, index) in productos" :key="index">
                    <td >{{producto.nombre}}</td>
                    <td v-for="(day, index) in dias" :key="index"></td>
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
import esEs from 'ant-design-vue/lib/locale-provider/es_ES'
import * as moment from 'moment'
import HeaderCalendar from '@/components/calendar/HeaderCalendar'
import CreateEvent from '@/components/calendar/CreateEvent'
import CreateGroup from '@/components/calendar/CreateGroup'
import SidebarGroups from '@/components/calendar/SidebarGroups'
import SidebarDetails from '@/components/calendar/SidebarDetails'


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
      await this.fetchEvents( { month: this.selectedDate.month(), year: this.selectedDate.year() } )      
      await this.fetchCountEventsForYear( {  year: this.selectedDate.year() } )       
  },
  data() {
    return {
      selectedDate: moment(),
      sidebarGroupVisible: true,
      visibleModalCreateEvent: false,
      visibleModalCreateGroup: false ,
      dias: this.getDaysArray( moment().year(), moment().month() ),
      productos : [{
          id: 1,
          nombre: "Location Logitech",
          
      },
      {
          id: 2,
          nombre: "Location Mi A1",
          
      },
      {
          id: 3,
          nombre: "Location Galletas",
          
      },
      {
          id: 4,
          nombre: "Location port",          
      },
      ]      
    }
  },
  computed:{
    ...mapState('calendar', ['modeCalendar','eventsData','eventsDataCountForYear']),                    
  },
  methods: {
    ...mapActions('calendar',['fetchEvents','fetchCountEventsForYear','saveEvent']),
    ...mapMutations('calendar',['setModeCalendar','setSelectedDate']),
    getDaysArray (year, month){    
      const names = Object.freeze( [ 'Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado' ])
      const date = new Date(year, month, 1)
      const result = []
      while ( date.getMonth() == month ) { 
        const key = Math.random().toString(36).substring(2,9)
        const momentDate = moment( new Date(year, month, date.getDay()) )      
        result.push( {key, dayNumber: `${date.getDate()}`, dayName: `${names[date.getDay()]}`, momentDate })
        date.setDate(date.getDate() + 1)
      }
      return result
    },
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
          this.openModalCreateEvent()                     
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
      this.closeModalCreateEvent()       
      await this.fetchEvents( { month: this.selectedDate.month(), year: this.selectedDate.year() } )       
      await this.fetchCountEventsForYear( {  year: this.selectedDate.year() } )    
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
</style>
