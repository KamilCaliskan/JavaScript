function calculate(recs) {
    // Create events for each rectangle: entering at x0 and leaving at x1
    let events = [];
    for (let [x0, y0, x1, y1] of recs) {
        events.push({ x: x0, y0, y1, type: 1 }); // Starting event
        events.push({ x: x1, y0, y1, type: -1 }); // Ending event
    }
    
    // Sort events by x-coordinate, breaking ties with type (-1 for ending events before +1)
    events.sort((a, b) => a.x - b.x || a.type - b.type);
    
    // Helper function to calculate the total union length of active y-intervals
    function calculateUnionLength(intervals) {
        if (intervals.length === 0) return 0;
        intervals.sort((a, b) => a[0] - b[0]);
        
        let unionLength = 0;
        let [currentStart, currentEnd] = intervals[0];
        
        for (let [start, end] of intervals) {
            if (start > currentEnd) {
                // No overlap
                unionLength += currentEnd - currentStart;
                currentStart = start;
                currentEnd = end;
            } else {
                // Overlapping intervals, merge them
                currentEnd = Math.max(currentEnd, end);
            }
        }
        
        unionLength += currentEnd - currentStart; // Add the last interval
        return unionLength;
    }
    
    let prevX = events[0].x;
    let activeIntervals = [];
    let totalArea = 0;
    
    for (let event of events) {
        let x = event.x;
        
        // Calculate the area covered since the previous x-coordinate
        let width = x - prevX;
        if (width > 0) {
            let height = calculateUnionLength(activeIntervals);
            totalArea += width * height;
        }
        
        // Update the active intervals
        if (event.type === 1) {
            // Starting event: add new interval
            activeIntervals.push([event.y0, event.y1]);
        } else {
            // Ending event: remove interval
            activeIntervals = activeIntervals.filter(
                ([y0, y1]) => !(y0 === event.y0 && y1 === event.y1)
            );
        }
        
        prevX = x; // Move to the next x-coordinate
    }
    
    return totalArea;
}
