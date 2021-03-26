<template>
  <b-row>
    <b-col>
      <button type="button" id="sidebarCollapse" class="btn btn-info" @click.stop="toggleSidebar( !sidebarGroupVisible )">
          <b-icon icon="list"></b-icon>                        
      </button>    
      <b-input-group size="sm" class="mt-2 mb-2">
        <b-form-input type="date" v-model="dateInput" :min="minYearMax.yearMin+'-01-01'" :max="minYearMax.yearMax+'-12-31'" @input="changeDate"></b-form-input>
      </b-input-group>
               
    </b-col>
    <b-col class="text-center">
      <h4> <strong> {{ monthNameSelectedDate }}</strong></h4> 
      <strong>{{ selectedDateFormat }}</strong>

    </b-col>
    <b-col >
        <b-button
            v-if="currenMonthNumberDate !== monthNumberSelectedDate"
            class="float-right" variant="outline-primary"
            @click="setSelectedDateToToday"
        >
            <b-icon icon="house-fill"></b-icon>
        </b-button>
    </b-col>        
  </b-row>              
</template>
<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import * as moment from 'moment'
import { yearsMinMax, getDaysArray } from '@/helpers/helpers' 
import { Stream } from 'stream';

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
        dateInput: moment(this.selectedDate).format("YYYY-MM-DD")         
    }
  },
  computed:{
    ...mapState('calendar', ['selectedDate']),
    selectedDateFormat(){
        return moment(this.selectedDate._d).format("DD/MM/YYYY") 
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
    ...mapMutations('calendar',['setSelectedDate','setDaysMonth']),
    async setSelectedDateToToday(){
        const date = moment()
        //regreso a la fecha original actual, mutacion
        this.setSelectedDate( date )  
        //regreso al panel del mes actual
        this.dateInput = date.format("YYYY-MM-DD")          
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
      const myDate = moment(date )   
      this.setSelectedDate( myDate )
      const days = await getDaysArray( myDate.year(), myDate.month() )
      this.setDaysMonth( days )
      this.dateInput = myDate.format("YYYY-MM-DD") 
    }
  }
}
</script>