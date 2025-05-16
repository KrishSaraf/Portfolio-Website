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
  
  // Academic journey data
  const academicData: AchievementData[] = [
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

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Define dimensions and margins
    const margin = { top: 40, right: 30, bottom: 100, left: 30 };
    const width = svgRef.current.clientWidth || 1000;
    const height = 240;
    
    // The main SVG
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('aria-labelledby', 'academic-timeline-title')
      .attr('role', 'img');
    
    // Add a title for accessibility
    svg.append('title')
      .attr('id', 'academic-timeline-title')
      .text('Academic Journey Timeline from Class 1 to Class 12');
    
    // Create a group for all timeline elements
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // X scale for placing markers
    const xScale = d3.scaleLinear()
      .domain([0, academicData.length - 1])
      .range([0, width - margin.left - margin.right]);
    
    // Generate points for the straight line (no wave)
    const lineGenerator = d3.line<[number, number]>();

    // Create straight line points
    const linePoints: [number, number][] = [
      [0, 50],
      [width - margin.left - margin.right, 50]
    ];

    // Create the path
    g.append('path')
      .datum(linePoints)
      .attr('d', lineGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#e91e63') // Pink color matching site theme
      .attr('stroke-width', 4)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .style('filter', 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))')
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .style('opacity', 1);
      
    // Create marker groups
    const markers = g.selectAll('.marker')
      .data(academicData)
      .enter()
      .append('g')
      .attr('class', 'marker')
      .attr('transform', (d, i) => {
        const x = xScale(i);
        // Using fixed y position for straight line
        return `translate(${x}, 50)`;
      })
      .attr('aria-label', d => `${d.class}: ${d.details}`)
      .style('cursor', 'pointer');

    // Create tooltip
    const tooltip = d3.select(tooltipRef.current)
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'rgba(255, 255, 255, 0.95)')
      .style('padding', '8px 12px')
      .style('border-radius', '8px')
      .style('box-shadow', '0 4px 6px rgba(0, 0, 0, 0.1)')
      .style('font-size', '14px')
      .style('pointer-events', 'none')
      .style('z-index', '100')
      .style('max-width', '200px')
      .style('transition', 'opacity 0.3s')
      .style('opacity', '0');

    // Add circles to markers
    markers.append('circle')
      .attr('r', 0) // Start with radius 0 for animation
      .attr('fill', 'white')
      .attr('stroke', '#e91e63')
      .attr('stroke-width', 2)
      .transition()
      .delay((_, i) => i * 100)
      .duration(500)
      .attr('r', 10);

    // Add class labels with normal weight
    markers.append('text')
      .attr('dy', -20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('font-weight', 'normal') // Changed to normal weight
      .attr('fill', '#333')
      .style('text-shadow', '0 1px 1px rgba(255,255,255,0.8)')
      .style('opacity', 0)
      .text(d => d.class)
      .transition()
      .delay((_, i) => i * 100 + 300)
      .duration(500)
      .style('opacity', 1);

    // Add achievement text with bold weight
    markers.append('text')
      .attr('dy', 30)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold') // Changed to bold
      .attr('fill', '#555')
      .style('text-shadow', '0 1px 1px rgba(255,255,255,0.8)')
      .style('opacity', 0)
      // Handle long text by limiting width and adding ellipsis for very long text
      .each(function(d) {
        const text = d3.select(this);
        const words = d.achievement.split(' ');
        
        // Single-line text for short achievements
        if (d.achievement.length < 15) {
          text.text(d.achievement);
        } 
        // Special handling for long achievements (Classes 10-12)
        else {
          // For Class 10, just display the score and AIR separately
          if (d.class === "Class 10") {
            text.text("98.2% — AIR 7");
          } 
          // For Class 11, keep it simple
          else if (d.class === "Class 11") {
            text.text("1st in Class");
          }
          // For Class 12, format it better
          else if (d.class === "Class 12") {
            text.text("1st in School & State");
          }
          // For others, just use the text as is
          else {
            text.text(d.achievement);
          }
        }
      })
      .transition()
      .delay((_, i) => i * 100 + 500)
      .duration(500)
      .style('opacity', 1);

    // Handle hover events
    markers
      .on('mouseover', function(event, d) {
        // Highlight the marker
        d3.select(this).select('circle')
          .transition()
          .duration(300)
          .attr('r', 12)
          .attr('fill', '#fff0f5')
          .style('filter', 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.2))');
        
        // Show tooltip
        tooltip
          .html(`<strong>${d.class}</strong><br/>${d.details}`)
          .style('visibility', 'visible')
          .style('opacity', '1')
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 20}px`);
      })
      .on('mousemove', function(event) {
        // Move tooltip with cursor
        tooltip
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 20}px`);
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
          .style('opacity', '0')
          .style('visibility', 'hidden');
      });

    // Handle resize
    const handleResize = () => {
      if (!svgRef.current) return;
      
      // Update width based on new container size
      const newWidth = svgRef.current.clientWidth || 1000;
      
      // Update viewBox
      svg.attr('viewBox', `0 0 ${newWidth} ${height}`);
      
      // Update scales
      xScale.range([0, newWidth - margin.left - margin.right]);
      
      // Update straight line points
      const newLinePoints: [number, number][] = [
        [0, 50],
        [newWidth - margin.left - margin.right, 50]
      ];
      
      // Update path
      g.select('path')
        .datum(newLinePoints)
        .attr('d', lineGenerator);
      
      // Update marker positions
      markers.attr('transform', (_, i) => {
        const x = xScale(i);
        return `translate(${x}, 50)`;
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
        style={{ minHeight: '240px' }}
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