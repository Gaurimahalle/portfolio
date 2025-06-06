import React, { useRef, useEffect } from 'react';
import './ContactPage.css';

function ContactPage({ isDarkMode }) {
  const contentRef = useRef(null);

  useEffect(() => {
    // Function to handle animation when element enters or exits viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When the contact page enters the viewport
        if (entry.isIntersecting) {
          if (contentRef.current) contentRef.current.classList.add('fade-in');
        } else {
          // When the contact page exits the viewport, remove classes to reset animations
          if (contentRef.current) contentRef.current.classList.remove('fade-in');
        }
      });
    }, { threshold: 0.2 });

    // Observe the contact page
    const contactPage = document.getElementById('contact-page');
    if (contactPage) {
      observer.observe(contactPage);
    }

    return () => {
      if (contactPage) {
        observer.unobserve(contactPage);
      }
    };
  }, []);

  return (
    <div 
      className={`contact-page ${isDarkMode ? 'dark' : 'light'}`} 
      id="contact-page"
      style={{
        backgroundColor: isDarkMode ? '#000000' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#000000'
      }}
    >
      <div className="contact-content" ref={contentRef}>
        {/* Added text content */}
        <div className="contact-intro">
          <h1 style={{ 
            color: isDarkMode ? '#ffffff' : '#000000',
            margin: '0 0 20px 0'
          }}>
            Great things happen when data meets purpose.
          </h1>
          <p style={{ 
            color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
            fontSize: '1.1rem',
            lineHeight: '1.6'
          }}>
            I'm eager to bring my skills to a team that values insight-driven impact. Let's connect and create something remarkable.
          </p>
        </div>
        
        <div className="social-icons-container">
          <div className="social-icons">
            {/* Email Icon */}
            <a 
              href="mailto:gauri.mahalle812@gmail.com" 
              className="social-icon"
              style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20,4H4C2.895,4,2,4.895,2,6v12c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2V6C22,4.895,21.105,4,20,4z M20,8l-8,5l-8-5V6l8,5l8-5V8z"/>
              </svg>
            </a>
            
            {/* LinkedIn Icon */}
            <a 
              href="https://www.linkedin.com/in/gaurimahalle/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M9,17H6.477v-7H9V17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2S8.551,8.717,7.694,8.717z M18,17h-2.442v-3.826c0-1.058-0.651-1.302-0.895-1.302s-1.058,0.163-1.058,1.302c0,0.163,0,3.826,0,3.826h-2.523v-7h2.523v0.977C13.93,10.407,14.581,10,15.802,10C17.023,10,18,10.977,18,13.174V17z"/>
              </svg>
            </a>
            
            {/* GitHub Icon */}
            <a 
              href="https://github.com/Gaurimahalle" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2C6.477,2,2,6.477,2,12c0,4.419,2.865,8.166,6.839,9.489c0.5,0.09,0.682-0.217,0.682-0.48c0-0.236-0.009-0.866-0.014-1.699c-2.782,0.602-3.369-1.34-3.369-1.34c-0.455-1.157-1.11-1.465-1.11-1.465c-0.909-0.62,0.069-0.608,0.069-0.608c1.004,0.071,1.532,1.03,1.532,1.03c0.891,1.529,2.341,1.089,2.91,0.833c0.091-0.647,0.349-1.086,0.635-1.337c-2.22-0.251-4.555-1.111-4.555-4.943c0-1.091,0.39-1.984,1.03-2.682c-0.103-0.253-0.446-1.272,0.098-2.65c0,0,0.84-0.269,2.75,1.022C8.33,6.532,9.16,6.415,10,6.41c0.84,0.004,1.67,0.122,2.44,0.355c1.909-1.29,2.747-1.022,2.747-1.022c0.544,1.378,0.202,2.398,0.1,2.65c0.64,0.699,1.026,1.591,1.026,2.682c0,3.841-2.337,4.687-4.565,4.935c0.359,0.307,0.679,0.917,0.679,1.852c0,1.335-0.012,2.415-0.012,2.741c0,0.269,0.18,0.58,0.688,0.481C19.138,20.161,22,16.416,22,12C22,6.477,17.523,2,12,2z"/>
              </svg>
            </a>
            
            {/* HackerRank Icon */}
            <a 
              href="https://www.hackerrank.com/profile/gauri_mahalle812" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,0,4.455,4.773v14.454L12,24l7.545-4.773V4.773Zm0,3.818,4.773,3.033v10.3L12,20.182l-4.773-3.033v-10.3Z"/>
                <path d="M10.091,13.091v-2.182h3.818v2.182Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;