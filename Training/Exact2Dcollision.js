function circleCollision(P1, P2, V1, V2, rad) {
  const EPSILON = Number.EPSILON;
  
  // Calculate relative velocity
  const Vrel = [V2[0] - V1[0], V2[1] - V1[1]];
  
  // Calculate relative position
  const P12 = [P2[0] - P1[0], P2[1] - P1[1]];
  
  // Solve quadratic equation components
  const a = Vrel[0] ** 2 + Vrel[1] ** 2;
  const b = 2 * (P12[0] * Vrel[0] + P12[1] * Vrel[1]);
  const c = P12[0] ** 2 + P12[1] ** 2 - (2 * rad) ** 2;
  
  // Calculate discriminant
  const discriminant = b * b - 4 * a * c;
  
  // No collision if discriminant < 0 or Vrel is zero (they move together or no movement)
  if (discriminant < 0 || (Vrel[0] === 0 && Vrel[1] === 0)) {
    return [];
  }
  
  // Calculate collision times
  const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
  const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
  
  // Check collision points
  let collisionTime = -1;
  if (t1 >= 0) collisionTime = t1;
  else if (t2 >= 0) collisionTime = t2;
  
  if (collisionTime < 0) return [];
  
  // Calculate exact collision point
  const Pimpact = [
    P1[0] + V1[0] * collisionTime + rad * (P2[0] - P1[0]) / P12[0],
    P1[1] + V1[1] * collisionTime + rad * (P2[1] - P1[1]) / P12[1]
  ];
  
  // Check if within bounds and tolerance
  const withinBounds = Math.abs(Pimpact[0]) <= 1000 && Math.abs(Pimpact[1]) <= 1000;
  const withinTolerance = Math.abs(Pimpact[0] - Math.round(Pimpact[0])) <= 0.01 &&
                           Math.abs(Pimpact[1] - Math.round(Pimpact[1])) <= 0.01;
  
  if (withinBounds && withinTolerance) {
    return Pimpact;
  } else {
    return [];
  }
}


