import "./WorkoutDetails.css"

export default function WorkoutDetails(props) {
    return (
        <div className="workout-details">
            <h4>{props.workout.title}</h4>
            <p><strong>Load (lbs):</strong> {props.workout.load}</p>
            <p><strong>Reps:</strong> {props.workout.reps}</p>
            <p>{props.workout.createdAt}</p>
        </div>
    )
}