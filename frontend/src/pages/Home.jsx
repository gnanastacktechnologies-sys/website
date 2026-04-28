import Hero from '../components/Hero';
import Products from '../components/Products';
import Services from '../components/Services';
import WhyChoose from '../components/WhyChoose';
import Process from '../components/Process';
import About from '../components/About';
import TechStack from '../components/TechStack';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <TechStack />
      <Products />
      <Services />
      <WhyChoose />
      <Process />
      <About />
      <Projects />
      <Contact />
    </>
  );
};

export default Home;
