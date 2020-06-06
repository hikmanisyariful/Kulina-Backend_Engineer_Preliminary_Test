class Item {
  constructor(name, price, duration) {
    this.item = name
    this.price = price
    this.duration = duration
  }
}

let modal = 50000
let laFonteSpaghetti = new Item('LaFonte Spaghetti', 13000, 1000)
let laFonteBolognase = new Item('laFonte Bolognase', 15000, 1000)
let paprika = new Item('Paprika', 13000, 5000)
let meatBall = new Item('Meat Ball', 20000, 1000)
let oliveOil = new Item('Olive Oil', 25000, 2000)
let onion = new Item('Onion', 7000, 3000)


//  following code smells which in too many identation levels while using callback

function buying(money, object, callback) {
  console.log(`I go to buy ${object.item}`)
  setTimeout(function() {
    if (money > object.price) {
      let change = money - object.price
      console.log(`I have bought ${object.item} and change is ${change}`)
      callback(change)
    } else {
      console.log(`Sorry, Money is not enough to buy ${object.item} and your money is ${money} now`)
      callback(money)
    }
  }, object.time)
}

buying(modal, laFonteSpaghetti, function(nowMoney){
    buying(nowMoney, laFonteBolognase, function(nowMoney){
        buying(nowMoney, paprika, function(nowMoney){
            buying(nowMoney, meatBall, function(nowMoney){
                buying(nowMoney, oliveOil, function(nowMoney){
                    buying(nowMoney, onion, function(nowMoney) {})
                })
            })
        })
    })
})


// This code below is a solution to resolve callback hell with using promise

function buy(money, object) {
  console.log(`I go to buy ${object.item}`)
  return new Promise(function (resolve, reject) {
    setTimeout(function() {
      let change = money - object.price
      if (money > object.price) {
        console.log(`I have bought ${object.item} and change is ${change}`)
        resolve(change)
      } else {
        console.log(`Sorry, Money is not enough to buy ${object.item} and your money is ${money} now`)
        reject(money)
      }
    }, object.time)
  })
}

buy(modal, laFonteSpaghetti)
    .then(function(nowMoney) {
        return buy(nowMoney, laFonteBolognase);
    })
    .then(function(nowMoney) {
        return buy(nowMoney, paprika);
    })
    .then(function(nowMoney) {
        return buy(nowMoney, meatBall)
    })
    .then(function(nowMoney) {
        return buy(nowMoney, oliveOil)
    })
    .then(function(nowMoney) {
      return buy(nowMoney, onion)
  })
    .catch(function(nowMoney) {
        console.log('Thank You!')
    })