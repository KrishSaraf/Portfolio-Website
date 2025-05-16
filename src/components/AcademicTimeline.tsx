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
    const height = 420; // Height for both timelines
    
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

    // Add section headings
    g.append('text')
      .attr('x', 0)
      .attr('y', -25)
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .attr('fill', '#333')
      .text('School Education');
    
    g.append('text')
      .attr('x', 0)
      .attr('y', 170)
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .attr('fill', '#333')
      .text('College Education');

    // Define dimensions
    const waveWidth = width - margin.left - margin.right;
    
    // School wave parameters
    const schoolBaseY = 60;
    const schoolAmplitude = 30;
    const schoolDataCount = schoolData.length;
    
    // College wave parameters
    const collegeBaseY = 240;
    const collegeAmplitude = 30;
    const collegeDataCount = collegeData.length;
    
    // Generate simple SVG paths for sine waves
    function generateSineWavePath(baseY: number, amplitude: number, width: number, totalPoints: number): string {
      // Create enough cycles to place points at 180° intervals
      const cycles = (totalPoints - 1) / 2;
      let path = `M0,${baseY}`;
      
      // Use more points for a smoother path
      const resolution = 100; 
      const step = width / resolution;
      
      for (let i = 1; i <= resolution; i++) {
        const x = i * step;
        const phase = (i / resolution) * (Math.PI * cycles * 2);
        const y = baseY + amplitude * Math.sin(phase);
        path += ` L${x},${y}`;
      }
      
      return path;
    }
    
    // Calculate positions for markers at 180° intervals precisely
    function calculateMarkerPositions(baseY: number, amplitude: number, width: number, count: number): {x: number, y: number}[] {
      const positions: {x: number, y: number}[] = [];
      
      for (let i = 0; i < count; i++) {
        // Position spaced evenly with alternating peaks and troughs
        const x = (width / (count - 1)) * i;
        // Even positions are peaks, odd positions are troughs
        const y = baseY + (i % 2 === 0 ? -amplitude : amplitude);
        positions.push({ x, y });
      }
      
      return positions;
    }
    
    // Generate the wave paths
    const schoolPath = g.append('path')
      .attr('d', generateSineWavePath(schoolBaseY, schoolAmplitude, waveWidth, schoolDataCount))
      .attr('fill', 'none')
      .attr('stroke', '#e91e63')
      .attr('stroke-width', 3)
      .attr('stroke-linecap', 'round');
    
    const collegePath = g.append('path')
      .attr('d', generateSineWavePath(collegeBaseY, collegeAmplitude, waveWidth, collegeDataCount))
      .attr('fill', 'none')
      .attr('stroke', '#e91e63')
      .attr('stroke-width', 3)
      .attr('stroke-linecap', 'round');
    
    // Calculate marker positions
    const schoolMarkerPositions = calculateMarkerPositions(
      schoolBaseY, 
      schoolAmplitude, 
      waveWidth, 
      schoolDataCount
    );
    
    const collegeMarkerPositions = calculateMarkerPositions(
      collegeBaseY, 
      collegeAmplitude, 
      waveWidth, 
      collegeDataCount
    );
    
    // Simple stroke animation for paths
    const schoolPathNode = schoolPath.node();
    const collegePathNode = collegePath.node();
    
    if (schoolPathNode && collegePathNode) {
      const schoolPathLength = (schoolPathNode as SVGPathElement).getTotalLength();
      const collegePathLength = (collegePathNode as SVGPathElement).getTotalLength();
      
      schoolPath
        .attr('stroke-dasharray', schoolPathLength)
        .attr('stroke-dashoffset', schoolPathLength)
        .transition()
        .duration(1500)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0)
        .on('end', () => {
          // Animate college path after school path
          collegePath
            .attr('stroke-dasharray', collegePathLength)
            .attr('stroke-dashoffset', collegePathLength)
            .transition()
            .duration(1500)
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', 0);
        });
    }
    
    // Create tooltip
    const tooltip = d3.select(tooltipRef.current)
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('padding', '10px')
      .style('border-radius', '4px')
      .style('box-shadow', '0 0 10px rgba(0,0,0,0.1)')
      .style('pointer-events', 'none')
      .style('z-index', '100')
      .style('opacity', '0');
    
    // Create markers for school timeline
    const schoolMarkers = g.selectAll('.school-marker')
      .data(schoolData)
      .enter()
      .append('g')
      .attr('class', 'school-marker')
      .style('opacity', 0) // Start invisible
      .attr('transform', function(d: any, i: number) {
        const pos = schoolMarkerPositions[i];
        return `translate(${pos.x}, ${pos.y})`;
      });
    
    // Add circles to school markers
    schoolMarkers.append('circle')
      .attr('r', 8)
      .attr('fill', 'white')
      .attr('stroke', '#e91e63')
      .attr('stroke-width', 2);
    
    // Add class labels to school markers
    schoolMarkers.append('text')
      .attr('dy', -15)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', '#333')
      .text(function(d: any) { return d.class; });
    
    // Add achievement text to school markers
    schoolMarkers.append('text')
      .attr('dy', 25)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', 'bold')
      .attr('fill', '#e91e63')
      .text(function(d: any) { return d.achievement; });
    
    // Create markers for college timeline
    const collegeMarkers = g.selectAll('.college-marker')
      .data(collegeData)
      .enter()
      .append('g')
      .attr('class', 'college-marker')
      .style('opacity', 0) // Start invisible
      .attr('transform', function(d: any, i: number) {
        const pos = collegeMarkerPositions[i];
        return `translate(${pos.x}, ${pos.y})`;
      });
    
    // Add circles to college markers
    collegeMarkers.append('circle')
      .attr('r', 8)
      .attr('fill', 'white')
      .attr('stroke', '#e91e63')
      .attr('stroke-width', 2);
    
    // Add class labels to college markers
    collegeMarkers.append('text')
      .attr('dy', -15)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', '#333')
      .text(function(d: any) { return d.class; });
    
    // Add achievement text to college markers
    collegeMarkers.append('text')
      .attr('dy', 25)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', 'bold')
      .attr('fill', '#e91e63')
      .text(function(d: any) { return d.achievement; });
    
    // Animate markers appearing after path animations
    schoolMarkers.transition()
      .delay(function(d: any, i: number) { return 1500 + i * 100; }) // 1500ms for school path + sequential delay
      .duration(300)
      .style('opacity', 1);
    
    collegeMarkers.transition()
      .delay(function(d: any, i: number) { return 3000 + i * 100; }) // 1500ms for each path + sequential delay
      .duration(300)
      .style('opacity', 1);
    
    // Add hover interactions
    const allMarkers = g.selectAll('.school-marker, .college-marker');
    
    allMarkers.on('mouseover', function(event: any, d: any) {
      // Highlight marker
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', 10)
        .attr('fill', '#fff0f5');
      
      // Show tooltip
      tooltip
        .html(`<strong>${d.class}</strong><br>${d.details}`)
        .style('visibility', 'visible')
        .style('left', `${event.pageX + 10}px`)
        .style('top', `${event.pageY - 10}px`)
        .transition()
        .duration(200)
        .style('opacity', 1);
    })
    .on('mousemove', function(event: any) {
      tooltip
        .style('left', `${event.pageX + 10}px`)
        .style('top', `${event.pageY - 10}px`);
    })
    .on('mouseout', function() {
      // Restore marker
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', 8)
        .attr('fill', 'white');
      
      // Hide tooltip
      tooltip
        .transition()
        .duration(200)
        .style('opacity', 0)
        .on('end', () => tooltip.style('visibility', 'hidden'));
    });
    
    // Handle resize
    const handleResize = () => {
      if (!svgRef.current) return;
      
      const newWidth = svgRef.current.clientWidth || 1000;
      const newWaveWidth = newWidth - margin.left - margin.right;
      
      // Update viewBox
      svg.attr('viewBox', `0 0 ${newWidth} ${height}`);
      
      // Update paths
      schoolPath.attr('d', generateSineWavePath(schoolBaseY, schoolAmplitude, newWaveWidth, schoolDataCount))
        .attr('stroke-dasharray', null)
        .attr('stroke-dashoffset', null);
      
      collegePath.attr('d', generateSineWavePath(collegeBaseY, collegeAmplitude, newWaveWidth, collegeDataCount))
        .attr('stroke-dasharray', null)
        .attr('stroke-dashoffset', null);
      
      // Recalculate marker positions
      const newSchoolPositions = calculateMarkerPositions(
        schoolBaseY, 
        schoolAmplitude, 
        newWaveWidth, 
        schoolDataCount
      );
      
      const newCollegePositions = calculateMarkerPositions(
        collegeBaseY, 
        collegeAmplitude, 
        newWaveWidth, 
        collegeDataCount
      );
      
      // Update marker positions
      g.selectAll('.school-marker')
        .attr('transform', function(d: any, i: number) {
          const pos = newSchoolPositions[i];
          return `translate(${pos.x}, ${pos.y})`;
        });
      
      g.selectAll('.college-marker')
        .attr('transform', function(d: any, i: number) {
          const pos = newCollegePositions[i];
          return `translate(${pos.x}, ${pos.y})`;
        });
    };
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`relative ${className}`} aria-label="Academic Journey Timeline">
      <svg 
        ref={svgRef} 
        className="w-full" 
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