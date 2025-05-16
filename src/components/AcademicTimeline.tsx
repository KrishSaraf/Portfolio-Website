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
    
    // Create a mathematically perfect cubic Bezier wave
    const createPerfectBezierWave = (
      width: number,
      baseY: number,
      amplitude: number,
      markerCount: number
    ): string => {
      // Calculate how many wave cycles to create for smooth appearance
      const cycleRatio = markerCount / 6; // Adjust to get proper wave frequency
      const cycles = Math.max(2, Math.min(5, cycleRatio)); // Between 2-5 cycles
      
      // Segment width
      const segmentWidth = width / (cycles * 2); // Each cycle has 2 segments (up and down)
      
      // Create path segments
      let pathCommands = `M0,${baseY}`; // Start at the beginning
      
      for (let i = 0; i < cycles * 2; i++) {
        const xStart = i * segmentWidth;
        const xEnd = (i + 1) * segmentWidth;
        
        // Calculate y positions based on whether this is an up or down segment
        const isUpCurve = i % 2 === 0;
        const yEnd = isUpCurve ? baseY - amplitude : baseY + amplitude;
        const yStart = isUpCurve ? baseY + amplitude : baseY - amplitude;
        
        // Control points - precisely placed at 1/3 intervals for perfect curves
        const control1X = xStart + segmentWidth / 3;
        const control2X = xEnd - segmentWidth / 3;
        
        pathCommands += ` C${control1X},${yStart} ${control2X},${yEnd} ${xEnd},${baseY}`;
      }
      
      return pathCommands;
    };

    // Calculate total path lengths for animations
    const schoolPathLength = waveWidth * 1.5; // Approximation for wave length
    const collegePathLength = waveWidth * 1.5;
    
    // Create perfect bezier waves
    const schoolPathCommand = createPerfectBezierWave(
      waveWidth,
      schoolBaseY,
      schoolAmplitude,
      schoolData.length
    );
    
    const collegePathCommand = createPerfectBezierWave(
      waveWidth,
      collegeBaseY,
      collegeAmplitude,
      collegeData.length
    );

    // Create X scales for marker placement
    const schoolXScale = d3.scaleLinear()
      .domain([0, schoolData.length - 1])
      .range([0, waveWidth]);
    
    const collegeXScale = d3.scaleLinear()
      .domain([0, collegeData.length - 1])
      .range([0, waveWidth]);

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
    
    // Calculate Y-coordinate on a given path for a specific X position
    const findYOnPath = (pathNode: SVGPathElement, xPosition: number): number => {
      try {
        const pathLength = pathNode.getTotalLength();
        let start = 0;
        let end = pathLength;
        let target = (start + end) / 2;
        
        // Binary search for optimal precision finding the Y coordinate
        let iterations = 0;
        const maxIterations = 50; // Ensure we don't get stuck in an infinite loop
        
        while (target >= start && target <= end && iterations < maxIterations) {
          const pos = pathNode.getPointAtLength(target);
          
          // Accept a very small margin of error for smoother results
          if (Math.abs(pos.x - xPosition) < 0.1) {
            return pos.y;
          } else if (pos.x > xPosition) {
            end = target;
          } else {
            start = target;
          }
          target = (start + end) / 2;
          iterations++;
        }
        
        // If we exit the loop without finding an exact match, interpolate between closest points
        const beforePos = pathNode.getPointAtLength(start);
        const afterPos = pathNode.getPointAtLength(end);
        
        // Linear interpolation between the two closest points
        if (afterPos.x === beforePos.x) return beforePos.y; // Avoid division by zero
        
        const ratio = (xPosition - beforePos.x) / (afterPos.x - beforePos.x);
        return beforePos.y + ratio * (afterPos.y - beforePos.y);
      } catch (e) {
        console.error('Error finding point on path:', e);
        return 50; // Fallback
      }
    };

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
      pathElement: SVGPathElement, 
      xScaleFunc: d3.ScaleLinear<number, number>, 
      className: string,
      delayOffset: number = 0
    ) => {
      const markers = g.selectAll(`.marker-${className}`)
        .data(data)
        .enter()
        .append('g')
        .attr('class', `marker-${className}`)
        .attr('transform', (d, i) => {
          const x = xScaleFunc(i);
          const y = findYOnPath(pathElement, x);
          return `translate(${x}, ${y})`;
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

    // Get path nodes
    const schoolPathNode = schoolPath.node() as SVGPathElement;
    const collegePathNode = collegePath.node() as SVGPathElement;

    // Create markers for both timelines
    createMarkers(schoolData, schoolPathNode, schoolXScale, 'school', 0);
    createMarkers(collegeData, collegePathNode, collegeXScale, 'college', 1800); // Delayed to appear after school timeline

    // Handle resize
    const handleResize = () => {
      if (!svgRef.current) return;
      
      // Update width based on new container size
      const newWidth = svgRef.current.clientWidth || 1000;
      const newWaveWidth = newWidth - margin.left - margin.right;
      
      // Update viewBox
      svg.attr('viewBox', `0 0 ${newWidth} ${height}`);
      
      // Update scales
      schoolXScale.range([0, newWaveWidth]);
      collegeXScale.range([0, newWaveWidth]);
      
      // Recalculate perfect bezier paths
      const newSchoolPathCommand = createPerfectBezierWave(
        newWaveWidth,
        schoolBaseY,
        schoolAmplitude,
        schoolData.length
      );
      
      const newCollegePathCommand = createPerfectBezierWave(
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
      
      // Update marker positions, give time for the paths to update first
      setTimeout(() => {
        const newSchoolPathNode = schoolPath.node() as SVGPathElement;
        const newCollegePathNode = collegePath.node() as SVGPathElement;
        
        g.selectAll('.marker-school').attr('transform', (_, i) => {
          const x = schoolXScale(i);
          const y = findYOnPath(newSchoolPathNode, x);
          return `translate(${x}, ${y})`;
        });

        g.selectAll('.marker-college').attr('transform', (_, i) => {
          const x = collegeXScale(i);
          const y = findYOnPath(newCollegePathNode, x);
          return `translate(${x}, ${y})`;
        });
      }, 10);
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