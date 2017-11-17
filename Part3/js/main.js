$('.add-to-cart').click(function(event) {
  event.preventDefault();
  let name = $(this).attr("data-name");
  let price = Number($(this).attr("data-price"));
  let code = $(this).attr("data-code");

  addItemToCart(code, name, price, 1);
  displayCart();
});


$('#clear-cart').click(function(event) {
  clearCart();
  displayCart();
});

function displayCart() {
  let cartArray = listCart();
  var output = "";
  for (let i in cartArray) {
    output += `
     <div class="row">
        <div class="col-xs-2"><img class="img-responsive" src="http://placehold.it/100x70">
        </div>
        <div class="col-xs-4">
          <h4 class="product-name"><strong>${cartArray[i].name}</strong></h4><h4><small>${cartArray[i].code}</small></h4>
        </div>
      <div class="col-xs-6">
          <div class="col-xs-3 text-right">
            <h6><strong>Quantity: ${cartArray[i].count} <span class="text-muted">x</span></strong></h6>
          </div>
          <div class="col-xs-3 text-right">
            <h6><strong>Price: $ ${cartArray[i].price} <span class="text-muted"></span></strong></h6>
          </div>
          <div class="col-xs-3 text-right">
            <h6><strong>Total: ${cartArray[i].total} <span class="text-muted"></span></strong></h6>
          </div>
          <div class="col-xs-2 text-right">
            <button type="button" data-name='${cartArray[i].name}' class="delete-item btn btn-link btn-xs">
              <span class="glyphicon glyphicon-trash">Unit </span>
            </button>
        </div>
        <div class="col-xs-1">
          <button type="button" data-name='${cartArray[i].name}' class="delete-all btn btn-link btn-xs">
            <span class="glyphicon glyphicon-trash">Total </span>
          </button>
      </div>
      </div>
      </div><br>
        `;
  }
  $("#show-cart").html(output);
  $('#total-cart').html(totalCart());
}
$('#show-cart').on("click", ".delete-item", function(event) {
  let name = $(this).attr("data-name");
  removeItemFromCart(name);
  displayCart();

});
$('#show-cart').on("click", ".delete-all", function(event) {
  let name = $(this).attr("data-name");
  removeItemFromCartAll(name);
  displayCart();
});

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

function removeItemFromCartAll(name) {
  for (let i in cart) {
    if (cart[i].name === name) {
      cart.splice(i, 1);
      break;
    }
  }
  saveCart();
}

function clearCart() {
  cart = [];
  saveCart();
}

function countCart() {
  let totalCount = 0;

  for (let i in cart) {
    totalCount += cart[i].count;
  }
  return totalCount;
}

function totalCart() {
  let totalCart = 0;
  discountSr1();
  discountGr1();
  notDiscount();
  for (var i in cart) {
    totalCart = totalPriceGr1 + totalPriceSr1 + totalPriceNotDiscount;
  }
  return totalCart.toFixed(2);
}

function listCart() {
  let cartCopy = [];
  for (let i in cart) {
    let item = cart[i];
    let itemCopy = {};
    for (let p in item) {
      itemCopy[p] = item[p];
    }
    itemCopy.total = (item.price * item.count).toFixed(2);
    cartCopy.push(itemCopy);
  }
  return cartCopy;
}

function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));

}

function loadCart() {
  cart = JSON.parse(localStorage.getItem("shoppingCart"));
}

function discountGr1() {
  for (let i in cart) {
    if (cart[i].code === 'GR1' && cart[i].count % 2 === 0) {
      totalPriceGr1 = (cart[i].count * 3.11) / 2;
      break;
    }
    if (cart[i].code === 'GR1' && cart[i].count % 2 !== 0) {
      totalPriceGr1 = (((cart[i].count - 1) * 3.11) / 2) + 3.11;
    }

  }
  return totalPriceGr1;
}

function discountSr1() {
  for (let i in cart) {
    if (cart[i].code === 'SR1' && cart[i].count >= 3) {
      totalPriceSr1 = (cart[i].count * 4.50);
      break;
    }
    if (cart[i].code === 'SR1' && cart[i].count <= 3) {
      totalPriceSr1 = (cart[i].count * 5.00);
    }
  }
  return totalPriceSr1;
}

function notDiscount() {
  for (let i in cart) {
    if (cart[i].code === 'CF1') {
      totalPriceNotDiscount = (cart[i].count * 11.23);
    }
  }
  return totalPriceNotDiscount;
}

// loadCart();
displayCart();
var array = listCart();
