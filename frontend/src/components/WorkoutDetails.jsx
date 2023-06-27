import { useWorkoutsContext } from "../customHooks/useWorkoutsContext"
import { formatDistanceToNow } from 'date-fns'

export default function WorkoutDetails({workOut}) {
  const {dispatch} = useWorkoutsContext()
  
  const handleClick = async ()=>{
    const response = await fetch('/api/workouts/' + workOut._id,{
      method:'DELETE'
    })

    const json = await response.json()
    if(response.ok){
      dispatch({type:'DELETE_WORKOUT', payload:json});
    }
  }

  return (
    <div className="workout-details">
        <h4>{workOut.title}</h4>
        <p><strong>Load(kg):</strong>{workOut.load}</p>
        <p><strong>Reps:</strong>{workOut.reps}</p>
        <p>{formatDistanceToNow(new Date(workOut.createdAt), {addSuffix : true})}</p>
        <span className="material-symbols-outlined"  onClick={handleClick}>delete</span>
    </div>
  )
}