/*
const chai = require("chai");
const _ = require("lodash")
const assert = chai.assert;
const expect = chai.expect
chai.config.truncateThreshold = 0;


//The functions missTest, hitTest, and edgeTest are 
//called according to type and point if needed. 
//I have covered most possible extremes, but feel free to add your
//own tests, just be sure they are correct.

describe("Example tests", function() {
  ///////////Test constants///////////
  const tol = 0.01 //individual value tolerance
    ,ovtol = 0.001 //overlap and gap buffer
    ,btol = 1 //boundary buffer
    ,bound = 1000 //boundary limit
    ,vrange = 100 //random value range
  
  describe("Horizontal fixed tests", function() {
    it("Head-on same speed", function() {
      const P1=[-10,0], P2=[10,0], V1=[1,0], V2=[-1,0], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet,[0,0],[...inputs])
    });
    it("Head-on with stationary", function() {
      const P1=[10,1], P2=[-10,1], V1=[-1,0], V2=[0,0], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet,[-9,1],[...inputs])
    });
    it("Head-on different speeds", function() {
      const P1=[-10,1.045827942391], P2=[10,1.045827942391], V1=[1,0], V2=[-2,0], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet,[-3,1.045827942391],[...inputs])
    });
    it("Opposing", function() {
      const P1=[-2,-5.5], P2=[2,-5.5], V1=[-1,0], V2=[1,0], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      missTest(userRet, [...inputs])
    });
    it("Chasing", function() {
      const P1=[5,-1], P2=[8,-1], V1=[-1,0], V2=[-1.002,0], rad=1.11111111111111
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet,[-382.7777777777786,-1],[...inputs])
    });
    it("Offset miss", function() {
      const P1=[0,-10], P2=[-3,-7], V1=[-10,0], V2=[6,0], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      missTest(userRet, [...inputs])
    });
    it("Offset hit", function() {
      const P1=[0,0], P2=[3,2**0.5], V1=[0,0], V2=[-1,0], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet, [0.7071067811865476,0.7071067811865476],[...inputs])
    });
    it("Out-of-bounds far left", function() {
      const P1=[-51,-1.75], P2=[51,-1.75], V1=[-99.999,0], V2=[-100,0], rad=3
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      missTest(userRet, [...inputs])
    });
    it("Out-of-bounds far right", function() {
      const P1=[49.75,-20.1], P2=[-49.75,-19.9], V1=[99.899999999,0], V2=[99.9,0], rad=4.1234
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      missTest(userRet, [...inputs])
    });
  });

  
  describe("Vertical fixed tests", function() {
    it("Head-on same speed", function() {
      const P1=[5,-3], P2=[5,4], V1=[0,2.5], V2=[0,-2.5], rad=2.5
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet,[5,0.5],[...inputs])
    });
    it("Head-on with stationary", function() {
      const P1=[1,10], P2=[1,-10], V1=[0,-1], V2=[0,0], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet,[1,-9],[...inputs])
    });
    it("Head-on different speeds", function() {
      const P1=[-5.436898383,-10], P2=[-5.436898383,10], V1=[0,1], V2=[0,-2], rad=2
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet,[-5.436898383,-2.666666666666667],[...inputs])
    });
    it("Opposing", function() {
      const P1=[-6.5,-2], P2=[-6.5,2], V1=[0,-1], V2=[0,1], rad=2
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      missTest(userRet, [...inputs])
    });
    it("Chasing", function() {
      const P1=[-2,4], P2=[-2,9], V1=[0,-1.997], V2=[0,-2], rad=2
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet,[-2,-659.6666666666904],[...inputs])
    });
    it("Offset miss", function() {
      const P1=[-11,0], P2=[-8,-3], V1=[0,-9], V2=[0,6], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      missTest(userRet, [...inputs])
    });
    it("Offset hit", function() {
      const P1=[0,0], P2=[2**0.5,3], V1=[0,0], V2=[0,-1], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet, [0.7071067811865476,0.7071067811865476],[...inputs])
    });
    it("Out-of-bounds far bottom", function() {
      const P1=[-1.75,-51], P2=[-1.75,51], V1=[0,-99.999], V2=[0,-100], rad=2
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      missTest(userRet, [...inputs])
    });
    it("Out-of-bounds far top", function() {
      const P1=[-20.1,49.75], P2=[-19.9,-49.75], V1=[0,99.899999999], V2=[0,99.9], rad=3.1234
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      missTest(userRet, [...inputs])
    });
  });


  describe("Arbitrary fixed tests", function() {
    it("Head-on same speed", function() {
      const P1=[-1,-1], P2=[1,1], V1=[10,10], V2=[-10,-10], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet,[0,0],[...inputs])
    });
    it("Head-on with stationary", function() {
      const P1=[-0.70710678118,-0.70710678118], P2=[90,90], V1=[0,0], V2=[-45,-45], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet,[0,0],[...inputs])
    });
    it("Head-on different speeds", function() {
      const P1=[5,4], P2=[-10,-8], V1=[-5,-4], V2=[10,8], rad=2.5
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet,[-0.650724007869192,-0.5205792062953536],[...inputs])
    });
    it("Opposing", function() {
      const P1=[-20, 37], P2=[-10, 35], V1=[-10,2], V2=[20,-4], rad=3.123456
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      missTest(userRet, [...inputs])
    });
    it("Chasing", function() {
      const P1=[27,1], P2=[-4,-50], V1=[-31,-51], V2=[-31*0.965,-51*0.965], rad=10.56
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet,[-550.7692801548985,-949.5236544483814],[...inputs])
    });
    it("Angled miss", function() {
      const P1=[-4, 0], P2=[4,0], V1=[2,1], V2=[-7,10], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      missTest(userRet, [...inputs])
    });
    it("Angled hit", function() {
      const P1=[-100,0], P2=[100,0], V1=[-0.045,0.567], V2=[-55,0.0001], rad=3.14
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet, [-97.18268043886951,1.0012226010878897],[...inputs])
    });
  });

  
  describe("Edge case tests", function() {
    it(" Negligible offset horizontal min", function() {
      const P1=[-10,0], P2=[10,2-ovtol-Number.EPSILON], V1=[1,0], V2=[-1,0], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet,[ 0, 0.9999499999999999],[...inputs])
    });
    it(" Negligible offset horizontal max", function() {
      const P1=[-10,0], P2=[10,2+ovtol+Number.EPSILON], V1=[1,0], V2=[-1,0], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      missTest(userRet, [...inputs])
    });
    it("Negligible offset horizontal exact", function() {
      const P1=[-10,0], P2=[10,2], V1=[1,0], V2=[-1,0], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      edgeTest(userRet,[0,1], [...inputs], "graze")
    });
    it(" Negligible offset vertical min", function() {
      const P1=[0,-10], P2=[2-ovtol-Number.EPSILON,10], V1=[0,1], V2=[0,-1], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet,[0.9999499999999999, 0],[...inputs])
    });
    it(" Negligible offset vertical max", function() {
      const P1=[0,-10], P2=[2+ovtol+Number.EPSILON,10], V1=[0,1], V2=[0,-1], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      missTest(userRet, [...inputs])
    });
    it("Negligible offset vertical exact", function() {
      const P1=[0,-10], P2=[2,10], V1=[0,1], V2=[0,-1], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      edgeTest(userRet,[1,0], [...inputs], "graze")
    });
    it("Negligible offset arbitrary min", function() {
      const offset = (2-ovtol-Number.EPSILON)/(2**0.5)
        , P1=[-1+offset,-1-offset], P2=[1,1], V1=[1,1], V2=[-1,-1], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet,  [0.7067532277959543, -0.7067532277959541],[...inputs] )
    });
    it("Negligible offset arbitrary max", function() {
      const offset = (2+ovtol+Number.EPSILON)/(2**0.5)
        , P1=[-1+offset,-1-offset], P2=[1,1], V1=[1,1], V2=[-1,-1], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      missTest(userRet, [...inputs])
    });
    it("Negligible offset arbitrary exact", function() {
      const offset = (2**0.5)
        , P1=[-1+offset,-1-offset], P2=[1,1], V1=[1,1], V2=[-1,-1], rad=1
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      edgeTest(userRet, [0.7071067811865476, -0.7071067811865475],[...inputs], "graze")
    });
    it("Bounds buffer min left", function() {
      const offset = (-1.0459189070388675e-11)+btol+Number.EPSILON*11
        , P1=[5+offset,-1], P2=[8+offset,-1], V1=[-1,0], V2=[-1.0007730535615681,0], rad=1.11111111111111
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet,[ -998.9999999999989, -1 ],[...inputs])
    });
    it("Bounds buffer max left", function() {
      const offset = (-1.0459189070388675e-11)-btol-Number.EPSILON*10
        , P1=[5+offset,-1], P2=[8+offset,-1], V1=[-1,0], V2=[-1.0007730535615681,0], rad=1.11111111111111
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      missTest(userRet, [...inputs])
    });
    it("Bounds buffer exact left", function() {
      const offset = (-1.0459189070388675e-11)
        , P1=[5+offset,-1], P2=[8+offset,-1], V1=[-1,0], V2=[-1.0007730535615681,0], rad=1.11111111111111
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      edgeTest(userRet,[ -1000, -1 ], [...inputs], "border")
    });
    it("Bounds buffer min right", function() {
      const offset = (1.0459189070388675e-11)-btol-Number.EPSILON*11
        , P1=[-8+offset,-1], P2=[-5+offset,-1], V1=[1.0007730535615681,0], V2=[1,0], rad=1.11111111111111
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet,[ 998.9999999999989, -1 ],[...inputs])
    });
    it("Bounds buffer max right", function() {
      const offset = (1.0459189070388675e-11)+btol+Number.EPSILON*10
        , P1=[-8+offset,-1], P2=[-5+offset,-1], V1=[1.0007730535615681,0], V2=[1,0], rad=1.11111111111111
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      missTest(userRet, [...inputs])
    });
    it("Bounds buffer exact right", function() {
      const offset = (1.0459189070388675e-11)
        , P1=[-8+offset,-1], P2=[-8+offset,-1], V1=[1.0007730535615681,0], V2=[1,0], rad=1.11111111111111
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      edgeTest(userRet,[ 1000, -1 ], [...inputs], "border")
    });
    it("Bounds buffer min top", function() {
      const offset = (1.0459189070388675e-11)-btol-Number.EPSILON*11
        , P1=[-1,-8+offset], P2=[-1,-5+offset], V1=[0,1.0007730535615681], V2=[0,1], rad=1.11111111111111
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet,[-1 , 998.9999999999989],[...inputs])
    });
    it("Bounds buffer max top", function() {
      const offset = (1.0459189070388675e-11)+btol+Number.EPSILON*10
        , P1=[-1,-8+offset], P2=[-1,-5+offset], V1=[0,1.0007730535615681], V2=[0,1], rad=1.11111111111111
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      missTest(userRet, [...inputs])
    });
    it("Bounds buffer exact top", function() {
      const offset = (1.0459189070388675e-11)
        , P1=[-1,-8+offset], P2=[-1,-8+offset], V1=[0,1.0007730535615681], V2=[0,1], rad=1.11111111111111
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      edgeTest(userRet,[-1,1000], [...inputs], "border")
    });
    it("Bounds buffer min bottom", function() {
      const offset = (-1.0459189070388675e-11)+btol+Number.EPSILON*11
        , P1=[-1,5+offset], P2=[-1,8+offset], V1=[0,-1], V2=[0,-1.0007730535615681], rad=1.11111111111111
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      hitTest(userRet,[ -1,-998.9999999999989 ],[...inputs])
    });
    it("Bounds buffer max bottom", function() {
      const offset = (-1.0459189070388675e-11)-btol-Number.EPSILON*10
        , P1=[-1,5+offset], P2=[-1,8+offset], V1=[0,-1], V2=[0,-1.0007730535615681], rad=1.11111111111111
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      missTest(userRet, [...inputs])
    });
    it("Bounds buffer exact bottom", function() {
      const offset = (-1.0459189070388675e-11)
        , P1=[-1,5+offset], P2=[-1,8+offset], V1=[0,-1], V2=[0,-1.0007730535615681], rad=1.11111111111111
        , radCopy = rad, inputs = [[...P1],[...P2],[...V1],[...V2],radCopy]
        , userRet = circleCollision(...inputs)
      edgeTest(userRet,[-1 ,-1000], [...inputs], "border")
    });
  });

  ///////////Reusable test functions////////////

  const validateUserReturn = function(uR){
    assert(Array.isArray(uR), "Invalid return. Return a number array of length 2 or 0")
    assert([0,2].includes(uR.length), "Invalid return. Return a number array of length 2 or 0")
  }

  //if scenerio is a definate hit, use this function
  //inputs: userReturn, expected point, [P1,P2,V1,V2,r]
  const hitTest = function(uR, ex, inputs){ 
    validateUserReturn(uR)
    const willFail1 = (uR.length != 2) 
      , willFail2 = Math.abs(uR[0])>(Math.abs(ex[0])+tol)
      , willFail3 = Math.abs(uR[1])>(Math.abs(ex[1])+tol)
      , willFail4 = Math.abs(uR[0])<(Math.abs(ex[0])-tol)
      , willFail5 = Math.abs(uR[1])<(Math.abs(ex[1])-tol)
      , willFail = willFail1 || willFail1 || willFail2 || willFail3 || willFail4 || willFail5
      , failMessage = (willFail)? 
        `P1: [${inputs[0]}]\nP2: [${inputs[1]}]\nV1: [${inputs[2]}]\nV2: [${inputs[3]}]\n` + 
        `rad: ${inputs[4]}\nThis test was a definite hit.\nCollision at [${ex}], `
        : ""
    expect(uR.length).to.equal(2, failMessage +`expected a point, not []\nArray length`)
    expect(uR[0]).to.be.closeTo(ex[0], tol, failMessage +`X value not within tolerance.\n`)
    expect(uR[1]).to.be.closeTo(ex[1], tol, failMessage +`Y value not within tolerance.\n`)
  }

  //if scenerio is a definate miss, use this funtion
  //inputs: userReturn, [P1,P2,V1,V2,r]
  const missTest = function(uR, inputs){ 
    validateUserReturn(uR)
    const willFail = uR.length != 0
      , failMessage = (willFail)?
        `P1: [${inputs[0]}]\nP2: [${inputs[1]}]\nV1: [${inputs[2]}]\nV2: [${inputs[3]}]\n` + 
        `rad: ${inputs[4]}\nThis test was a definite miss.\nNo collision`
      : ""
    assert.deepEqual(uR,[],failMessage)
  }

  //if scenerio is a border or graze buffer case, use this function
  //inputs: userReturn, expected point or [], [P1,P2,V1,V2,r], edge category ("border" or "graze") 
  const edgeTest = function(uR,ex, inputs, cat){
    validateUserReturn(uR)
    const willFail1 = (uR.length == 2) 
      , willFail2 = Math.abs(uR[0])>(Math.abs(ex[0])+tol)
      , willFail3 = Math.abs(uR[1])>(Math.abs(ex[1])+tol)
      , willFail4 = Math.abs(uR[0])<(Math.abs(ex[0])-tol)
      , willFail5 = Math.abs(uR[1])<(Math.abs(ex[1])-tol)
      , willFail = willFail1&& (willFail1 || willFail2 || willFail3 || willFail4 || willFail5)
    const failMessage = (willFail)?
      `P1: [${inputs[0]}]\nP2: [${inputs[1]}]\nV1: [${inputs[2]}]\nV2: [${inputs[3]}]\n` + 
      `rad: ${inputs[4]}\nThis test was ` + 
      ((cat=="border")? `a border buffer case.\n` : `a negligible collision case. \n`) + 
      `[] or point within tolerance would have passed,\n`
      : ""
    if(uR.length==2){
      expect(uR[0]).to.be.closeTo(ex[0], tol, failMessage + `but X value not within tolerance\n`)
      expect(uR[1]).to.be.closeTo(ex[1], tol, failMessage + `but Y value not within tolerance\n`)
    }
    //no need to test []. Automatic pass if recieved.
  }
});

*/

