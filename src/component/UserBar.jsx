import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext"

const UserBar = () => {

    const { loggedInUser } = useContext(UserContext)

    return (
        <section className="UserBar">
            <label>User: {loggedInUser.name}</label>|
            <Link to="">Change User</Link>
        </section> 
    )
}

export default UserBar