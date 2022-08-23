import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <section className="NavigationBar">
      <Link to="">Home</Link>|<Link to="/topics/cooking">Cooking</Link>|
      <Link to="/topics/coding">Coding</Link>|
      <Link to="/topics/football">Football</Link>
    </section>
  );
};

export default NavigationBar;
