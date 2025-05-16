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

    // X scale for placing markers with better spacing
    const xScale = d3.scaleLinear()
      .domain([0, academicData.length - 1])
      .range([0, width - margin.left - margin.right]);
    
    // Generate points for the wavy path with more points for smoother curve
    const lineGenerator = d3.line<[number, number]>()
      .x(d => d[0])
      .y(d => d[1])
      .curve(d3.curveCatmullRom.alpha(0.5)); // Smoother curve type

    // Create wave points with more resolution for smoothness
    const pointsCount = 300; // Increased from 100 for smoother curve
    const wavePoints: [number, number][] = Array.from({ length: pointsCount }, (_, i) => {
      const x = (width - margin.left - margin.right) * (i / (pointsCount - 1));
      // Create a smooth sine wave with subtle randomness
      const baseY = Math.sin(i / (pointsCount / (academicData.length * 1.0))) * 30;
      const randomOffset = Math.random() * 2 - 1; // Reduced randomness for smoother appearance
      return [x, 50 + baseY + randomOffset];
    });

    // Calculate the total length of the path for animation
    const pathLength = (width - margin.left - margin.right) * 1.3; // Approximation

    // Create the path with drawing animation
    const path = g.append('path')
      .datum(wavePoints)
      .attr('d', lineGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#e91e63') // Pink color matching site theme
      .attr('stroke-width', 4)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .style('filter', 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))')
      .style('opacity', 1);
    
    // Animate path drawing
    path.attr('stroke-dasharray', pathLength)
      .attr('stroke-dashoffset', pathLength)
      .transition()
      .duration(2000) // 2 seconds for animation
      .ease(d3.easePolyInOut)
      .attr('stroke-dashoffset', 0);
    
    // Find the y-coordinate on the path for a given x position
    const findYOnPath = (pathNode: SVGPathElement, xPosition: number): number => {
      try {
        const pathLength = pathNode.getTotalLength();
        let start = 0;
        let end = pathLength;
        let target = (start + end) / 2;
        
        // Binary search to find point on path
        while (target >= start && target <= end) {
          const pos = pathNode.getPointAtLength(target);
          if (Math.abs(pos.x - xPosition) < 0.1) {
            return pos.y;
          } else if (pos.x > xPosition) {
            end = target;
          } else {
            start = target;
          }
          target = (start + end) / 2;
        }
        
        // Return fallback if search fails
        return 50;
      } catch (e) {
        console.error('Error finding point on path:', e);
        return 50;
      }
    };

    // Get the path node
    const pathNode = g.select('path').node() as SVGPathElement;
      
    // Create marker groups with delayed appearance for sequential reveal
    const markers = g.selectAll('.marker')
      .data(academicData)
      .enter()
      .append('g')
      .attr('class', 'marker')
      .attr('transform', (d, i) => {
        const x = xScale(i);
        const y = findYOnPath(pathNode, x);
        return `translate(${x}, ${y})`;
      })
      .attr('aria-label', d => `${d.class}: ${d.details}`)
      .style('cursor', 'pointer')
      .style('opacity', 0) // Start invisible
      .transition() // Fade in markers after path animation
      .delay((_, i) => 1800 + i * 100) // Start after path animation is mostly done
      .duration(300)
      .style('opacity', 1);

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

    // Add circles to markers
    g.selectAll('.marker').append('circle')
      .attr('r', 10)
      .attr('fill', 'white')
      .attr('stroke', '#e91e63')
      .attr('stroke-width', 2);

    // Add class labels - not bold
    g.selectAll('.marker').append('text')
      .attr('dy', -20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('font-weight', 'normal') // Explicitly normal
      .attr('fill', '#333')
      .style('text-shadow', '0 1px 1px rgba(255,255,255,0.8)')
      .text(d => d.class);

    // Add achievement text - bold with special handling for long text
    g.selectAll('.marker').append('text')
      .attr('dy', 30)
      .attr('text-anchor', (d: AchievementData) => {
        // Special handling for Class 12 with long text
        return d.class === 'Class 12' ? 'end' : 'middle';
      })
      .attr('dx', (d: AchievementData) => {
        // Offset for Class 12
        return d.class === 'Class 12' ? -10 : 0;
      })
      .attr('font-size', (d: AchievementData) => {
        // Smaller font for longer achievements
        return d.achievement.length > 10 ? '11px' : '12px';
      })
      .attr('font-weight', 'bold') // Make achievement text bold
      .attr('fill', '#e91e63') // Match path color
      .style('text-shadow', '0 1px 1px rgba(255,255,255,0.8)')
      .text(d => d.achievement);

    // Add specific handling for very long texts
    g.selectAll('.marker').filter((d: AchievementData) => d.class === 'Class 10' || d.class === 'Class 12')
      .append('foreignObject')
      .attr('width', 120)
      .attr('height', 40)
      .attr('x', -60)
      .attr('y', 20)
      .html((d: AchievementData) => `<div style="
          font-size: 11px; 
          font-weight: bold; 
          color: #e91e63; 
          text-align: center;
          text-shadow: 0 1px 1px rgba(255,255,255,0.8);
          width: 100%;
          overflow: visible;
          white-space: normal;
        ">${d.achievement}</div>`)
      .style('opacity', 0); // Hide initially, will show and hide foreign objects as needed

    // Handle hover events with enhanced interactions
    g.selectAll('.marker')
      .on('mouseover', function(event, d: AchievementData) {
        // Highlight the marker
        d3.select(this).select('circle')
          .transition()
          .duration(300)
          .attr('r', 13.5) // 135% size
          .attr('fill', '#fff0f5')
          .style('filter', 'drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.25))');
        
        // For Class 10 and 12, show foreign object and hide text
        if (d.class === 'Class 10' || d.class === 'Class 12') {
          d3.select(this).select('foreignObject').style('opacity', 1);
          d3.select(this).select('text:nth-child(3)').style('opacity', 0);
        }
        
        // Show tooltip with enhanced animation
        tooltip
          .html(`<strong>${d.class}</strong><br/>${d.details}`)
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
      .on('mouseout', function(event, d: AchievementData) {
        // Restore marker
        d3.select(this).select('circle')
          .transition()
          .duration(300)
          .attr('r', 10)
          .attr('fill', 'white')
          .style('filter', 'none');
        
        // For Class 10 and 12, hide foreign object and show text
        if (d.class === 'Class 10' || d.class === 'Class 12') {
          d3.select(this).select('foreignObject').style('opacity', 0);
          d3.select(this).select('text:nth-child(3)').style('opacity', 1);
        }
        
        // Hide tooltip with animation
        tooltip
          .transition()
          .duration(200)
          .style('opacity', '0')
          .style('transform', 'translateY(5px)')
          .on('end', () => tooltip.style('visibility', 'hidden'));
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
      
      // Regenerate wave points with increased smoothness
      const newWavePoints: [number, number][] = Array.from({ length: pointsCount }, (_, i) => {
        const x = (newWidth - margin.left - margin.right) * (i / (pointsCount - 1));
        const baseY = Math.sin(i / (pointsCount / (academicData.length * 1.0))) * 30;
        const randomOffset = Math.random() * 2 - 1;
        return [x, 50 + baseY + randomOffset];
      });
      
      // Update path
      g.select('path')
        .datum(newWavePoints)
        .attr('d', lineGenerator)
        .attr('stroke-dasharray', null) // Remove animation properties after resize
        .attr('stroke-dashoffset', null);
      
      // Update marker positions
      const newPathNode = g.select('path').node() as SVGPathElement;
      g.selectAll('.marker').attr('transform', (_, i) => {
        const x = xScale(i);
        const y = findYOnPath(newPathNode, x);
        return `translate(${x}, ${y})`;
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