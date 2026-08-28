import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  const services = [
    {
      icon: "🩺",
      title: "Find a Doctor",
      text: "Find nearby doctors and healthcare professionals."
    },
    {
      icon: "🏥",
      title: "Nearby Hospitals",
      text: "Locate hospitals and health centres near you."
    },
    {
      icon: "📅",
      title: "Book Appointment",
      text: "Book a consultation without travelling far."
    },
    {
      icon: "💊",
      title: "Medicines",
      text: "Check medicine availability at nearby centres."
    }
  ];

  return (
    <div className="app">

      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          🏥 <span>RuralCare</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <button className="login-btn">Login</button>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="welcome">WELCOME TO RURALCARE</p>

          <h1>
            Healthcare is a right,
            <span> not a privilege.</span>
          </h1>

          <p className="hero-text">
            Making quality healthcare accessible to people living
            in rural and underserved areas.
          </p>

          {/* Search */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Search doctors, hospitals or services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>Search</button>
          </div>

          <div className="hero-buttons">
            <button className="primary-btn">Find Healthcare</button>
            <button className="secondary-btn">Emergency Help</button>
          </div>
        </div>

        <div className="hero-card">
          <div className="doctor-icon">👩🏽‍⚕️</div>
          <h2>Healthcare Near You</h2>
          <p>
            Connect with doctors, hospitals and essential
            healthcare services.
          </p>

          <div className="location">
            📍 Your Location
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services" id="services">
        <p className="section-title">OUR SERVICES</p>
        <h2>Healthcare made easier</h2>
        <p className="section-text">
          Access important healthcare services from one platform.
        </p>

        <div className="service-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <button>Explore →</button>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features" id="about">
        <div>
          <p className="section-title">WHY RURALCARE?</p>
          <h2>Healthcare shouldn't depend on where you live.</h2>
          <p>
            Our platform connects rural communities with healthcare
            resources and helps reduce the difficulties caused by
            distance and limited medical facilities.
          </p>
        </div>

        <div className="feature-list">
          <div>✓ Nearby healthcare centres</div>
          <div>✓ Doctor appointment booking</div>
          <div>✓ Emergency assistance</div>
          <div>✓ Medicine availability</div>
          <div>✓ Health information</div>
          <div>✓ Easy-to-use interface</div>
        </div>
      </section>

      {/* Emergency */}
      <section className="emergency" id="contact">
        <div>
          <h2>Need Emergency Help?</h2>
          <p>
            Quickly find the nearest hospital or emergency service.
          </p>
        </div>

        <button>🚨 Get Emergency Help</button>
      </section>

      {/* Footer */}
      <footer>
        <div>
          <h3>🏥 RuralCare</h3>
          <p>Connecting rural communities to better healthcare.</p>
        </div>

        <p>© 2026 RuralCare. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;