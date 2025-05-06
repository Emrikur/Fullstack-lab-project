import { useState, useEffect } from "react"

function CrewDetails({value}){

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [_isWorker, setWorker] = useState([])


useEffect(() => {

  fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((result) => {
        setWorker(result)
        value(result.users)
        //console.log(result.users[0].firstName)

})



},[value])



  return

}

export default CrewDetails
