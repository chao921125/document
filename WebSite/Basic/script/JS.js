const number = 25

const p1 = new Promise((resolve, reject) => {
  if (number >= 10) resolve('p1 success!')
  else reject('p1 failed!')
})
const p2 = new Promise((resolve, reject) => {
  if (number >= 20) resolve('p2 success!')
  else reject('p2 failed!')
})
const p3 = new Promise((resolve, reject) => {
  if (number >= 30) resolve('p3 success!')
  else reject('p3 failed!')
})
const promise = Promise.all([p1, p2, p3]).then(res => {
  console.log("res", res)  // 当number为35时，res值为[ 'p1 success!', 'p2 success!', 'p3 success!' ]
}, error => {
  console.log("error", error)    // 当number为25时，p3会返回rejected，promise状态会变成rejected，error值为p3 failed!
})

function debounce(fn,wait){
  let timer = null;
  return function(){
    if(timer !== null){
      clearTimeout(timer);
    }
    timer = setTimeout(fn,wait);
  }
}

function test() {
  console.log("test");
}
document.querySelector("#test").addEventListener("click", debounce(test, 1000));
