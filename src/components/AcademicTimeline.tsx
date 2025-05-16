import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface AchievementData {
  class: string;
  achievement: string;
  details: string;
}

interface AcademicTimelineProps {
  className?: string;
}

const AcademicTimeline: React.FC<AcademicTimelineProps> = ({ className = '' }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  // School education journey data (Class 1-12)
  const schoolData: AchievementData[] = [
    { "class": "Class 1", "achievement": "3rd", "details": "Ranked 3rd in class" },
    { "class": "Class 2", "achievement": "1st", "details": "Ranked 1st in class" },
    { "class": "Class 3", "achievement": "2nd", "details": "Ranked 2nd in class" },
    { "class": "Class 4", "achievement": "2nd", "details": "Ranked 2nd in class" },
    { "class": "Class 5", "achievement": "1st", "details": "Ranked 1st in class" },
    { "class": "Class 6", "achievement": "2nd", "details": "Ranked 2nd in class" },
    { "class": "Class 7", "achievement": "2nd", "details": "Ranked 2nd in class" },
    { "class": "Class 8", "achievement": "3rd", "details": "Ranked 3rd in class" },
    { "class": "Class 9", "achievement": "3rd", "details": "Ranked 3rd in class" },
    { "class": "Class 10", "achievement": "98.2% — AIR 7", "details": "Scored 98.2% with All India Rank 7" },
    { "class": "Class 11", "achievement": "1st in Class", "details": "Ranked 1st in class" },
    { "class": "Class 12", "achievement": "1st in School, 1st in State", "details": "Achieved top position in both school and state" }
  ];

  // College journey data
  const collegeData: AchievementData[] = [
    { "class": "College Year 1", "achievement": "Dean's List", "details": "Achieved Dean's List recognition for academic excellence" },
    { "class": "College Year 2", "achievement": "Dean's List", "details": "Maintained Dean's List standing for second consecutive year" },
    { "class": "College Year 3", "achievement": "Dean's List", "details": "Continued academic excellence with Dean's List recognition" },
    { "class": "College Year 4", "achievement": "Ongoing", "details": "Current academic year in progress" }
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Define dimensions and margins
    const margin = { top: 50, right: 30, bottom: 20, left: 30 };
    const width = svgRef.current.clientWidth || 1000;
    const height = 420; // Height for both timelines with proper spacing
    
    // The main SVG
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('aria-labelledby', 'academic-timeline-title')
      .attr('role', 'img');
    
    // Add a title for accessibility
    svg.append('title')
      .attr('id', 'academic-timeline-title')
      .text('Academic Journey Timeline');
    
    // Create a group for all timeline elements
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Add section headings with enhanced styling
    // School Education heading
    g.append('text')
      .attr('x', 0)
      .attr('y', -25)
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .attr('fill', '#333')
      .style('text-shadow', '0 1px 1px rgba(255,255,255,0.8)')
      .text('School Education');
    
    // College Education heading (positioned below the first wave)
    g.append('text')
      .attr('x', 0)
      .attr('y', 170) // Positioned between the waves
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .attr('fill', '#333')
      .style('text-shadow', '0 1px 1px rgba(255,255,255,0.8)')
      .text('College Education');

    // Define wave parameters
    const waveWidth = width - margin.left - margin.right;
    
    // School wave parameters
    const schoolBaseY = 60;
    const schoolAmplitude = 30;
    
    // College wave parameters (positioned lower)
    const collegeBaseY = 240; // Increased separation between waves
    const collegeAmplitude = 30; // Same amplitude for visual consistency
    
    // Create a true sine wave path
    const createSineWave = (
      width: number,
      baseY: number,
      amplitude: number,
      dataLength: number
    ): string => {
      // Create one complete wave cycle per data set
      const points: [number, number][] = [];
      
      // Draw a single sine wave that spans the entire width
      // with data points at 180° intervals (peaks and troughs)
      for (let i = 0; i <= 100; i++) {
        const x = (i / 100) * width;
        // We use a simple sine function with period that ensures
        // data points will fall at peaks and troughs
        const angle = (i / 100) * Math.PI * dataLength;
        const y = baseY + amplitude * Math.sin(angle);
        points.push([x, y]);
      }
      
      // Create SVG path command
      return `M${points.map(p => `${p[0]},${p[1]}`).join(' L')}`;
    };

    // Calculate marker positions at 180° intervals (peaks and troughs)
    const calculateMarkerPositions = (
      dataLength: number,
      width: number,
      baseY: number,
      amplitude: number
    ): { x: number, y: number }[] => {
      const positions: { x: number, y: number }[] = [];
      
      for (let i = 0; i < dataLength; i++) {
        // Place markers at 180° intervals (π radians)
        // This ensures markers are at peaks and troughs
        const x = (width / (dataLength - 1)) * i;
        const angle = i * Math.PI; // 180° intervals
        const y = baseY + amplitude * Math.sin(angle);
        positions.push({ x, y });
      }
      
      return positions;
    };

    // Calculate total path lengths for animations
    const schoolPathLength = waveWidth * 1.5; // Approximation for wave length
    const collegePathLength = waveWidth * 1.5;
    
    // Create sine waves
    const schoolPathCommand = createSineWave(
      waveWidth,
      schoolBaseY,
      schoolAmplitude,
      schoolData.length
    );
    
    const collegePathCommand = createSineWave(
      waveWidth,
      collegeBaseY,
      collegeAmplitude,
      collegeData.length
    );

    // Calculate marker positions
    const schoolMarkerPositions = calculateMarkerPositions(
      schoolData.length,
      waveWidth,
      schoolBaseY,
      schoolAmplitude
    );
    
    const collegeMarkerPositions = calculateMarkerPositions(
      collegeData.length,
      waveWidth,
      collegeBaseY,
      collegeAmplitude
    );

    // Create the school path with drawing animation
    const schoolPath = g.append('path')
      .attr('d', schoolPathCommand)
      .attr('fill', 'none')
      .attr('stroke', '#e91e63')
      .attr('stroke-width', 4)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .style('filter', 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))')
      .style('opacity', 1);
    
    // Create the college path with drawing animation (appears after school path)
    const collegePath = g.append('path')
      .attr('d', collegePathCommand)
      .attr('fill', 'none')
      .attr('stroke', '#e91e63')
      .attr('stroke-width', 4)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .style('filter', 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))')
      .style('opacity', 1);
    
    // Animate school path drawing
    schoolPath.attr('stroke-dasharray', schoolPathLength)
      .attr('stroke-dashoffset', schoolPathLength)
      .transition()
      .duration(1500)
      .ease(d3.easePolyInOut)
      .attr('stroke-dashoffset', 0)
      .on('end', () => {
        // After school path completes, animate college path
        collegePath.attr('stroke-dasharray', collegePathLength)
          .attr('stroke-dashoffset', collegePathLength)
          .transition()
          .duration(1500)
          .ease(d3.easePolyInOut)
          .attr('stroke-dashoffset', 0);
      });

    // Create tooltip with enhanced styling
    const tooltip = d3.select(tooltipRef.current)
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'rgba(255, 255, 255, 0.95)')
      .style('padding', '10px 14px')
      .style('border-radius', '8px')
      .style('border', '1px solid rgba(233, 30, 99, 0.2)')
      .style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.15)')
      .style('font-size', '14px')
      .style('pointer-events', 'none')
      .style('z-index', '100')
      .style('max-width', '220px')
      .style('transition', 'opacity 0.2s, transform 0.2s')
      .style('opacity', '0')
      .style('transform', 'translateY(5px)')
      .style('color', '#333');

    // Function to create markers and labels with proper typing
    const createMarkers = (
      data: AchievementData[], 
      positions: { x: number, y: number }[], 
      className: string,
      delayOffset: number = 0
    ) => {
      const markers = g.selectAll(`.marker-${className}`)
        .data(data)
        .enter()
        .append('g')
        .attr('class', `marker-${className}`)
        .attr('transform', (_, i) => {
          const pos = positions[i];
          return `translate(${pos.x}, ${pos.y})`;
        })
        .style('cursor', 'pointer')
        .style('opacity', 0) // Start invisible
        .transition() // Fade in markers after path animation
        .delay((_, i) => delayOffset + 1200 + i * 80) // Sequential appearance
        .duration(300)
        .style('opacity', 1);

      // Add circles to markers
      g.selectAll(`.marker-${className}`).append('circle')
        .attr('r', 10)
        .attr('fill', 'white')
        .attr('stroke', '#e91e63')
        .attr('stroke-width', 2);

      // Add class labels
      g.selectAll(`.marker-${className}`).append('text')
        .attr('dy', -20)
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .attr('font-weight', 'normal') // Non-bold class names
        .attr('fill', '#333')
        .style('text-shadow', '0 1px 1px rgba(255,255,255,0.8)')
        .text(function(d) { return (d as unknown as AchievementData).class; });

      // Add achievement text
      g.selectAll(`.marker-${className}`).append('text')
        .attr('dy', 30)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold') // Bold achievements
        .attr('fill', '#e91e63')
        .style('text-shadow', '0 1px 1px rgba(255,255,255,0.8)')
        .text(function(d) { return (d as unknown as AchievementData).achievement; });

      // Handle hover events
      g.selectAll(`.marker-${className}`)
        .on('mouseover', function(event, d) {
          // Type assertion for d
          const data = d as unknown as AchievementData;
          
          // Highlight the marker
          d3.select(this).select('circle')
            .transition()
            .duration(300)
            .attr('r', 13) // 130% size on hover
            .attr('fill', '#fff0f5')
            .style('filter', 'drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.25))');
          
          // Show tooltip
          tooltip
            .html(`<strong>${data.class}</strong><br/>${data.details}`)
            .style('visibility', 'visible')
            .style('left', `${event.pageX + 12}px`)
            .style('top', `${event.pageY - 25}px`)
            .transition()
            .duration(200)
            .style('opacity', '1')
            .style('transform', 'translateY(0)');
        })
        .on('mousemove', function(event) {
          // Move tooltip with cursor
          tooltip
            .style('left', `${event.pageX + 12}px`)
            .style('top', `${event.pageY - 25}px`);
        })
        .on('mouseout', function() {
          // Restore marker
          d3.select(this).select('circle')
            .transition()
            .duration(300)
            .attr('r', 10)
            .attr('fill', 'white')
            .style('filter', 'none');
          
          // Hide tooltip
          tooltip
            .transition()
            .duration(200)
            .style('opacity', '0')
            .style('transform', 'translateY(5px)')
            .on('end', () => tooltip.style('visibility', 'hidden'));
        });
    };

    // Create markers for both timelines
    createMarkers(schoolData, schoolMarkerPositions, 'school', 0);
    createMarkers(collegeData, collegeMarkerPositions, 'college', 1800); // Delayed to appear after school timeline

    // Handle resize
    const handleResize = () => {
      if (!svgRef.current) return;
      
      // Update width based on new container size
      const newWidth = svgRef.current.clientWidth || 1000;
      const newWaveWidth = newWidth - margin.left - margin.right;
      
      // Update viewBox
      svg.attr('viewBox', `0 0 ${newWidth} ${height}`);
      
      // Recalculate sine wave paths
      const newSchoolPathCommand = createSineWave(
        newWaveWidth,
        schoolBaseY,
        schoolAmplitude,
        schoolData.length
      );
      
      const newCollegePathCommand = createSineWave(
        newWaveWidth,
        collegeBaseY,
        collegeAmplitude,
        collegeData.length
      );
      
      // Update paths, remove animation properties
      schoolPath.attr('d', newSchoolPathCommand)
        .attr('stroke-dasharray', null)
        .attr('stroke-dashoffset', null);

      collegePath.attr('d', newCollegePathCommand)
        .attr('stroke-dasharray', null)
        .attr('stroke-dashoffset', null);
      
      // Recalculate marker positions
      const newSchoolMarkerPositions = calculateMarkerPositions(
        schoolData.length,
        newWaveWidth,
        schoolBaseY,
        schoolAmplitude
      );
      
      const newCollegeMarkerPositions = calculateMarkerPositions(
        collegeData.length,
        newWaveWidth,
        collegeBaseY,
        collegeAmplitude
      );
      
      // Update marker positions
      g.selectAll('.marker-school')
        .attr('transform', (_, i) => {
          const pos = newSchoolMarkerPositions[i];
          return `translate(${pos.x}, ${pos.y})`;
        });

      g.selectAll('.marker-college')
        .attr('transform', (_, i) => {
          const pos = newCollegeMarkerPositions[i];
          return `translate(${pos.x}, ${pos.y})`;
        });
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`timeline-container relative ${className}`} aria-label="Academic Journey Timeline">
      <svg 
        ref={svgRef} 
        className="w-full h-auto" 
        style={{ minHeight: '420px' }}
      />
      <div 
        ref={tooltipRef} 
        className="tooltip" 
        aria-live="polite"
      />
    </div>
  );
};

export default AcademicTimeline; 