<template>
  <antLayout>
    <antLayoutContent style="padding: 0 50px">      
      <div :style="{ background: '#fff', marginTop:'24px',   }">
        <EventsCalendar/>            
      </div>      
    </antLayoutContent>
  </antLayout>
</template>
<script>
import EventsCalendar from '@/components/calendar/EventsCalendar' 
export default { 
   components: {            
    EventsCalendar,
  }, 
}
</script>
