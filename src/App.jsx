import { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";


const url = 'https://course-api.com/react-tours-project';

const App = () => {
  const [isLoading, setIsLoading] =  useState(true)
  const [tours, setTours] = useState([])

  const removeTour = (id) =>{
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }

  const fetchTourInfo = async () => {
    setIsLoading(true)
    try {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    setTours(data)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  useEffect(()=>{
    fetchTourInfo()
  }, [])

  if(isLoading){
    return(
      <main>
        <Loading />
      </main>
    )
  }

  if(tours.length === 0){
    return <main>
      <div className="title">
        <h2>NO TOURS LEFT!!!</h2>
        <button type="button" style={{marginTop:'2rem'}} onClick={()=>fetchTourInfo()} >
          Let me choose again!
        </button>
      </div>
    </main>
  }

  return <main>
    <Tours tours={tours} removeTour={removeTour}/>
  </main>
};
export default App;
