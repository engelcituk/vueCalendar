<template>
    <nav id="sidebar">
      <b-container>
        <b-row>
          <b-col class="mt-3">            
              <b-button class="float-right" size="sm" variant="primary" @click="openModalCreateGroup">Nuevo grupo</b-button>
          </b-col>
        </b-row>
        orem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque consequatur debitis vitae harum fugiat nostrum non. Voluptate, corporis eum eaque aut mollitia nisi? Quod sit, sapiente tempora delectus dolor natus?
      </b-container>                
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
    openModalCreateGroup(){        
        this.$emit('openModalCreateGroup')
    },
  }
}
</script>