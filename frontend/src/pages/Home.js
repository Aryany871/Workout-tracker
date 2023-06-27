//hooks
import { useEffect } from "react"
import { useWorkoutsContext } from "../customHooks/useWorkoutsContext";

//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

export default function Home() {
  const {workouts, dispatch} = useWorkoutsContext()

  useEffect(()=>{
    const fetchWorkouts = async ()=>{
      const response = await fetch("/api/workouts")
      const json = await response.json() //to parse the incoming JSON response
      if(response.ok){
        dispatch({type:"SET_WORKOUTS", payload:json});
      }
    };

    fetchWorkouts();
  },[dispatch])

  return (
    <div className='home'>
        <div className="workouts">
          {workouts && workouts.map((workOut)=>(
            <WorkoutDetails key={workOut._id} workOut={workOut}/>
          ))}
        </div>
        <WorkoutForm/>
    </div>
  )
}
