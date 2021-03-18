export function eventsInSelectedDate(state) { 
    const date =  new Date( state.selectedDate._d ) //transformo los datos de moment a date js nativo  
    const day =  date.getDate()
    return state.eventsData[day] || []
}

