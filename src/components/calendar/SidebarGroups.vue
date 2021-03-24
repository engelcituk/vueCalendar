<template>
    <nav id="sidebar">
      <b-container>
        <b-row>
          <b-col class="mt-3">            
              <b-button class="float-right" size="sm" variant="primary" @click="openModalCreateGroup">Nuevo grupo</b-button>
          </b-col>
        </b-row>
        
      </b-container>                
    </nav>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import * as moment from 'moment'

export default {
  name: 'SidebarGroups', 
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
    openModalCreateGroup(){        
        this.$emit('openModalCreateGroup')
    },
  }
}
</script>