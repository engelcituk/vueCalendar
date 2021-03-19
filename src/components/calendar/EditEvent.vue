<template>
  <div>    
    <antModal v-model="visible" :title="eventTitle" :closable="false" :maskClosable="false" v-if="selectedEvent">
        <b-form-group label="Type Event" >
            <b-form-radio-group
                id="radio-group-2"
                v-model="selectedEvent.type"                
                name="type"
            >
                <b-form-radio value="success">Success</b-form-radio>
                <b-form-radio value="processing">Procesando</b-form-radio>                                
                <b-form-radio value="default">Default</b-form-radio>                                
                <b-form-radio value="error">Danger</b-form-radio>                                
                <b-form-radio value="warning">Warning</b-form-radio>                                

            </b-form-radio-group>
        </b-form-group>

        <b-form-group label="Date">
            <antDatePicker
                @change="onDateChange"
                :value="moment(new Date(selectedEvent.year, selectedEvent.month, selectedEvent.day),'DD:MM:Y')"
                format="DD/MM/Y"
            ></antDatePicker>
        </b-form-group>
        
        <!--  -->
        <b-form-group label="Time" >
            <antTimePicker @change="onHourChange" :minuteStep="5" :value="moment(selectedEvent.hour,'HH:mm')" :defaultValue="moment('10:00','HH:mm')" format="HH:mm"></antTimePicker>
        </b-form-group>

        <b-form-group label="Content" >
            <b-form-textarea            
                v-model="selectedEvent.content"
                placeholder="Enter something..."
                rows="1"
                max-rows="1" 
            ></b-form-textarea>
        </b-form-group>
        
        <template slot="footer">
            <antButton key="back" type="danger" @click="closeModalEdit" >Cerrar</antButton>
            <antButton key="submit" type="primary" :loading="loading" @click="updateEvent"> <i class="fas fa-save"></i>Actualizar evento</antButton>
        </template>                                                          
    </antModal>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import * as moment from 'moment'
export default {
    name: 'EditEvent',
    props:{
        visible: {
            type: Boolean,
            required: true
        },        
    },
    data() {
        return {
            loading: false,                      
        }
    },    
    computed: {
        ...mapState('calendar', ['selectedEvent']),                    
        eventTitle(){
            return `Actualizar evento`
        },                  
    },
    methods: {
        moment,
        updateEvent(){
            this.loading = true            
            this.$emit('update-event',{
                id: this.selectedEvent.id,
                type: this.selectedEvent.type,
                hour: this.selectedEvent.hour,
                content: this.selectedEvent.content,
                day: this.selectedEvent.day,
                month: this.selectedEvent.month,
                year: this.selectedEvent.year,
                user_id: 17
            })
            this.loading = false                                              
        },
        closeModalEdit(){
            this.$emit('closeModalEdit')
        },
        onDateChange( date ){
            if( date && date !== ''){
                this.selectedEvent.year = date.year()
                this.selectedEvent.month = date.month()
                this.selectedEvent.day = date.date()                            
            }            
        },
        onHourChange( hour ){
            if( hour && hour !== ''){
                this.selectedEvent.hour = hour.format("HH:mm")
            }
        }
    },
}

</script>
