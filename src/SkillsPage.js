import React, { useRef, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function SkillsPage({ isDarkMode = false }) {
  const skillsRef = useRef(null);
  const titleRef = useRef(null);
  const underlineRef = useRef(null);
  const chartRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  // Sample skills data with proficiency levels (0-100)
  const skillsData = [
    { name: 'Python', proficiency: 90 },
    { name: 'R', proficiency: 85 },
    { name: 'SQL', proficiency: 95 },
    { name: 'Tableau', proficiency: 80 },
    { name: 'Excel', proficiency: 90 },
    { name: 'Power BI', proficiency: 75 },
    { name: 'Machine Learning', proficiency: 70 },
    { name: 'Data Analysis', proficiency: 95 }
  ];

  // Generate gradient colors based on theme
  const generateGradientColor = (index, total) => {
    const intensity = 0.4 + (0.6 * index / (total - 1));
    if (isDarkMode) {
      const baseColor = [100, 149, 237];
      return `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${intensity})`;
    } else {
      const baseColor = [70, 130, 180];
      return `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${intensity})`;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Trigger animations immediately when the page comes into view
          setTimeout(() => {
            setAnimate(true);
            if (titleRef.current) titleRef.current.classList.add('fade-in');
            if (chartRef.current) chartRef.current.classList.add('fade-in');
            if (underlineRef.current) {
              underlineRef.current.style.width = '400px';
            }
          }, 100); // Very short delay to ensure smooth transition
        } else {
          setAnimate(false);
          if (titleRef.current) titleRef.current.classList.remove('fade-in');
          if (chartRef.current) chartRef.current.classList.remove('fade-in');
          if (underlineRef.current) {
            underlineRef.current.style.width = '0';
          }
        }
      });
    }, { threshold: 0.1 }); // Reduced threshold for earlier triggering

    const skillsPage = document.getElementById('skills-page');
    if (skillsPage) {
      observer.observe(skillsPage);
    }

    return () => {
      if (skillsPage) observer.unobserve(skillsPage);
    };
  }, []);

  const CustomXAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text 
          x={0} 
          y={0} 
          dy={16} 
          textAnchor="middle" 
          fill={isDarkMode ? '#ffffff' : '#000000'}
          fontSize="12"
          fontWeight="500"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div 
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            color: isDarkMode ? '#ffffff' : '#000000',
            padding: '12px 16px',
            border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            fontSize: '14px'
          }}
        >
          <p style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>
            {payload[0].payload.name}
          </p>
          <p style={{ margin: '0', opacity: 0.9 }}>
            {`Proficiency: ${payload[0].value}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className="skills-page"
      id="skills-page" 
      ref={skillsRef}
      style={{
        backgroundColor: isDarkMode ? '#000000' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#000000',
        padding: '40px 20px',
        minHeight: '100vh',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}
    >
      <div className="skills-content" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Title Section */}
        <div className="title-container" style={{ position: 'relative', marginBottom: '40px' }}>
          <h2 ref={titleRef} className="skills-title" style={{ 
            textAlign: 'center',
            color: isDarkMode ? '#CC7351' : '#CC7351',
            fontSize: '2.5rem',
            fontWeight: '600',
            margin: '0',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 0.6s ease-out' // Faster transition
          }}>
            Skill Set
          </h2>
          <div 
            ref={underlineRef} 
            style={{
              position: 'absolute',
              bottom: '-15px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '4px',
              backgroundColor: isDarkMode ? '#ffffff' : '#000000',
              transition: 'width 1s ease-out', // Faster transition
              borderRadius: '2px'
            }}
          />
        </div>
        
        {/* Chart Section */}
        <div 
          ref={chartRef} 
          className="chart-container"
          style={{
            backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
            borderRadius: '12px',
            padding: '30px',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.5)' : '0 4px 16px rgba(0, 0, 0, 0.08)',
            position: 'relative',
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 0.7s ease-out' // Faster transition
          }}
        >
          <ResponsiveContainer width="100%" height={450}>
            <BarChart
              data={skillsData}
              margin={{ top: 30, right: 40, left: 80, bottom: 60 }}
              barSize={50}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke={isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
              />
              
              <XAxis 
                dataKey="name" 
                tick={<CustomXAxisTick />}
                axisLine={{ stroke: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.3)' }}
                tickLine={{ stroke: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.3)' }}
                interval={0}
                height={60}
              />
              
              <YAxis 
                tick={{ fill: isDarkMode ? '#ffffff' : '#000000', fontSize: 12 }}
                axisLine={{ stroke: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.3)' }}
                tickLine={{ stroke: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.3)' }}
                domain={[0, 100]}
              />
              
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }} 
              />
              
              <Bar 
                dataKey="proficiency" 
                isAnimationActive={animate} // Direct binding to animate state
                animationDuration={800} // Faster animation - reduced from 1500ms
                animationEasing="ease-out"
                animationBegin={0} // Start immediately
                radius={[4, 4, 0, 0]}
              >
                {skillsData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={generateGradientColor(index, skillsData.length)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          
          {/* Axis Labels */}
          <div 
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'rotate(-90deg) translateY(-50%)',
              transformOrigin: 'center',
              color: isDarkMode ? '#ffffff' : '#000000',
              fontSize: '14px',
              fontWeight: '500',
              pointerEvents: 'none'
            }}
          >
            Proficiency (%)
          </div>
          
          <div 
            style={{
              textAlign: 'center',
              marginTop: '20px',
              color: isDarkMode ? '#ffffff' : '#000000',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Skills
          </div>
        </div>
        
        {/* Description */}
        <div className="skills-description" style={{ marginTop: '40px' }}>
          <p style={{ 
            color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
            fontSize: '1.1rem',
            lineHeight: '1.6',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            As a Data Analyst, I've developed a versatile skill set that allows me to extract, process, 
            analyze, and visualize data effectively. My technical proficiencies range from programming 
            languages to visualization tools, enabling me to deliver comprehensive data-driven insights.
          </p>
        </div>
      </div>

      <style jsx>{`
        .fade-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        /* Force skill names to be visible */
        .recharts-cartesian-axis-tick-value {
          fill: ${isDarkMode ? '#ffffff' : '#000000'} !important;
          font-weight: 500 !important;
        }
        
        .recharts-cartesian-axis.recharts-xAxis .recharts-cartesian-axis-tick-value {
          fill: ${isDarkMode ? '#ffffff' : '#000000'} !important;
        }
        
        .recharts-cartesian-axis.recharts-yAxis .recharts-cartesian-axis-tick-value {
          fill: ${isDarkMode ? '#ffffff' : '#000000'} !important;
        }
      `}</style>
    </div>
  );
}

export default SkillsPage;