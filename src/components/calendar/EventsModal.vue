<template>
  <div>    
    <antModal v-model="visible" :title="eventTitle" :closable="false" :zIndex="5000" :maskClosable="false">
        <template slot="footer">
            <antButton key="back" type="danger" @click="closeModal" >Cerrar</antButton>
            <antButton key="submit" type="primary" :loading="loading" @click="addEvent">Crear evento</antButton>
        </template>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
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
        }
    },
}
</script>
