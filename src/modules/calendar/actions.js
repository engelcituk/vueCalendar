import Vue from 'vue'

export async function fetchEvents(context, params){ 
    const { month, year } = params
    const eventsData = []   
    try {
        const response = await Vue.axios({ 
            url:`/events?month=${month}&year=${year}`  
        })
        const payload = response && response.data
        
        if( payload.length ){
            payload.map( event => {
                if( !Array.isArray( eventsData[event.day] )){
                    eventsData[event.day] = []
                }
                eventsData[event.day].push(event)  
            })
        }
        context.commit('setEventsData', eventsData )        
    } catch (error) {        
        context.commit('setCalendarError', error.message)
    } finally {
        console.log('La petición para obtener la lista de eventos se ha terminado')
    }
}

export async function fetchEventsScheduler(context, params){ 
    const { month, year } = params      
    try {
        const response = await Vue.axios({ 
            url:`/events?month=${month}&year=${year}`  
        })
        const payload = response && response.data        
        context.commit('setEventsData', payload )        
    } catch (error) {        
        context.commit('setCalendarError', error.message)
    } finally {
        console.log('La petición para obtener la lista de eventos del scheduler se ha terminado')
    }
}

export async function fetchLocationsScheduler(context, params){         
    try {
        const response = await Vue.axios({ 
            url:`/locations/`  
        })
        const payload = response && response.data        
        context.commit('setLocationsData', payload )        
    } catch (error) {        
        context.commit('setCalendarError', error.message)
    } finally {
        console.log('La petición para obtener la lista de locations del scheduler se ha terminado')
    }
}

export async function fetchCountEventsForYear(context, date){ 

    const { year } = date
    const eventsDataCountForYear = [] 
    try {
        const response = await Vue.axios({ 
            url:`/events?year=${year}`  
        })
        const payload = response && response.data
        
        if( payload.length ){
            payload.map( event => {
                eventsDataCountForYear[ event.month ] = Math.floor( Math.random() * 250)
            })
        }

        context.commit('setEventsDataCountForYear', eventsDataCountForYear )        

    } catch (error) {        
        context.commit('setCalendarError', error.message)
    } finally {
        console.log('La petición para obtener el conteo de eventos se ha terminado')
    }
}

export async function saveEvent({commit}, event) {    
    try {         
        const response = await Vue.axios({
            method:'POST',                        
            url:`/events/`,
            data: event
        })  
        const respuesta = response && response.data  

    } catch (error) {
        commit('setCalendarError', error.message)
    } finally {        
        console.log('La petición para guardar el evento finalizó')
    }
}

export async function updateEvent({commit}, evento) {   
    const { id } = evento       
    try {         
        const response = await Vue.axios({
            method:'PATCH',                        
            url:`/events/${id}`,
            data: evento
        })  
        const respuesta = response && response.data  

    } catch (error) {
        commit('setCalendarError', error.message)
    } finally {        
        console.log('La petición para actualizar el evento finalizó')
    }
}


export async function deleteEvent({commit}, evento) {
    const { id } = evento       
    try {         
        const response = await Vue.axios({
            method:'DELETE',                        
            url:`/events/${id}`,            
        })  
        const respuesta = response && response.data  

    } catch (error) {
        commit('setCalendarError', error.message)
    } finally {        
        console.log('La petición para borrar el evento finalizó')
    }
}