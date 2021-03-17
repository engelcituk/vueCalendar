<template>
  <antLayout>
    <antLayoutContent style="padding: 0 50px">      
      <div :style="{ background: '#fff', marginTop:'24px',   }">
            <EventsCalendar/>            
      </div>
      <!-- <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt ut dignissimos, molestiae officiis aperiam repudiandae impedit itaque perferendis illo, maxime labore ex quibusdam quam doloribus fuga, excepturi quo assumenda eius.
            </div>
            
            
            <div>
    <b-button v-b-toggle.sidebar-backdrop>Toggle Sidebar</b-button>

    <b-sidebar
      id="sidebar-backdrop"
      title="Sidebar with backdrop"
      right 
      :backdrop-variant="variant"
      backdrop
      shadow
      width="500px" 
    >
      <div class="px-3 py-2">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab sint exercitationem impedit eveniet. Reprehenderit ipsam ad, quia dolor a veritatis nisi aliquam voluptas ducimus expedita possimus provident quidem tenetur voluptatibus.
      </div>
    </b-sidebar>
  </div>
            -->
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
