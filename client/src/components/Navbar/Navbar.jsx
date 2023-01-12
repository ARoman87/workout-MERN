import  {Link} from "react-router-dom"

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="container">
                <Link to={"/"}>
                    <h1>Workout Buddy</h1>
                </Link>
            </div>
        </div>
    )
}