function determinant(matrix) {
    const n = matrix.length;
    
    // Base case for 1x1 matrix
    if (n === 1) {
      return matrix[0][0];
    }
    
    // Base case for 2x2 matrix
    if (n === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
    
    // Recursive case for larger matrices
    let det = 0;
    for (let i = 0; i < n; i++) {
      // Minor matrix: remove the 0th row and ith column
      const minor = matrix.slice(1).map(row => row.filter((_, colIndex) => colIndex !== i));
      // Recursive call and alternation of signs
      det += matrix[0][i] * determinant(minor) * (i % 2 === 0 ? 1 : -1);
    }
    
    return det;
  }
  
