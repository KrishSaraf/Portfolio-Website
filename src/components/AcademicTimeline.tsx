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
  
  // Academic K-12 journey data
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
    const margin = { top: 40, right: 30, bottom: 40, left: 30 };
    const width = svgRef.current.clientWidth || 1000;
    const height = 400; // Height for both timelines
    
    // The main SVG
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('aria-labelledby', 'academic-timeline-title')
      .attr('role', 'img');
    
    // Add a title for accessibility
    svg.append('title')
      .attr('id', 'academic-timeline-title')
      .text('Academic Journey Timeline from Primary School through College');
    
    // Create a group for all timeline elements
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Add section labels
    g.append('text')
      .attr('x', 0)
      .attr('y', -15)
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .attr('fill', '#333')
      .text('Primary & Secondary Education');

    g.append('text')
      .attr('x', 0)
      .attr('y', 180) // Position for the college section label
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .attr('fill', '#333')
      .text('College Education');

    // X scale for placing K-12 markers with better spacing
    const xScale = d3.scaleLinear()
      .domain([0, academicData.length - 1])
      .range([0, width - margin.left - margin.right]);
    
    // X scale for college markers
    const collegeXScale = d3.scaleLinear()
      .domain([0, collegeData.length - 1])
      .range([0, width - margin.left - margin.right]);
    
    // Generate a perfect sine wave for K-12 timeline
    const createPreciseSineWave = (
      width: number, 
      baseY: number, 
      amplitude: number, 
      frequency: number, 
      markerCount: number
    ): [number, number][] => {
      // Create a more precise wave with 500 points
      const pointsCount = 500;
      
      // Calculate wavelength to fit approximately (markerCount) complete cycles
      const cycleCount = markerCount / 4; // Adjust this value to control number of complete sine waves
      
      return Array.from({ length: pointsCount }, (_, i) => {
        const x = (width * i) / (pointsCount - 1);
        // Pure sine wave with precision
        const y = baseY + amplitude * Math.sin((x / width) * Math.PI * 2 * cycleCount);
        return [x, y];
      });
    };
    
    // Create a mathematically perfect cubic Bezier wave alternative
    const createPreciseBezierWave = (
      width: number,
      baseY: number,
      amplitude: number,
      markerCount: number
    ): string => {
      // Calculate how many wave cycles to create
      const cycles = markerCount / 4; // Adjust for a good visual balance
      
      // Calculate points per cycle - each cycle needs 4 points (2 endpoints and 2 control points)
      const pointsPerCycle = 4;
      const totalPoints = cycles * pointsPerCycle;
      
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
        
        // Control points - use 1/3 rule for perfect symmetrical curves
        const control1X = xStart + segmentWidth / 3;
        const control2X = xEnd - segmentWidth / 3;
        
        pathCommands += ` C${control1X},${yStart} ${control2X},${yEnd} ${xEnd},${baseY}`;
      }
      
      return pathCommands;
    };

    // Width of the wave area
    const waveWidth = width - margin.left - margin.right;
    
    // Parameters for K-12 wave
    const k12BaseY = 50;
    const k12Amplitude = 30;
    
    // Parameters for college wave
    const collegeBaseY = 220;
    const collegeAmplitude = 25;
    
    // Calculate the total length of the paths for animation (approximate)
    const k12PathLength = waveWidth * 1.5; // Approximation for sine wave length
    const collegePathLength = waveWidth * 1.5;
    
    // Create perfect bezier waves instead of point-based paths
    const k12PathCommand = createPreciseBezierWave(
      waveWidth,
      k12BaseY,
      k12Amplitude,
      academicData.length
    );
    
    const collegePathCommand = createPreciseBezierWave(
      waveWidth,
      collegeBaseY,
      collegeAmplitude,
      collegeData.length
    );

    // Create connector between timelines using precise curves
    const connector = g.append('path')
      .attr('d', `M${xScale(academicData.length-1)},${k12BaseY} 
                 C${xScale(academicData.length-1)+40},${k12BaseY+40} 
                  ${xScale(academicData.length-1)-20},${collegeBaseY-40} 
                  ${collegeXScale(0)},${collegeBaseY}`)
      .attr('fill', 'none')
      .attr('stroke', '#e91e63')
      .attr('stroke-width', 2.5)
      .attr('stroke-dasharray', '5,3')
      .attr('stroke-linecap', 'round')
      .style('opacity', 0);

    // Create the K-12 path with drawing animation, using the Bezier command directly
    const path = g.append('path')
      .attr('d', k12PathCommand)
      .attr('fill', 'none')
      .attr('stroke', '#e91e63')
      .attr('stroke-width', 4)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .style('filter', 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))')
      .style('opacity', 1);
    
    // Create the college path with drawing animation, using the Bezier command directly
    const collegePath = g.append('path')
      .attr('d', collegePathCommand)
      .attr('fill', 'none')
      .attr('stroke', '#e91e63')
      .attr('stroke-width', 4)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .style('filter', 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))')
      .style('opacity', 0); // Start invisible
    
    // Animate K-12 path drawing with reduced duration
    path.attr('stroke-dasharray', k12PathLength)
      .attr('stroke-dashoffset', k12PathLength)
      .transition()
      .duration(1500)
      .ease(d3.easePolyInOut)
      .attr('stroke-dashoffset', 0)
      .on('end', () => {
        // After K-12 path animation, show the connector
        connector.transition()
          .duration(600)
          .style('opacity', 1)
          .on('end', () => {
            // After connector animation, animate the college path
            collegePath.style('opacity', 1)
              .attr('stroke-dasharray', collegePathLength)
              .attr('stroke-dashoffset', collegePathLength)
              .transition()
              .duration(1200)
              .ease(d3.easePolyInOut)
              .attr('stroke-dashoffset', 0);
          });
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
    const createMarkers = (data: AchievementData[], pathElement: SVGPathElement, xScaleFunc: d3.ScaleLinear<number, number>, delayOffset: number = 0) => {
      const markers = g.selectAll(`.marker-${delayOffset ? 'college' : 'k12'}`)
        .data(data)
        .enter()
        .append('g')
        .attr('class', delayOffset ? 'marker-college' : 'marker-k12')
        .attr('transform', (d, i) => {
          const x = xScaleFunc(i);
          const y = findYOnPath(pathElement, x);
          return `translate(${x}, ${y})`;
        })
        .style('cursor', 'pointer')
        .style('opacity', 0) // Start invisible
        .transition() // Fade in markers after path animation
        .delay((_, i) => delayOffset + 1400 + i * 80) // Faster appearance with smaller delays
        .duration(300)
        .style('opacity', 1);

      // Add circles to markers
      g.selectAll(delayOffset ? '.marker-college' : '.marker-k12').append('circle')
        .attr('r', 10)
        .attr('fill', 'white')
        .attr('stroke', '#e91e63')
        .attr('stroke-width', 2);

      // Add class labels - not bold with type assertion for d
      g.selectAll(delayOffset ? '.marker-college' : '.marker-k12').append('text')
        .attr('dy', -20)
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .attr('fill', '#333')
        .style('text-shadow', '0 1px 1px rgba(255,255,255,0.8)')
        .text(function(d) { return (d as unknown as AchievementData).class; });

      // Add achievement text - bold with type assertion for d
      g.selectAll(delayOffset ? '.marker-college' : '.marker-k12').append('text')
        .attr('dy', 30)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', '#e91e63')
        .style('text-shadow', '0 1px 1px rgba(255,255,255,0.8)')
        .text(function(d) { return (d as unknown as AchievementData).achievement; });

      // Handle hover events with type assertion for d
      g.selectAll(delayOffset ? '.marker-college' : '.marker-k12')
        .on('mouseover', function(event, d) {
          // Type assertion for d
          const data = d as unknown as AchievementData;
          
          // Highlight the marker
          d3.select(this).select('circle')
            .transition()
            .duration(300)
            .attr('r', 13.5) // 135% size
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
    const pathNode = path.node() as SVGPathElement;
    const collegePathNode = collegePath.node() as SVGPathElement;

    // Create markers for both timelines
    createMarkers(academicData, pathNode, xScale, 0);
    createMarkers(collegeData, collegePathNode, collegeXScale, 1600); // Reduced delay

    // Handle resize
    const handleResize = () => {
      if (!svgRef.current) return;
      
      // Update width based on new container size
      const newWidth = svgRef.current.clientWidth || 1000;
      const newWaveWidth = newWidth - margin.left - margin.right;
      
      // Update viewBox
      svg.attr('viewBox', `0 0 ${newWidth} ${height}`);
      
      // Update scales
      xScale.range([0, newWaveWidth]);
      collegeXScale.range([0, newWaveWidth]);
      
      // Recalculate perfect bezier paths
      const newK12PathCommand = createPreciseBezierWave(
        newWaveWidth,
        k12BaseY,
        k12Amplitude,
        academicData.length
      );
      
      const newCollegePathCommand = createPreciseBezierWave(
        newWaveWidth,
        collegeBaseY,
        collegeAmplitude,
        collegeData.length
      );
      
      // Update paths, remove animation properties
      path.attr('d', newK12PathCommand)
        .attr('stroke-dasharray', null)
        .attr('stroke-dashoffset', null);

      collegePath.attr('d', newCollegePathCommand)
        .attr('stroke-dasharray', null)
        .attr('stroke-dashoffset', null);
      
      // Update connector
      connector.attr('d', `M${xScale(academicData.length-1)},${k12BaseY} 
                          C${xScale(academicData.length-1)+40},${k12BaseY+40} 
                           ${xScale(academicData.length-1)-20},${collegeBaseY-40} 
                           ${collegeXScale(0)},${collegeBaseY}`);
      
      // Update marker positions, give time for the paths to update first
      setTimeout(() => {
        const newPathNode = path.node() as SVGPathElement;
        const newCollegePathNode = collegePath.node() as SVGPathElement;
        
        g.selectAll('.marker-k12').attr('transform', (_, i) => {
          const x = xScale(i);
          const y = findYOnPath(newPathNode, x);
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
        style={{ minHeight: '400px' }}
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