<template>
  <div>    
    <antModal v-model="visible" :title="grouTitle" :closable="false" :maskClosable="false">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore, doloribus! Eius velit nostrum aliquid optio culpa magni temporibus quis, facilis voluptas nobis dignissimos? Iste ducimus fugiat perferendis vero cumque et.
        
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
                type: this.type,
                hour: this.hour.format("HH:mm"),
                content: this.content,
                day: this.selectedDate.date(),
                month: this.selectedDate.month(),
                year: this.selectedDate.year(),
                user_id: 17
            })
            Object.assign(this.$data, this.$options.data() )            
        },
        closeModalCreateGroup(){
            this.$emit('closeModalCreateGroup')
        },
        onHourChange( hour ){
            if( hour && hour !== ''){
                this.hour = hour
            }
        }
    },
}

</script>
