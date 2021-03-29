<template>
    <nav id="sidebar">
      <b-container>
        <b-row>
          <b-col class="mt-3">            
              <b-button class="float-right" size="sm" variant="primary" @click="openModalCreateGroup">Nuevo grupo</b-button>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <div v-if="groups.length">
                <b-card v-for="(group, index) in groups" :key="index"
                    style="max-width: 100%; border-left: 4px solid #5cb85c;" class="mb-1"                            
                >                        
                    <b-card-text>                        
                        <div class="float-left text-justify">                                     
                          <span class="text-muted">{{group.grupo}}</span>                          
                          <span class="text-muted"> {{group.Agencia}} </span><br>
                          <span class="text-muted"> {{group.fechaLLegada}} </span><br>  
                          <span class="text-muted"> {{group.descripcion}} </span>

                        </div>
                    </b-card-text>
                </b-card>
            </div>
            <b-alert show variant="danger" v-else>Aún sin grupos para este mes</b-alert>
          </b-col>
        </b-row>        
      </b-container>                
    </nav>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import * as moment from 'moment'

export default {
  name: 'SidebarGroups', 
  props:{
      sidebarGroupVisible: {
          type: Boolean,
          required: true
      },        
  }, 
  async mounted(){
       
  },
  data() {
    return {        
               
    }
  },
  computed:{
    ...mapState('calendar', ['selectedDate','groups']),    
  },
  methods: {
    moment,
    ...mapActions('calendar',[]),    
    openModalCreateGroup(){        
        this.$emit('openModalCreateGroup')
    },
  }
}
</script>