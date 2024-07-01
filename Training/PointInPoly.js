//To implement the pointInPoly function that determines 
//if a point lies inside a polygon defined by a series of path commands

function pointInPoly(thisPolygon, thisPoint) {
  const polygon = thisPolygon.polygon;
  const x = thisPoint.x;
  const y = thisPoint.y;
  let inside = false;

  // Iterate through each segment of the polygon
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const start = polygon[i];
    const end = polygon[j];

    // Extract coordinates from the commands
    let startX, startY, endX, endY;

    if (start.moveto) {
      startX = start.moveto.x;
      startY = start.moveto.y;
    } else if (start.lineto) {
      startX = start.lineto.x;
      startY = start.lineto.y;
    }

    if (end.moveto) {
      endX = end.moveto.x;
      endY = end.moveto.y;
    } else if (end.lineto) {
      endX = end.lineto.x;
      endY = end.lineto.y;
    }

    // Check if the point is exactly at the vertex
    if ((startX === x && startY === y) || (endX === x && endY === y)) {
      return true;
    }

    // Check for horizontal edge and skip if on the same horizontal line as the point
    if ((startY > y) === (endY > y)) {
      continue;
    }

    // Calculate the intersection point's x-coordinate with the edge
    const intersectX = (endX - startX) * (y - startY) / (endY - startY) + startX;

    // Count intersections if the intersection point is to the right of the point
    if (intersectX > x) {
      inside = !inside;
    }
  }

  return inside;
}

// Example usage with test cases
const Test = require('@codewars/test-compat');

describe("Tests", () => {
  it("test", () => {
    let thisPolygon = {'polygon' : [
      {'moveto' : {'x' : 10, 'y' : 10}},
      {'lineto' : {'x' : 20, 'y' : 10}},
      {'curveto' : [{'x' : 25, 'y' : 12}, {'x' : 25, 'y' : 18}, {'x' : 20, 'y' : 20}]},
      {'lineto' : {'x' : 10, 'y' : 20}},
      {'lineto' : {'x' : 10, 'y' : 10}}
    ]};

    let thisPoint = {'x' : 12, 'y' : 18};

    Test.assertEquals(pointInPoly(thisPolygon, thisPoint), true, 'Point is inside the polygon');

    thisPolygon = {'polygon' : [
      {'moveto' : {'x' : 10, 'y' : 17.0342}},
      {'lineto' : {'x' : 0, 'y' : 17.0342}},
      {'lineto' : {'x' : 0, 'y' : 7.03418}},
      {'lineto' : {'x' : 10, 'y' : 7.03418}},
      {'curveto' : [{'x' : 18.834, 'y' : 7.04199}, {'x' : 40.334, 'y' : -7.62451}, {'x' : 34.6675, 'y' : 5.37549}]},
      {'curveto' : [{'x' : 29.001, 'y' : 18.3755}, {'x' : 34.668, 'y' : 29.209}, {'x' : 39.001, 'y' : 18.8755}]},
      {'curveto' : [{'x' : 43.334, 'y' : 8.54199}, {'x' : 48.001, 'y' : 12.042}, {'x' : 45.501, 'y' : 21.3755}]},
      {'curveto' : [{'x' : 43.001, 'y' : 30.709}, {'x' : 29.5791, 'y' : 41.1021}, {'x' : 21.001, 'y' : 21.3755}]},
      {'curveto' : [{'x' : 19.334, 'y' : 17.542}, {'x' : 16.3325, 'y' : 17.0342}, {'x' : 10, 'y' : 17.0342}]}
    ]};

    thisPoint = {'x' : 44.5, 'y' : 12.7095};

    Test.assertEquals(pointInPoly(thisPolygon, thisPoint), true, 'Point is inside the polygon');

    thisPoint = {'x' : 44.75, 'y' : 12.543};

    Test.assertEquals(pointInPoly(thisPolygon, thisPoint), false, 'Point is outside the polygon');
  });
});
