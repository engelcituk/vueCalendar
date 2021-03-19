<template>
    <antCard>
      <b-row>
        <b-col>
          <h5><strong>{{ selectedDateFormat }}</strong></h5>      
        </b-col>
        <b-col class="text-center">
          <h4> <strong> {{ monthNameSelectedDate }} </strong></h4>      
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
    </antCard>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import * as moment from 'moment'

export default {
  name: 'HeaderCalendar',  
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
    }
  }
}
</script>