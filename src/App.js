import React, { useState, useRef, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';  // Theme Icons
import { FiMenu, FiX } from 'react-icons/fi'; // Menu Icons
import './App.css';
import ParticlesComponent from './particles';  // Import the updated particles.js
import image from './assets/image.png';  // Import your profile image
import ThirdPage from './ThirdPage'; // Import the separated ThirdPage component
import SkillsPage from './SkillsPage'; // Import the SkillsPage component
import ContactPage from './ContactPage'; // Import the new ContactPage component
// Import your resume PDF - add this line
import resume from './assets/Resume_GauriMahalle.pdf'; // You'll need to add your PDF file to this path

function FirstPage({ isDarkMode }) {
  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`} id="first-page" style={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}>
      {/* Particles component only rendered within FirstPage */}
      <ParticlesComponent isDarkMode={isDarkMode} />

      <div className="App-header">
        <h1>Hello I'm <span role="img" aria-label="waving-hand" className="waving-hand">👋</span></h1>
        <h2>Gauri Mahalle</h2>
        <div className="analyst-text">
          <p>As a <span className="data-analyst">Data Analyst</span>, I specialize in converting complex data into
          <br />
          actionable insights and delivering precise, data-driven solutions.
          </p>
        </div>
      </div>
    </div>
  );
}

function SecondPage({ isDarkMode }) {
  const curveRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const [showJourneyModal, setShowJourneyModal] = useState(false);

  useEffect(() => {
    // Function to handle animation when element enters or exits viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When the second page enters the viewport
        if (entry.isIntersecting) {
          if (curveRef.current) curveRef.current.classList.add('animate-curve');
          if (imageRef.current) imageRef.current.classList.add('fade-in');
          if (contentRef.current) contentRef.current.classList.add('fade-in');
        } else {
          // When the second page exits the viewport, remove classes to reset animations
          if (curveRef.current) curveRef.current.classList.remove('animate-curve');
          if (imageRef.current) imageRef.current.classList.remove('fade-in');
          if (contentRef.current) contentRef.current.classList.remove('fade-in');
        }
      });
    }, { threshold: 0.2 });

    // Observe the second page
    const secondPage = document.getElementById('second-page');
    if (secondPage) {
      observer.observe(secondPage);
    }

    return () => {
      if (secondPage) {
        observer.unobserve(secondPage);
      }
    };
  }, []);

  return (
    <div 
      className={`second-page ${isDarkMode ? 'dark' : 'light'}`} 
      id="second-page"
      style={{
        backgroundColor: isDarkMode ? '#000000' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#000000'
      }}
    >
      <div className="curve-container">
        <svg 
          ref={curveRef}
          className="decorative-curve" 
          viewBox="0 0 1400 600" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,300 Q400,100 700,300 T1400,300" 
            stroke="#CC7351" 
            strokeWidth="4" 
            fill="none"
          />
        </svg>
      </div>

      <div className="about-section">
        <div ref={imageRef} className="about-image" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Using an image instead of the placeholder div */}
          <img 
            src={image} 
            alt="Gauri Mahalle" 
            className="image" 
          />
          
          {/* My Journey Link - Centered below the image */}
          <div 
            onClick={() => setShowJourneyModal(true)}
            style={{
              marginTop: '30px',
              cursor: 'pointer'
            }}
          >
            <span style={{
              color: '#CC7351',
              fontFamily: 'Times New Roman, serif',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              letterSpacing: '2px',
              transition: 'all 0.3s ease',
              borderBottom: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderBottom = '2px solid #CC7351';
              e.target.style.transform = 'translateX(5px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderBottom = '2px solid transparent';
              e.target.style.transform = 'translateX(0px)';
            }}
            >
              My Journey &gt;
            </span>
          </div>
        </div>
        
        <div ref={contentRef} className="about-content">
          <h2 style={{ color: '#CC7351' }}>So, Who I am?</h2>
          <p style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)' }}>
          I'm a master's student at the University of North Texas, specializing in Advanced Data Analytics.
          With a strong foundation in data modeling, statistical analysis, and machine learning, 
          I enjoy every stage of the data analytics proces from cleaning and exploring data 
          to building predictive models and visualizing results. I'm always eager to expand my knowledge, 
          collaborate on impactful projects, and apply data-driven solutions to real-world challenges.
          </p>
        </div>
      </div>

      {/* My Journey Modal */}
      {showJourneyModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px',
            animation: 'fadeIn 0.3s ease-out'
          }}
          onClick={() => setShowJourneyModal(false)}
        >
          <div 
            style={{
              backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
              borderRadius: '15px',
              padding: '40px',
              maxWidth: '800px',
              maxHeight: '80vh',
              overflowY: 'auto',
              position: 'relative',
              border: `3px solid #CC7351`,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              animation: 'slideIn 0.4s ease-out',
              transform: 'scale(1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowJourneyModal(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '20px',
                background: 'none',
                border: 'none',
                fontSize: '2rem',
                color: '#CC7351',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ×
            </button>

            {/* Journey Content */}
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ 
                color: '#CC7351', 
                fontFamily: 'Times New Roman, serif',
                fontSize: '2.5rem',
                marginBottom: '40px',
                fontWeight: 'bold'
              }}>
                My Journey
              </h2>
              
              <div className="journey-timeline" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                alignItems: 'center',
                position: 'relative'
              }}>
                {/* Timeline line */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '0',
                  bottom: '0',
                  width: '3px',
                  backgroundColor: '#CC7351',
                  transform: 'translateX(-50%)',
                  zIndex: 1
                }}></div>

                {/* Journey Item 1 */}
                <div className="journey-item" style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: '700px',
                  position: 'relative',
                  zIndex: 2
                }}>
                  <div style={{
                    flex: 1,
                    textAlign: 'right',
                    paddingRight: '25px'
                  }}>
                    <h3 style={{ 
                      color: '#CC7351', 
                      fontFamily: 'Times New Roman, serif',
                      fontSize: '1.3rem',
                      margin: '0 0 8px 0'
                    }}>
                      2019-2023 - Bachelor's Degree
                    </h3>
                    <p style={{ 
                      color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
                      fontFamily: 'Times New Roman, serif',
                      fontSize: '1rem',
                      margin: 0
                    }}>
                      Bachelor of Engineering in Artificial Intelligence from GH Raisoni College of Engineering, Nagpur, India
                    </p>
                  </div>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#CC7351',
                    borderRadius: '50%',
                    border: `3px solid ${isDarkMode ? '#1a1a1a' : '#fff'}`,
                    flexShrink: 0
                  }}></div>
                  <div style={{ flex: 1, paddingLeft: '25px' }}></div>
                </div>

                {/* Journey Item 2 */}
                <div className="journey-item" style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: '700px',
                  position: 'relative',
                  zIndex: 2
                }}>
                  <div style={{ flex: 1, paddingRight: '25px' }}></div>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#CC7351',
                    borderRadius: '50%',
                    border: `3px solid ${isDarkMode ? '#1a1a1a' : '#fff'}`,
                    flexShrink: 0
                  }}></div>
                  <div style={{
                    flex: 1,
                    textAlign: 'left',
                    paddingLeft: '25px'
                  }}>
                    <h3 style={{ 
                      color: '#CC7351', 
                      fontFamily: 'Times New Roman, serif',
                      fontSize: '1.3rem',
                      margin: '0 0 8px 0'
                    }}>
                      2023-2024 - Industry Experience
                    </h3>
                    <p style={{ 
                      color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
                      fontFamily: 'Times New Roman, serif',
                      fontSize: '1rem',
                      margin: 0
                    }}>
                      Data Analyst at Cognizant Technology Solutions, developing expertise in data analytics and business intelligence
                    </p>
                  </div>
                </div>

                {/* Journey Item 3 */}
                <div className="journey-item" style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: '700px',
                  position: 'relative',
                  zIndex: 2
                }}>
                  <div style={{
                    flex: 1,
                    textAlign: 'right',
                    paddingRight: '25px'
                  }}>
                    <h3 style={{ 
                      color: '#CC7351', 
                      fontFamily: 'Times New Roman, serif',
                      fontSize: '1.3rem',
                      margin: '0 0 8px 0'
                    }}>
                      2024 - Present
                    </h3>
                    <p style={{ 
                      color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
                      fontFamily: 'Times New Roman, serif',
                      fontSize: '1rem',
                      margin: 0
                    }}>
                      Pursuing Master's in Advanced Data Analytics at University of North Texas
                    </p>
                  </div>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#CC7351',
                    borderRadius: '50%',
                    border: `3px solid ${isDarkMode ? '#1a1a1a' : '#fff'}`,
                    flexShrink: 0
                  }}></div>
                  <div style={{ flex: 1, paddingLeft: '25px' }}></div>
                </div>

                {/* Journey Item 4 */}
                <div className="journey-item" style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: '700px',
                  position: 'relative',
                  zIndex: 2
                }}>
                  <div style={{ flex: 1, paddingRight: '25px' }}></div>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#CC7351',
                    borderRadius: '50%',
                    border: `3px solid ${isDarkMode ? '#1a1a1a' : '#fff'}`,
                    flexShrink: 0
                  }}></div>
                  <div style={{
                    flex: 1,
                    textAlign: 'left',
                    paddingLeft: '25px'
                  }}>
                    <h3 style={{ 
                      color: '#CC7351', 
                      fontFamily: 'Times New Roman, serif',
                      fontSize: '1.3rem',
                      margin: '0 0 8px 0'
                    }}>
                      Current Role
                    </h3>
                    <p style={{ 
                      color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
                      fontFamily: 'Times New Roman, serif',
                      fontSize: '1rem',
                      margin: 0
                    }}>
                      Information Technology Operations Specialist at University of North Texas
                    </p>
                  </div>
                </div>

                {/* Journey Item 5 */}
                <div className="journey-item" style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: '700px',
                  position: 'relative',
                  zIndex: 2
                }}>
                  <div style={{
                    flex: 1,
                    textAlign: 'right',
                    paddingRight: '25px'
                  }}>
                    <h3 style={{ 
                      color: '#CC7351', 
                      fontFamily: 'Times New Roman, serif',
                      fontSize: '1.3rem',
                      margin: '0 0 8px 0'
                    }}>
                      Future Aspirations
                    </h3>
                    <p style={{ 
                      color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
                      fontFamily: 'Times New Roman, serif',
                      fontSize: '1rem',
                      margin: 0
                    }}>
                      Aspiring to become a leading data scientist contributing to innovative solutions
                    </p>
                  </div>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#CC7351',
                    borderRadius: '50%',
                    border: `3px solid ${isDarkMode ? '#1a1a1a' : '#fff'}`,
                    flexShrink: 0
                  }}></div>
                  <div style={{ flex: 1, paddingLeft: '25px' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openResume = () => {
    // Create an anchor element and use it to download the PDF
    const link = document.createElement('a');
    link.href = resume; // Use the imported PDF
    link.download = 'Gauri_Mahalle_Resume.pdf'; // Name the file will be saved as
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const scrollToNextPage = () => {
    document.getElementById('second-page').scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false); // Close menu after navigation
  };
  
  const scrollToThirdPage = () => {
    document.getElementById('third-page').scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false); // Close menu after navigation
  };
  
  const scrollToSkillsPage = () => {
    document.getElementById('skills-page').scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false); // Close menu after navigation
  };
  
  const scrollToContactPage = () => {
    document.getElementById('contact-page').scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false); // Close menu after navigation
  };

  const scrollToFirstPage = () => {
    document.getElementById('first-page').scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false); // Close menu after navigation
  };

  // Effect to apply theme to the entire document
  useEffect(() => {
    // Prevent horizontal scrolling - Apply this first
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.width = '100%';
    document.body.style.width = '100%';
    document.documentElement.style.maxWidth = '100vw';
    document.body.style.maxWidth = '100vw';
    document.documentElement.style.position = 'relative';
    document.body.style.position = 'relative';
    
    // Add a style tag to force overflow:hidden
    const styleElement = document.createElement('style');
    styleElement.id = "force-overflow-hidden";
    styleElement.textContent = `
      html, body, #root, .app-container, .App {
        overflow-x: hidden !important;
        max-width: 100vw !important;
        width: 100% !important;
      }
      /* Hide scrollbar for webkit browsers */
      ::-webkit-scrollbar {
        display: none;
      }
      
      /* Modal animations */
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: scale(0.8) translateY(-20px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      
      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
      
      @keyframes slideOut {
        from {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
        to {
          opacity: 0;
          transform: scale(0.8) translateY(-20px);
        }
      }
    `;
    document.head.appendChild(styleElement);

    // Update body class when theme changes - this will affect all pages
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
      document.body.style.backgroundColor = '#000000';
    } else {
      document.body.classList.add('light-mode');
      document.body.style.backgroundColor = '#ffffff';
    }
    
    // Remove any dividers
    const dividers = document.querySelectorAll('.page-divider');
    dividers.forEach(divider => {
      divider.remove();
    });
    
    // Apply smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Remove scrollbars
    document.documentElement.style.scrollbarWidth = 'none';
    document.documentElement.style.msOverflowStyle = 'none';
    
    return () => {
      document.body.classList.remove('light-mode');
      document.body.style.backgroundColor = '';
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
      document.documentElement.style.width = '';
      document.body.style.width = '';
      document.documentElement.style.maxWidth = '';
      document.body.style.maxWidth = '';
      document.documentElement.style.position = '';
      document.body.style.position = '';
      const styleTag = document.getElementById("force-overflow-hidden");
      if (styleTag) styleTag.remove();
    };
  }, [isDarkMode]);

  return (
    <div className="app-container" style={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}>
      {/* Global Navigation - Now available on all pages */}
      <div className="nav-controls">
        {/* Resume Button - Added before menu icon */}
        <div className={`resume-button ${isDarkMode ? 'dark' : 'light'}`} onClick={openResume}>
          Resume →
        </div>
        
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FiX size={30} color={isDarkMode ? '#fff' : '#000'} /> : <FiMenu size={30} color={isDarkMode ? '#fff' : '#000'} />}
        </div>

        <div className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? <FaSun size={30} color="#fff" /> : <FaMoon size={30} color="#000" />}
        </div>
      </div>

      <div className={`menu-box ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={scrollToFirstPage}>Home</li>
          <li onClick={scrollToNextPage}>About Me</li>
          <li onClick={scrollToThirdPage}>Projects</li>
          <li onClick={scrollToSkillsPage}>Skills</li>
          <li onClick={scrollToContactPage}>Contact</li>
        </ul>
      </div>

      {/* All Pages - Now all receiving isDarkMode prop */}
      <FirstPage isDarkMode={isDarkMode} />
      <SecondPage isDarkMode={isDarkMode} />
      <ThirdPage isDarkMode={isDarkMode} />
      <SkillsPage isDarkMode={isDarkMode} />
      <ContactPage isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;