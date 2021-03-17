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
                    <b-button class="float-right" variant="primary" @click="openModal">Nuevo evento</b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
    </b-sidebar>    
  </div>
</template>
<script>
import * as moment from 'moment'
export default {
    name: 'SidebarDetails',
    props:{        
        selectedDate: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            loading: false,
            type:'success',
            hour: moment().hour(10).minute(0),
            content: '',
            variant: 'info',
            variants: [
            'transparent',
            'white',
            'light',
            'dark',
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info',
            ]
        }
    },
    computed: {
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
