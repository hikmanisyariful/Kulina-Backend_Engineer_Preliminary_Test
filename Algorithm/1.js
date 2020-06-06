let n = 9
let ar = [10, 20, 20, 10, 10, 30, 50, 10, 20]

function sockMerchant (length, arr) {
  let pairs = 0
  const obj = {}

  for (let i = 0; i < n; i++) {
    if (obj[arr[i]]) {
      pairs += 1
      obj[arr[i]] = 0
    } else {
      obj[arr[i]] = 1
    }
  }
  return pairs
}

console.log(sockMerchant(n, ar))
