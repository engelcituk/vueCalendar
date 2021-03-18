<template>
  <div>
    <b-sidebar
        id="sidebar-backdrop"
        :title="eventTitle" 
        right 
        :backdrop-variant="variant"
        backdrop
        shadow
        width="500px"         
    >
    <div>
        <b-container class="mt-3">
            <b-row>
                <b-col >
                    <b-button class="float-right" size="sm" variant="primary" @click="openModal">Nuevo evento</b-button>
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col>
                    <div v-if="eventsInSelectedDate.length">
                        <b-card v-for="(event, index) in eventsInSelectedDate" :key="index"
                            style="max-width: 100%; border-left: 4px solid #5cb85c;" class="mb-1"                            
                        >                        
                            <b-card-text>
                                <div class="float-left text-justify">                                     
                                    <span class="text-muted">{{event.content}}</span><br>                           
                                    <span class="text-muted"> {{event.hour}} </span>  | <span class="text-muted"> lugar </span> | <span class="badge badge-primary"> {{event.type}}</span>                        
                                </div>
                                <div class="float-right">
                                    <b-button size="sm" variant="info" class="mr-1 mb-1 button-small"
                                        @click.stop="editEvento(event)"                                        
                                    >
                                        <b-icon icon="pencil-fill" ></b-icon>
                                    </b-button>                                    
                                    <b-button size="sm" variant="danger" class="mr-1 mb-1 button-small" 
                                        @click.stop="borrarEvento(event)"
                                    >
                                        <b-icon icon="x"></b-icon>                                   
                                    </b-button>                       
                                </div>
                            </b-card-text>
                        </b-card>
                    </div>
                    <b-alert show variant="danger" v-else>Aún sin eventos para esta fecha</b-alert>
                </b-col>
            </b-row>
        </b-container>
    </div>
    </b-sidebar>  
    
    <EditEvent :visible="visible" />  

  </div>
</template>

<script>

import { mapActions, mapMutations, mapGetters } from 'vuex'
import * as moment from 'moment'
import EditEvent from '@/components/calendar/EditEvent'

export default {
    name: 'SidebarDetails',
    components : {
        EditEvent,
    },
    props:{        
        selectedDate: {
            type: Object,
            required: true
        }
    },
    
    data() {
        return {
            visible: false,
            loading: false,
            type:'success',
            hour: moment().hour(10).minute(0),
            content: '',
            variant: 'info',
            borders: {success: '#5cb85c'}            
        }
    },
    computed: {
        ...mapGetters('calendar',['eventsInSelectedDate']),        
        eventTitle(){
            return `Fecha: ${this.selectedDate.format('DD/MM/YYYY')}`
        }
    },
    methods: {
        moment, 
        ...mapActions('calendar',['fetchEvents','fetchCountEventsForYear','deleteEvent']),
        ...mapMutations('calendar',['setSelectedEvent']),
        openModal(){
            this.$root.$emit('bv::toggle::collapse', 'sidebar-backdrop')
            this.$emit('openModal')
        },
        async editEvento( evento ){
            this.setSelectedEvent(evento)
        },
        async borrarEvento( evento ){            
            await this.deleteEvent( evento )
            const payload = { month: this.selectedDate.month(), year: this.selectedDate.year() }
            await this.fetchEvents( payload ) 
            const date = {  year: this.selectedDate.year() }
            await this.fetchCountEventsForYear( date )
        }     
    },
}
</script>
<style>
.card-body {
    padding: .5rem!important;
}
.button-small{
    padding: 0.15rem 0.2rem!important;
}
</style>