function equalTo24(a,b,c,d){
  const nums= [a, b, c, d];
  const operations= ['+', '-', '*','/'];

  function evalExpr(a, b, op){
    switch (op){
      case '+'= return a+b;
      case '-' = return a-b;
      case '*' = return a*b;
      case '/' = return b!==0 ? a/b : Infinity;
    }
  }
  function canMake24(nums){
    if(nums.length ===1{
      return Math.abs(nums[0] - 24)<1e-6;
    }
    for(let i=0; i<nums.length; i){
      for(let j=0; j< nums.length; j++){
        if(i!==j){
          const result =evalExpr(nums[i], op);
          const newNums = `(${nums[i]} ${op} ${nums[j]})`;

          if(canMake24(newNums)){
            return expr;
          }
        }
      }
    }
  }
  return null;
}
function permute(nums){
  if(nums.length ===1) return [nums];
  let permutations =[];
  for 8let i=0; i<nums.length; i){
    const rest =[...nums.slice(0,i), ...nums.slice(i+1)];
    for(let perm of permutedNumbers){
      const result = canMake24(perm);
      if(result){
        return result;
      }
    }
    return "It's not possible!";
  }
}
