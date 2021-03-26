
export function setDaysMonth(state, days) {
    state.days = days
}

export function setEventsData(state, events) {
    state.eventsData = events
}
export function setEventsInSelectedDate(state, eventos) {
    state.eventsInSelectedDate = eventos
}
export function setLocationsData(state, locations) {
    state.locations = locations
}
export function setSelectedLocation(state, idLocation) {
    state.selectedLocation = idLocation
}
export function setEventsDataCountForYear(state, count) {
    state.eventsDataCountForYear = count
}

export function setModeCalendar(state, mode) {
    state.modeCalendar = mode
}

export function setSelectedDate(state, date) {
    state.selectedDate = date
}

export function setSelectedEvent(state, event) {
    state.selectedEvent = event
}

export function setCalendarError(state, error) {
    state.calendarError = error
}

export function unsetSelectedEvent(state) {
    state.selectedEvent = null
}