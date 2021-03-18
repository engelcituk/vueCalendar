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
                                    <span class="badge badge-primary"> {{event.type}}</span><br>
                                    <span class="text-muted">{{event.content}}</span><br>                           
                                    <span class="text-muted"> {{event.hour}} </span>  | <span class="text-muted"> lugar </span>                        
                                </div>
                                <div class="float-right">
                                    <b-button size="sm" variant="danger"
                                        class="mr-1 mb-1 button-small" 
                                    >
                                        <b-icon icon="x"></b-icon>                                   
                                    </b-button>                       
                                    <b-button size="sm" variant="info" class="mr-1 mb-1 button-small"
                                        
                                    >
                                        <b-icon icon="pencil-fill" ></b-icon>
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
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import * as moment from 'moment'

export default {
    name: 'SidebarDetails',
    props:{        
        selectedDate: {
            type: Object,
            required: true
        }
    },
    mounted(){

    },
    data() {
        return {
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
        openModal(){
            this.$emit('openModal')
        }       
    },
}
</script>
<style>
.card-body {
    padding: .5rem!important;
}
.button-small{
    padding: 0.2rem 0.3rem!important;
}
</style>