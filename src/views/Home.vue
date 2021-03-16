<template>
  <antLayout>
    <antLayoutContent style="padding: 0 50px">      
      <div :style="{ background: '#fff', marginTop:'24px',   }">
            <EventsCalendar/>            
      </div>
      <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt ut dignissimos, molestiae officiis aperiam repudiandae impedit itaque perferendis illo, maxime labore ex quibusdam quam doloribus fuga, excepturi quo assumenda eius.
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
