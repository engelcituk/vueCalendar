<template>
  <div class='demo-app'>
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead>                    
          
          <tr>
            <th>Localizaciones/días </th>
            <th v-for="(day) in dias" :key="day.key">
              <div class="text-center">
                {{day.dayName}} <br>
                {{day.dayNumber}}
              </div>
            </th>                                    
          </tr> 
        </thead>
        <tbody>
            <tr v-for="(producto, index) in productos" :key="index">
                <td >{{producto.nombre}}</td>
                <td v-for="(day, index) in dias" :key="index"></td>
            </tr>
        </tbody>
    </table>
    </div>        
  </div>
</template>

<script>
import * as moment from 'moment'

export default {
  async mounted(){               
            
  },
  data() {
    return {
      dias: this.getDaysArray( moment().year(), moment().month() ),
      productos : [{
          id: 1,
          nombre: "Localizaciones Logitech",
          
      },
      {
          id: 2,
          nombre: "Localizaciones Mi A1",
          
      },
      {
          id: 3,
          nombre: "Localizaciones Galletas",
          
      },
      {
          id: 4,
          nombre: "Localizaciones port",          
      },
      ]      
    }
  },
  methods: {
    getDaysArray (year, month){    
      const names = Object.freeze( [ 'Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado' ])
      const date = new Date(year, month, 1)
      const result = []
      while ( date.getMonth() == month) { 
        const key = Math.random().toString(36).substring(2,9)
        const momentDate = moment( new Date(year, month, date.getDay()) )      
        result.push( {key, dayNumber:`${date.getDate()}`, dayName:`${names[date.getDay()]}`, momentDate })
        date.setDate(date.getDate() + 1)
      }
      return result
    }
  }
}
</script>

<style>


.table-responsive::-webkit-scrollbar
{
  height: 7px; 
  width: 7px;
  background-color: #F5F5F5;
}
.table-responsive::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
}

.table-responsive::-webkit-scrollbar-thumb:horizontal
{
	background-color: #0ae;	
	background-image: -webkit-gradient(linear, 0 0, 0 100%, color-stop(.5, rgba(255, 255, 255, .2)), color-stop(.5, transparent), to(transparent));
}

</style>