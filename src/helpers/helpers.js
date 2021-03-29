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
    const names = Object.freeze( [ 'D', 'L', 'M', 'M', 'J', 'V', 'S' ])    
    const date = new Date(year, month, 1)
    const result = []
    while ( date.getMonth() == month ) { 
      const key = Math.random().toString(36).substring(2,9)
      const momentDate = moment( date )      
      result.push( {key, dayNumber: `${date.getDate()}`, dayName: `${names[date.getDay()]}`, momentDate })
      date.setDate(date.getDate() + 1)
    }
    return result
}

const countEventsInLocationByDay = (idLocation, date, events) => {   
    return events.filter( item => item.fechaInicio === date && item.location === idLocation ).length
}

const yearsMinMax = () =>  {
    const yearMin = moment().subtract(5, 'years').year()
    const yearMax = moment().add(5, 'years').year()
    return { yearMin, yearMax}
}
export { 
    handlerErrors,
    getDaysArray,
    countEventsInLocationByDay,
    yearsMinMax
}

/**
 const years = (back) => {
  const year = new Date().getFullYear();
  return Array.from({length: back}, (v, i) => year - back + i + 1);
}

console.log(years(3));
 */