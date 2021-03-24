<template>
  <div class='demo-app'>
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead>                    
          <tr>
            <th>Días</th>
            <th v-for="(day, index) in dias" :key="index">{{day.dayNumber}}</th>
          </tr>
          <tr>
            <th>Localizaciones</th>
            <th v-for="(day) in dias" :key="day.key">{{day.dayName}}</th>                                    
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
          precio: 20,
          codigo: "123",
      },
      {
          id: 2,
          nombre: "Localizaciones Mi A1",
          precio: 5000,
          codigo: "123444",
      },
      {
          id: 3,
          nombre: "Localizaciones Galletas",
          precio: 10,
          codigo: "20205",
      },
      {
          id: 4,
          nombre: "Localizaciones portátil",
          precio: 30000,
          codigo: "7700545",
      },
      ]      
    }
  },
  methods: {
    getDaysArray (year, month){    
      const names = Object.freeze( [ 'Dom', 'Lunes', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ])
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

