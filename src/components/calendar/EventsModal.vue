<template>
  <div>    
    <antModal v-model="visible" :title="eventTitle" :closable="false" :maskClosable="false">
        <b-form-group label="Type Event" >
            <b-form-radio-group
                id="radio-group-2"
                v-model="type"                
                name="type"
            >
                <b-form-radio value="success">Success</b-form-radio>
                <b-form-radio value="danger">Danger</b-form-radio>                                
                <b-form-radio value="warning">Warning</b-form-radio>                                

            </b-form-radio-group>
        </b-form-group>

        <b-form-group label="Time" >
            <antTimePicker @change="onHourChange" :minuteStep="5" :value="hour" :defaultValue="moment('10:00','HH:mm')" format="HH:mm"></antTimePicker>
        </b-form-group>

        <b-form-group label="Content" >
            <b-form-textarea            
                v-model="content"
                placeholder="Enter something..."
                rows="1"
                max-rows="1"
            ></b-form-textarea>
        </b-form-group>
        
        <template slot="footer">
            <antButton key="back" type="danger" @click="closeModal" >Cerrar</antButton>
            <antButton key="submit" type="primary" :loading="loading" @click="addEvent">Crear evento</antButton>
        </template>                                                          
    </antModal>
  </div>
</template>
<script>
import * as moment from 'moment'
export default {
    name: 'EventsModal',
    props:{
        visible: {
            type: Boolean,
            required: true
        },
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
            content: ''
        }
    },
    computed: {
        eventTitle(){
            return `Crear evento para el dia ${this.selectedDate.format('DD/MM/Y')}`
        }
    },
    methods: {
        moment,
        addEvent(){
            this.loading = true
            this.$emit('addNewEvent',{
                type: this.type,
                hour: this.hour.format("HH:mm"),
                content: this.content,
                day: this.selectedDate.date(),
                month: this.selectedDate.month(),
                year: this.selectedDate.year(),
            })
            Object.assign(this.$data, this.$options.data() )            
        },
        closeModal(){
            this.$emit('closeModal')
        },
        onHourChange( hour ){
            if( hour && hour !== ''){
                this.hour = hour
            }
        }
    },
}
</script>
