<template>
    <nav id="sidebar">
      <div class="sidebar-header">
          <h3>Grupos</h3>
      </div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque consequatur debitis vitae harum fugiat nostrum non. Voluptate, corporis eum eaque aut mollitia nisi? Quod sit, sapiente tempora delectus dolor natus?        
    </nav>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import * as moment from 'moment'

export default {
  name: 'SidebarGroups',  
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