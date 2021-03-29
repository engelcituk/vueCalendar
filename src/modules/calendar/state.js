import * as moment from 'moment'

export default {
    selectedDate: moment(),
    days:[],
    eventsData: [],
    eventsInSelectedDate:[],
    locations: [],
    groups:[],
    calendarError: null,    
    selectedEvent: null,
    selectedLocationFilter: 'all',
    selectedLocation: null
}