import React, { useRef, useEffect, useState, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function ThirdPage({ isDarkMode }) {
  const projectsRef = useRef(null);
  const titleRef = useRef(null);
  const underlineRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(2); // Start with middle card active
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);

  // Sample project data with GitHub links added
  const projects = [
    {
      id: 1,
      title: "Montgomery-Traffic-Insights",
      description: "Analyzying traffic violations in Montgomery County, focusing on temporal, demographic, and geospatial characteristics to identify patterns in the dat.",
      githubUrl: "https://github.com/Gaurimahalle/Montgomery-Traffic-Insights"
    },
    {
      id: 2,
      title: "Natural Language Based Corpus Model on a Wide Range of Medical Corpus",
      description: "Google's pre-trained BERT model for medical NLP tasks, highlighting high performance and diverse training needs.",
      githubUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4050337"
    },
    {
      id: 3,
      title: "Animal Detection for Vehicle",
      description: "This project uses deep learning to prevent animal-vehicle collisions and enhance public safety by reducing related accidents and injuries.",
      githubUrl: "https://www.ijraset.com/research-paper/animal-detection-for-vehicle"
    },
    {
      id: 4,
      title: "Big Data for Public Safety",
      description: "Leveraging big data to enhance law enforcement transparency, equity, and effectiveness through arrest trend analysis in Dallas. ",
      githubUrl: "https://github.com/Gaurimahalle/Big-Data-for-Public-Safety.git"
    },
    {
      id: 5,
      title: "Fake News Detection",
      description: "Developed a model to detect fake news using machine learning techniques for text classification..",
      githubUrl: "https://github.com/yourusername/financial-data-modeling"
    }
  ];

  // Create a duplicated array for infinite loop effect
  const loopedProjects = [...projects];

  // Function to navigate to the next slide with looping - using useCallback to memoize
  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Handle transition animation
    if (carouselRef.current) {
      carouselRef.current.classList.add('transitioning');
    }
    
    setActiveIndex((prevIndex) => {
      // When we reach the end, loop back to the beginning
      return (prevIndex === projects.length - 1) ? 0 : prevIndex + 1;
    });
    
    setTimeout(() => {
      setIsAnimating(false);
      if (carouselRef.current) {
        carouselRef.current.classList.remove('transitioning');
      }
    }, 600); // Match with CSS transition duration
  }, [isAnimating, projects.length]);

  // Function to navigate to the previous slide with looping
  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Handle transition animation
    if (carouselRef.current) {
      carouselRef.current.classList.add('transitioning');
    }
    
    setActiveIndex((prevIndex) => {
      // When we reach the beginning, loop back to the end
      return (prevIndex === 0) ? projects.length - 1 : prevIndex - 1;
    });
    
    setTimeout(() => {
      setIsAnimating(false);
      if (carouselRef.current) {
        carouselRef.current.classList.remove('transitioning');
      }
    }, 600); // Match with CSS transition duration
  }, [isAnimating, projects.length]);

  // Function to handle project card click - opens GitHub in a new tab
  const handleProjectClick = (githubUrl, event) => {
    // Prevent the click from affecting the carousel navigation
    event.stopPropagation();
    
    // Open GitHub repository in a new tab
    window.open(githubUrl, '_blank');
  };

  useEffect(() => {
    // Create an observer for the third page animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (projectsRef.current) projectsRef.current.classList.add('slide-in');
          if (underlineRef.current) {
            // Apply the style directly instead of using a class
            underlineRef.current.style.width = '400px';
          }
        } else {
          if (projectsRef.current) projectsRef.current.classList.remove('slide-in');
          if (underlineRef.current) {
            underlineRef.current.style.width = '0px';
          }
        }
      });
    }, { threshold: 0.2 });

    // Observe the third page
    const thirdPage = document.getElementById('third-page');
    if (thirdPage) {
      observer.observe(thirdPage);
    }

    // Set up auto-rotation for the carousel
    const autoRotate = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds

    return () => {
      if (thirdPage) {
        observer.unobserve(thirdPage);
      }
      clearInterval(autoRotate); // Clean up the interval when component unmounts
    };
  }, [nextSlide]); // Added nextSlide to the dependency array

  // Calculate position and style for each card with looping capability
  const getCardStyle = (index) => {
    // Calculate the shortest distance in a circular array
    let diff = index - activeIndex;
    
    // Handle looping logic
    if (diff > projects.length / 2) {
      diff = diff - projects.length;
    } else if (diff < -projects.length / 2) {
      diff = diff + projects.length;
    }
    
    // Consistent horizontal spacing with equal distribution
    let translateX = diff * 220; // Increased spacing between cards
    let translateZ = 0;
    let opacity = 1;
    let scale = 1;
    let rotateY = 0; // Add rotation for a more carousel-like effect

    // Create 3D effect based on card position
    if (diff === 0) {
      // Active card
      translateZ = 150; // Bring active card forward
      scale = 1;
      rotateY = 0;
      opacity = 1;
    } else if (Math.abs(diff) === 1) {
      // Cards directly beside active card
      translateZ = 0;
      scale = 0.85;
      rotateY = diff * 15; // Slight rotation
      opacity = 0.9;
    } else if (Math.abs(diff) === 2) {
      // Cards two positions away
      translateZ = -150;
      scale = 0.7;
      rotateY = diff * 20; // More rotation
      opacity = 0.7;
    } else {
      // Cards further away
      translateZ = -300;
      scale = 0.5;
      rotateY = diff * 25; // Even more rotation
      opacity = 0.5;
    }

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: opacity,
      zIndex: projects.length - Math.abs(diff)
    };
  };

  return (
    <>
      <div className={`third-page ${isDarkMode ? 'dark' : 'light'}`} id="third-page">
        <div ref={projectsRef} className="projects-container">
          <div className="title-container" style={{ position: 'relative', marginBottom: '30px' }}>
            <h2 ref={titleRef} style={{ 
              textAlign: 'center',
              color: '#CC7351' // Added the coral color to match Skill Set
            }}>
              Project Highlights
            </h2>
            <div 
              ref={underlineRef} 
              style={{
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '0',
                height: '3px',
                backgroundColor: isDarkMode ? '#ffffff' : '#000000', // Updated: white in dark mode, black in light mode
                transition: 'width 1.5s ease-out',
              }}
            ></div>
          </div>
          
          <div className="carousel-container" style={{ position: 'relative', height: '500px', perspective: '1000px' }}>
            <div 
              className="carousel-wrapper" 
              ref={carouselRef}
              style={{ 
                position: 'relative', 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                transformStyle: 'preserve-3d',
                transition: 'all 0.6s ease'
              }}
            >
              {loopedProjects.map((project, index) => (
                <div 
                  key={`${project.id}-${index}`} 
                  className={`carousel-card ${index === activeIndex ? 'active' : ''}`}
                  style={{
                    ...getCardStyle(index),
                    position: 'absolute',
                    padding: '25px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                    cursor: 'pointer'
                  }}
                  onClick={(e) => handleProjectClick(project.githubUrl, e)}
                >
                  <div className="card-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tech">
                      <span>{project.technologies}</span>
                    </div>
                    {/* GitHub icon and text completely removed */}
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              className="carousel-control prev" 
              onClick={prevSlide}
              style={{
                position: 'absolute',
                left: '10%',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(204, 115, 81, 0.8)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                zIndex: '10'
              }}
            >
              <FaChevronLeft />
            </button>
            <button 
              className="carousel-control next" 
              onClick={nextSlide}
              style={{
                position: 'absolute',
                right: '10%',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(204, 115, 81, 0.8)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                zIndex: '10'
              }}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ThirdPage;