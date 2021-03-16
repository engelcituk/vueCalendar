import Vue from 'vue'
import { find } from 'lodash'

export async function fetchEvents(context){ 
    const eventsData = []   
    try {
        const response = await Vue.axios({ 
            url:'/events/' 
        })
        const payload = response && response.data
        
        if(payload.length){
            payload.map( event => {
                if( !Array.isArray( eventsData[event.day] )){
                    eventsData[event.day] = []
                }
                eventsData[event.day].push(event)  
                context.commit('setEventsData', eventsData )
            })
        }

        
    } catch (error) {        
        context.commit('setCalendarError', error.message)
    } finally {
        console.log('La petición para obtener la lista de eventos se ha terminado')
    }
}
