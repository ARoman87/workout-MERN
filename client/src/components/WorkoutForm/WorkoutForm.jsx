import {useState, useEffect} from "react"
import "./WorkoutForm.css"
import { useWorkoutsContext } from "../../hooks/useWorkoutContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import data from "../../data"






const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  const [title, setTitle] = useState("")
  const [load, setLoad] = useState("")
  const [reps, setReps] = useState("")
  const [img, setImg] = useState("")
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  useEffect(() => {
    data.filter(x => {
      if(title === x.workout) {
        setImg(x.img)
      }
    })
  }, [title])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }
    

    const workout = {title, load, reps, img}

    



    const response = await fetch('https://workout-log-api.onrender.com/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle("")
      setLoad("")
      setReps("")
      setImg("")
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  }

  

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <select
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields?.includes('title') ? 'error' : ''}
      >
        <option value="">--Choose--</option>
        <option value="Bench Press">Bench Press</option>
        <option value="Bench Press (Incline)">Bench Press (Incline)</option>
        <option value="Bench Press (Decline)">Bench Press (Decline)</option>
        <option value="Chest Fly">Chest Fly</option>
        <option value="Triceps Extension">Triceps Extension</option>
        <option value="Triceps Pulldown">Triceps Pulldown</option>
        <option value="Dips">Dips</option>
        <option value="Bicep Curls">Bicep Curls</option>
        <option value="Hammer Curls">Hammer Curls</option>
        <option value="Lat Pulldown">Lat Pulldown</option>
        <option value="Lat Row">Lat Row</option>
        <option value="Squats">Squats</option>
        <option value="Leg Press">Leg Press</option>
        <option value="Leg Extensions">Leg Extensions</option>
        <option value="Leg Curl">Leg Curl</option>
        <option value="Deadlift">Deadlift</option>
        <option value="Calves">Calves</option>
        <option value="Hip Thrusters">Hip Thrusters</option>
      </select>

      <label>Load (in lbs):</label>
      <input 
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields?.includes('load') ? 'error' : ''}
      />

      <label>Reps:</label>
      <input 
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields?.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}


export default WorkoutForm