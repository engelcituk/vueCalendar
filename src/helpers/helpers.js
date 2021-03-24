import * as moment from 'moment'

const handlerErrors = ( errorMessage, errorResponse ) => {    
    let stringError = ''
    const responseStatus =  errorResponse.status || false 
    const responseStatusText = errorResponse.statusText || false 
    const responseStatusDataDetail = errorResponse.data.detail || false 

    stringError += '<strong>Error message:</strong> ' + errorMessage + '<br>'

    if( responseStatus ){
        stringError += '<strong>Error code:</strong> ' +responseStatus +'<br>'
    }

    if( responseStatusText ){
        stringError += '<strong>Status text:</strong> ' +responseStatusText +'<br>'
    }

    if( responseStatusDataDetail ){
        stringError += '<strong>Detail:</strong> ' +responseStatusDataDetail +'<br>'
    }

    return stringError
}


const getDaysArray = (year, month) => {    
    const names = Object.freeze( [ 'Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado' ])
    const date = new Date(year, month, 1)
    const result = []
    while ( date.getMonth() == month ) { 
      const key = Math.random().toString(36).substring(2,9)
      const momentDate = moment( new Date(year, month, date.getDay()) )      
      result.push( {key, dayNumber: `${date.getDate()}`, dayName: `${names[date.getDay()]}`, momentDate })
      date.setDate(date.getDate() + 1)
    }
    return result
}

const countEventsInLocationByDay = (idLocation, date, events) => {   
    return events.filter( item => item.dateEvent === date && item.location === idLocation ).length
}

export { 
    handlerErrors,
    getDaysArray,
    countEventsInLocationByDay
}

