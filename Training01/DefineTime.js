function formatDuration(seconds) {
    // Define time units in seconds
    const units = [
        { name: "year", seconds: 365 * 24 * 60 * 60 },
        { name: "day", seconds: 24 * 60 * 60 },
        { name: "hour", seconds: 60 * 60 },
        { name: "minute", seconds: 60 },
        { name: "second", seconds: 1 }
    ];
    
    // Handle the "now" case
    if (seconds === 0) return "now";
    
    // Convert seconds into each time unit
    const result = [];
    for (const unit of units) {
        const count = Math.floor(seconds / unit.seconds);
        if (count > 0) {
            result.push(`${count} ${unit.name}${count > 1 ? "s" : ""}`);
            seconds -= count * unit.seconds;
        }
    }
    
    // Format the result with commas and "and"
    if (result.length === 1) return result[0];
    return result.slice(0, -1).join(", ") + " and " + result.slice(-1);
}
