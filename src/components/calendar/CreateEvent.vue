<template>
  <div>    
    <antModal v-model="visible" :title="eventTitle" :closable="false" :maskClosable="false">

        <b-form-group >
            <label> <strong>Locación</strong></label>
            <select class="form-control"                
                @change="onChangeLocation($event)"
                :value="selectedLocation"
            >                
                <option v-for="(location, index) in locations" :key="index" :value="location.id">{{location.nombre}}</option>
            </select>        
        </b-form-group>

        <!-- <b-form-group label="Type Event" >
            <b-form-radio-group
                id="radio-group-2"
                v-model="type"                
                name="type"
            >
                <b-form-radio value="success">Success</b-form-radio>
                <b-form-radio value="processing">Procesando</b-form-radio>                                
                <b-form-radio value="default">Default</b-form-radio>                                
                <b-form-radio value="error">Danger</b-form-radio>                                
                <b-form-radio value="warning">Warning</b-form-radio>                                

            </b-form-radio-group>
        </b-form-group> -->

        <b-form-group>
            <label> <strong>Fecha y hora inicio</strong></label><br>
            <antDatePicker
                :value="moment(selectedDate,'DD:MM:Y')"
                format="DD/MM/Y" 
                @change="onStartDateChange"
            ></antDatePicker>
            <antTimePicker
                :minuteStep="5"
                format="HH:mm"
                :value="moment(startHour,'HH:mm')"
                :defaultValue="moment('10:00','HH:mm')"
                @change="onHourChangeInit"
            ></antTimePicker>            
        </b-form-group>
        <b-form-group>
            <label><strong>Fecha y hora fin</strong></label><br>                
            <antDatePicker
                :value="moment(selectedDate,'DD:MM:Y')"
                format="DD/MM/Y"
                @change="onEndDateChange"
            ></antDatePicker>
            <antTimePicker
                @change="onHourChangeEnd"
                :minuteStep="5"
                :value="moment(endHour,'HH:mm')"
                :defaultValue="moment('11:00','HH:mm')"
                format="HH:mm"
            ></antTimePicker>
        </b-form-group>
        <b-row>
            <b-col>
                <b-form-group>
                    <label> <strong>Adultos</strong></label><br>
                    <antInput type="number" :value="1"></antInput>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group>
                    <label> <strong>Niños</strong></label><br>
                    <antInput type="number" :value="0"></antInput>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group>
                    <label> <strong>Infantes</strong></label><br>
                    <antInput type="number" :value="0"></antInput>
                </b-form-group>
            </b-col>
        </b-row>
                   
        <template slot="footer">
            <antButton key="back" type="danger" @click="closeModalCreateEvent" >Cerrar</antButton>
            <antButton key="submit" type="primary" :loading="loading" @click="addEvent"> <i class="fas fa-save"></i>Crear evento</antButton>
        </template>                                                          
    </antModal>
  </div>
</template>
<script>
import * as moment from 'moment'
import { mapState, mapMutations} from 'vuex'
export default {
    name: 'CreateEvent',
    props:{
        visible: {
            type: Boolean,
            required: true
        },
        selectedDate: {
            type: Object,
            required: true
        },
        selectedLocation: {
            type: Number,
            required: true
        }
    },
    mounted(){
        // console.log(this.location)
    },
    data() {
        return {
            loading: false,   
            // idLocation: this.selectedLocation,                  
            dateStart: moment(this.selectedDate,'DD:MM:Y'),
            dateEnd: moment(this.selectedDate,'DD:MM:Y'),
            startHour: moment().hour(10).minute(0),
            endHour: moment().hour(11).minute(0),
            adulto: 1,                   
            ninio: 0,                   
            infante: 0,                   
        }
    },
    computed: {
        ...mapState('calendar', ['locations']),   
        eventTitle(){
            return `Crear evento para el dia ${this.selectedDate.format('DD/MM/Y')}`
        }
    },
    methods: {
        moment,
    ...mapMutations('calendar',['setSelectedLocation']), 
        addEvent(){
            console.log( this.selectedLocation)
            // this.loading = true
            // this.$emit('addNewEvent',{
            //     id: Math.random().toString(36).substring(2,9),
            //     type: this.type,
            //     hour: this.hour.format("HH:mm"),
            //     content: this.content,
            //     day: this.selectedDate.date(),
            //     month: this.selectedDate.month(),
            //     year: this.selectedDate.year(),
            //     user_id: 17
            // })
            // Object.assign(this.$data, this.$options.data() )            
        },
        closeModalCreateEvent(){
            this.$emit('closeModalCreateEvent')
        },
        onChangeLocation(event){
            this.$emit('change-selected-location', event.target.value)            
        },        
        onStartDateChange( date ){
            if( date && date !== ''){
                this.dateStart = date.format('Y-MM-DD')                
            }
        },
        onEndDateChange( date ){
            if( date && date !== ''){
                this.dateEnd = date.format('Y-MM-DD')                                   
            }
        },
        onHourChangeInit( hour ){
            if( hour && hour !== ''){
                this.startHour = hour.format("HH:mm")                
            }
        },
        onHourChangeEnd( hour ){
            if( hour && hour !== ''){
                this.endHour = hour.format("HH:mm")                
            }
        }
    },
}

</script>
