import * as moment from 'moment'

export default {
    selectedDate: moment(),
    days:[],
    eventsData: [],
    eventsInSelectedDate:[],
    locations: [],
    calendarError: null,    
    selectedEvent: null,
    selectedLocationFilter: 'all',
    selectedLocation: null
}