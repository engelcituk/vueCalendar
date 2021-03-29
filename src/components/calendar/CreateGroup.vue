<template>
  <div>    
    <antModal v-model="visible" :title="grouTitle" :closable="false" :maskClosable="false">
        <b-row>
            <b-col>
                <b-form-group>
                    <label> <strong>Grupo</strong></label><br>
                    <antInput placeholder="Ingrese nombre del grupo" v-model="grupo"></antInput>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group>
                    <label><strong>Fecha llegada</strong></label><br>                
                    <antDatePicker
                        :value="moment(selectedDate,'DD:MM:Y')"
                        v-model="arrivalDate"
                        format="DD/MM/Y"
                        @change="onArrivalDateChange"
                    ></antDatePicker>
                </b-form-group>
            </b-col>            
        </b-row>
        <b-row>
            <b-col>
                <b-form-group>
                    <label> <strong>Agencia</strong></label><br>
                    <antInput placeholder="Ingrese nombre de la agencia" v-model="agencia"></antInput>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group>
                    <label><strong>Agente</strong></label><br>                
                    <antInput placeholder="Ingrese nombre del agente" v-model="agente"></antInput>
                </b-form-group>
            </b-col>                        
        </b-row>
        <b-form-group>
            <label><strong>Coordinador</strong></label><br>                
            <antInput placeholder="Ingrese nombre del agente" v-model="coordinador"></antInput>
        </b-form-group>
        <b-row>
            <b-col>
                <b-form-group>
                    <label> <strong>Grupo</strong></label><br>
                    <b-form-textarea
                        id="textarea"                        
                        placeholder="Breve descripción" 
                        v-model="descripcion"                      
                    ></b-form-textarea>
                </b-form-group>
            </b-col>                       
        </b-row>
        
        <template slot="footer">
            <antButton key="back" type="danger" @click="closeModalCreateGroup" >Cerrar</antButton>
            <antButton key="submit" type="primary" :loading="loading" @click="addGroup"> <i class="fas fa-save"></i>Crear evento</antButton>
        </template>                                                          
    </antModal>
  </div>
</template>
<script>
import * as moment from 'moment'
export default {
    name: 'CreateGroup',
    props:{
        visible: {
            type: Boolean,
            required: true
        },
        selectedDate: {
            type: Object,
            required: true
        },        
    },
    data() {
        return {
            loading: false,            
            arrivalDate: moment(this.selectedDate,'DD:MM:Y'),
            grupo: "",            
            agencia:"",
            agente:"",
            coordinador:"",
            descripcion:""
        }
    },
    computed: {
        grouTitle(){
            return `Crear grupo`
        }
    },
    methods: {
        moment,
        addGroup(){
            this.loading = true
            this.$emit('addNewGroup',{                
                id: Math.random().toString(36).substring(2,9),
                grupo: this.grupo,
                fechaLLegada: this.arrivalDate.format('Y-MM-DD'),
                agencia:this.agencia,
                agente:this.agente,
                coordinador:this.coordinador,
                descripcion:this.descripcion
            })
            this.loading = false

            // Object.assign(this.$data, this.$options.data() )            
        },
        closeModalCreateGroup(){
            this.$emit('closeModalCreateGroup')
        },
        onArrivalDateChange( date ){
            if( date && date !== ''){
                this.dateEnd = date                                  
            }
        }        
    },
}

</script>
