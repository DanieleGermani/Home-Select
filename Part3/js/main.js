

$('.add-to-cart').click(function(event){
    event.preventDefault();
    let name = $(this).attr("data-name");
    let price = Number($(this).attr("data-price"));
    let code = $(this).attr("data-code");

    addItemToCart(code, name, price, 1);
    console.log(code)
    displayCart();
});

function displayCart(){
  let cartArray = listCart();
  var output  = "";
    for(let i in cartArray){
      output += "<li>"+cartArray[i].name+" "+ cartArray[i].count+" "+cartArray[i].code +"<li>";

    }
    $("#show-cart").html(output);
    $('#total-cart').html( totalCart() );


}

let cart = [];
let totalPriceGr1 = 0;
let totalPriceSr1 = 0;
let totalPriceNotDiscount = 0;


let Item = function(code, name, price, count) {
  this.code = code;
  this.name = name;
  this.price = price;
  this.count = count;
};

function addItemToCart(code, name, price, count) {
  for (let i in cart) {
    if (cart[i].code === code) {
      cart[i].count += count;
      return;
    }
  }
  let item = new Item(code, name, price, count);
  cart.push(item);
  saveCart();
}


function removeItemFromCart(name) {
  for (let i in cart) {
    if (cart[i].name === name) {
      cart[i].count--;
      if (cart[i].count === 0) {
        cart.splice(i, 1);
      }
      break;
    }
  }
  saveCart();
}


function removeItemFromCartAll(name){
  for (let i in cart) {
    if (cart[i].name === name) {
      cart.splice(i, 1);
      break;
    }
  }
  saveCart();
}


function clearCart(){
  cart = [];
  saveCart();
}


function countCart(){
  let totalCount = 0;

  for(let i in cart){
    totalCount += cart[i].count;
  }
  return totalCount;
}


function totalCart(){
let totalCartDiscount = 0;
discountSr1();
discountGr1();
notDiscount();
for (var i in cart) {
  totalCartDiscount = totalPriceGr1 + totalPriceSr1 + totalPriceNotDiscount;
}
return totalCartDiscount;
}


function listCart(){
  let cartCopy =[];
  for(let i in cart){
    let item = cart[i];
    let itemCopy = {};
    for(let p in item){
      itemCopy[p] = item[p];
    }
    cartCopy.push(itemCopy);
  }
  return cartCopy;
}

function saveCart(){
  localStorage.setItem("shoppingCart", JSON.stringify(cart));

}

function loadCart(){
  cart = JSON.parse(localStorage.getItem("shoppingCart"));
}
// loadCart();
displayCart();

var array = listCart();


function discountGr1(){
  for (let i in cart) {
    if(cart[i].code === 'GR1' && cart[i].count % 2 === 0){
       totalPriceGr1 = (cart[i].count * 3.11) / 2;
       break;
    }
    if (cart[i].code === 'GR1' && cart[i].count % 2 !== 0){
      totalPriceGr1 = (((cart[i].count - 1) * 3.11)/2) + 3.11;
    }

  }
  return totalPriceGr1;
}

function discountSr1(){
  for (let i in cart){
    if(cart[i].code === 'SR1' && cart[i].count >= 3){
      totalPriceSr1 = (cart[i].count * 4.50);
      break;
    }
    if (cart[i].code === 'SR1' && cart[i].count <= 3){
      totalPriceSr1 = (cart[i].count * 5.00);
    }

  }
  return totalPriceSr1;
}
function  notDiscount() {
  for (let i in cart) {
    if (cart[i].code !== 'CF1'||'SR1') {
        totalPriceNotDiscount = (cart[i].count * cart[i].price);
    }
  }
  return totalPriceNotDiscount;

}
