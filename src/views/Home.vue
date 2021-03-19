<template>

  <antLayout>
    <antLayoutContent style="padding: 0 50px">      
      <div :style="{ background: '#fff', marginTop:'24px',   }">
        <EventsCalendar/>            
      </div> 
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi illo, officiis sapiente magnam quasi natus saepe cupiditate? Facilis repellendus vero dolore distinctio error beatae est perspiciatis minima, laudantium et amet.          
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
