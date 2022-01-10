//t =>  max optimal length of trip 
// ls => array of length to cities
// k => amount of cities that 

// ******************************************
//additional functions
function fact(N) {
    var facts = [];
    if (N == 0 || N == 1) return 1;
    if (facts[N]) return facts[N];
    facts[N] = N * fact(N - 1);
    return facts[N];
  }
  

  function combination(index, k, A) {
    var res = [0];
    var n = A.length;
    var s = 0;
    for (var t = 1; t <= k; t++) {
      var j = res[t - 1] + 1;
      while ((j < (n - k + t)) && ((s + C(n - j, k - t)) <= index)) {
        s += C(n - j, k - t);
        j++;
      }
        res.push(j);
    }
    res.splice(0, 1);
    //console.log(res)
    return res;
  }
  function C(n, k) {
    return fact(n) / fact(k) / fact(n - k);
  }
// ******************************************



// main function
const chooseOptimalDistance = (t, k, ls) => {
    // твій код
    if(!Number.isInteger(k) || !Number.isInteger(t) ||  !Array.isArray(ls))
    { 
      return null;
    }
    if(ls.length < k)
    {
        return null;
    }
    for(let i=0;i<ls.length;i++)
    {
      if(ls[i]<0)
      {
        return null;
      }
      
    }
    let array_of_array =[]
    for (var i = 0; i < C(ls.length, k); i++) {
      array_of_array.push(combination(i, k, ls))
    }
    let array_of_optimal_sum = []
    for(let i =0;i<array_of_array.length;i++)
    {
      let sum =0;
      let buf_array=array_of_array[i] 
      for(let k =0;k<buf_array.length;k++)
      { 
        sum += ls[buf_array[k]-1]    
      }
      if(sum<=t)
      {
       // console.log(sum)
        array_of_optimal_sum.push(sum)
      }
    }
    let the_most_optimal_way = 0;
    if(array_of_optimal_sum.length == 0)
    {
      return null;
    }
    for(let i=0;i<array_of_optimal_sum.length;i++)
    {
      if(array_of_optimal_sum[i]>the_most_optimal_way)
      {
        the_most_optimal_way = array_of_optimal_sum[i]
      }
    } 
    return the_most_optimal_way;
}

// testing
console.log(chooseOptimalDistance(174, 3, [51, 56, 58, 59, 61])) ; //173
console.log(chooseOptimalDistance(163, 3, [50])); // null
console.log(chooseOptimalDistance(44, 2, [51, 56, 58, 32, 11])) ; //43
console.log(chooseOptimalDistance(221, 3, [51, 10, 15, 59, 61,100,21])) ; //220
console.log(chooseOptimalDistance(230, 4, [51, 56, 58, 59, 61])) ; //229
console.log(chooseOptimalDistance(null, null, null)) ; //null
