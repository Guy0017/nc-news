import { Link } from "react-router-dom"

const NavigationBar = () => {

    return (
        <section className="NavigationBar">
        <Link to="">Home</Link>|
        <Link to="">Cooking</Link>|
        <Link to="">Coding</Link>|
        <Link to="">Football</Link>
        </ section>
    )
}

export default NavigationBar