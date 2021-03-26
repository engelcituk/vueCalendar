<template>
  <div>
    <b-row>
      <b-col class="col-sm-12 col-md-12 text-center">
        <h4> <strong> {{ monthNameSelectedDate }}</strong></h4> 
        <strong>{{ selectedDateFormat }}</strong>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="col-sm-12 col-md-8 mb-3">
        <div class="form-inline" > 
          <b-form-group>
            <label style="color:white">x</label>            
              <button type="button" id="sidebarCollapse" class="btn btn-info mr-2" @click.stop="toggleSidebar( !sidebarGroupVisible )">
                <b-icon icon="list"></b-icon>
              </button>         
          </b-form-group >         
          <b-form-group class="mr-2">
            <label> <strong>Fecha</strong></label>            
            <b-form-input
              type="date"
              v-model="dateInput"
              :min="minYearMax.yearMin+'-01-01'"
              :max="minYearMax.yearMax+'-12-31'"
              @input="changeDate">
            </b-form-input>        
          </b-form-group>  
          <b-form-group >
            <label> <strong>Locaciones</strong></label>
              <select class="form-control" v-model="location" @change="changeLocation($event)">
                <option value="all">Todos</option>
                <option v-for="(location, index) in locations" :key="index" :value="location.id">{{location.nombre}}</option>
              </select>        
          </b-form-group>              
        </div>                                                                         
      </b-col>
      
      <b-col class="col-sm-12 col-md-4">
          <b-button
              v-if="currenMonthNumberDate !== monthNumberSelectedDate"
              class="float-right"
              variant="outline-primary"
              @click="setSelectedDateToToday"
          >
            <b-icon icon="house-fill"></b-icon>
          </b-button>
      </b-col>        
    </b-row>                 
  </div>
</template>
<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import * as moment from 'moment'
import { yearsMinMax, getDaysArray } from '@/helpers/helpers' 

export default {
  name: 'HeaderCalendar',
  props:{
      sidebarGroupVisible: {
          type: Boolean,
          required: true
      },
      currentMonthName:{
        type: String,
        required: true
      }       
  }, 
  mounted(){
    
  },
  data() {
    return {
        loading: false,        
        currenMonthNumberDate: moment().month(), 
        minYearMax: yearsMinMax(),
        dateInput: moment(this.selectedDate).format("YYYY-MM-DD"),
        location: this.selectedLocation || 'all'           
    }
  },
  computed:{
    ...mapState('calendar', ['locations','selectedDate','selectedLocation']),   
    selectedDateFormat(){
        const monthNumber = moment( this.selectedDate._d ).month()
        if(this.currenMonthNumberDate !== monthNumber){
          return moment(this.selectedDate._d).format("01/MM/YYYY")
        }
        //si es el mes actual muestro la fecha actual
        if(this.currenMonthNumberDate === monthNumber ){
          return moment(this.selectedDate._d).format("DD/MM/YYYY")
        }        
    },
    selectedDateFormatInput(){
        return moment(this.selectedDate._d).format("YYYY/MM/DD") 
    },
    monthNameSelectedDate(){
        moment.locale('es')
        return moment(this.selectedDate._d).format('MMMM').toUpperCase()        
    },
    monthNumberSelectedDate(){        
        return moment( this.selectedDate._d ).month();
    }

  },
  methods: {
    moment,
    ...mapActions('calendar',['fetchEventsScheduler','fetchLocationsScheduler']),
    ...mapMutations('calendar',['setSelectedDate','setDaysMonth','setSelectedLocation']),
    async setSelectedDateToToday(){
        const date = moment()
        //regreso a la fecha original actual, mutacion
        this.setSelectedDate( date )  
        //regreso al panel del mes actual
        this.dateInput = date.format("YYYY-MM-01")          
        //vuelvo a realizar peticiones
        const days = await getDaysArray( date.year(), date.month() )
        this.setDaysMonth( days )
        await this.fetchEventsScheduler( {month: this.selectedDate.month(this.currentMonthName).format("M"), year: this.selectedDate.year() } )  
        await this.fetchLocationsScheduler() 
    },
    toggleSidebar( booleano ){
      this.$emit('change-sidebar-group-visible', booleano)                                  
    },
    async changeDate( date ){
      const myDate = moment(date)      
      this.setSelectedDate( myDate )
      const days = await getDaysArray( myDate.year(), myDate.month() )
      this.setDaysMonth( days )
      this.dateInput = myDate.format("YYYY-MM-01") 
        
    },
    changeLocation(event){
      this.location = event.target.value
      this.setSelectedLocation( this.location )      
    }
  }
}
</script>