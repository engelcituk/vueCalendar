import * as moment from 'moment'

export default {
    selectedDate: moment(),
    eventsData: [],
    eventsInSelectedDate:[],
    eventsDataCountForYear: [],
    locations: [],
    calendarError: null,
    modeCalendar: 'month',
    selectedEvent: null
}