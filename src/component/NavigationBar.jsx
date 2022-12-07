import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllTopics } from "../Api";

const NavigationBar = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getAllTopics().then((allTopics) => {
      setTopics(allTopics);
    });
  }, []);

  return (
    <section className="NavigationBar">
      <Link to="/" className="NavigationBar--link">Home</Link>
      {topics.map((topic, index) => {
        return (
          <Link key={topic.slug} to={`/topics/${topic.slug}`} className="NavigationBar--link">
            {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
          </Link>
        );
      })}
    </section>
  );
};

export default NavigationBar;
