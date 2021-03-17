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
                eventsDataCountForYear[ event.month ] = Math.floor( Math.random() * 101)
            })
        }

        context.commit('setEventsDataCountForYear', eventsDataCountForYear )        

    } catch (error) {        
        context.commit('setCalendarError', error.message)
    } finally {
        console.log('La petición para obtener el conteo de eventos se ha terminado')
    }
}