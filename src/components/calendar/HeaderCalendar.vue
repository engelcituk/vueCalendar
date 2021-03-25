<template>
  <b-row>
    <b-col>
      <button type="button" id="sidebarCollapse" class="btn btn-info" @click.stop="toggleSidebar( !sidebarGroupVisible )">
          <b-icon icon="list"></b-icon>                        
      </button>              
    </b-col>
    <b-col class="text-center">
      <h4> <strong> {{ monthNameSelectedDate }} {{currenMonthNumberDate}}</strong></h4> 
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

export default {
  name: 'HeaderCalendar',
  props:{
      sidebarGroupVisible: {
          type: Boolean,
          required: true
      },        
  }, 
  data() {
    return {
        loading: false,        
        currenMonthNumberDate: moment().month(),              
    }
  },
  computed:{
    ...mapState('calendar', ['selectedDate']),
    selectedDateFormat(){
        return moment(this.selectedDate._d).format("DD/MM/YYYY") 
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
    ...mapActions('calendar',['fetchEvents','fetchCountEventsForYear']),
    ...mapMutations('calendar',['setSelectedDate']),
    async setSelectedDateToToday(){
        const date = moment()
        //regreso a la fecha original actual, mutacion
        this.setSelectedDate( date )  
        //regreso al panel del mes actual
        this.$emit('panel-change', date)       
        //vuelvo a realizar peticiones
        await this.fetchEvents( { month: date.month(), year: date.year() } )      
        await this.fetchCountEventsForYear( {  year: date.year() } ) 
    },
    toggleSidebar( booleano ){
      this.$emit('change-sidebar-group-visible', booleano)                                  
    }
  }
}
</script>