import HandleTripSearch from "../../components/HandleTripSearch"
//import { useState } from "react"

interface BookTrip {
  isBusStops:{ stops: string, id:number},
  props:{stops:string}

}


function BookTrip(){


  return (
    <>

      <div>
        <HandleTripSearch /* get_bus_stops={apa} */ />
      </div>


    </>
  )
}

export default BookTrip






/*
{
  isBusStops &&
  isBusStops.map(
    busStops =>

  <div>
    <ul key={busStops.id}>
      <li key={busStops.stops.id}>{busStops.id}</li>

    </ul>
  </div>

  )} */
