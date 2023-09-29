window.onload = function () {
  getAllProduct();
  getUserCart();
  document.getElementById("welcomebaner").innerText =
    localStorage.getItem("username");
};

async function getAllProduct() {
  const response = await fetch("http://localhost:3000/products", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  const products = await response.json();

  let html = `<tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Image</th>
          <th>Stock</th>
          <th>Actions</th>
      </tr>`;

  products.forEach((prod) => {
    html += `
          <tr>
              <td>${prod.id}</td>
              <td>${prod.name}</td>
              <td>${prod.price}</td>
              <td>${prod.image}</td>
              <td>${prod.stock}</td>
              <td>
          `;
    if (prod.stock === 0) {
      html += `<button id='addToCartButton' disabled onclick="callToAddToCart(this);" type="button" class="inp">
        <img src="images/logo.png"  width="10px" height="10px"    />
      </button>
    </td>
  </tr>`;
    } else {
      html += `<button id='addToCartButton' onclick="callToAddToCart(this);" type="button" class="inp">
        <img src="images/logo.png"  width="10px" height="10px" />
      </button>
    </td>
  </tr>`;
    }
  });

  document.getElementById("my_prodcut_table_id").innerHTML = html;
}

async function getUserCart() {
  const response = await fetch(  "http://localhost:3000/carts/" + localStorage.getItem("userid"),
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  const cart = await response.json();

  const responseProducts = await fetch("http://localhost:3000/products", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const products = await responseProducts.json();
  console.log(products);
  let totalPrice = 0;
  let html = `<tr>
          <th>Name</th>
          <th>Price</th>
          <th>Image</th>
          <th>Total</th>
          <th>Quantity</th>
      </tr>`;

  cart.forEach((ct) => {
    const name = products.find((p) => p.id == ct.productId).name;
    const price = products.find((p) => p.id == ct.productId).price;
    const image = products.find((p) => p.id == ct.productId).image;

    const totalPerProduct = ct.quantity * price;
    totalPrice += totalPerProduct;
    html += `
          <tr>
              <td>${name}</td>
              <td>${price}</td>
              <td>${image}</td>
              <td>${totalPerProduct}</td>
             
              <td id="increase_decrease_id">
          <button
            type="button"
            class="minus"
            onclick="callToRemoveToCartPlus(${ct.productId});" 
          >
            -
          </button>
          <input
            type="text"
            id="qty2"
            disabled
            value="${ct.quantity}"
            style="width: 20px; text-align: center"
          />
          <button type="button" class="add"  onclick="callToAddToCartPlus(${ct.productId});" > 
            +
          </button>
        </td>
          </tr>
          `;
  });
  html += `<tr>
      <td colspan="4" style="padding-right: 10%; text-align: end" id="table_final_total_col">
      Total Price: $ ${totalPrice}
      </td>
    </tr>`;

  document.getElementById("shoping_cart_table").innerHTML = html;
}


function callToAddToCart(n) {
  var tr = n.parentNode.parentNode.cloneNode(true);
  const productId = tr.cells[0].innerHTML;

  const apiUrl = "http://localhost:3000/carts";
  const data = {
    userId: localStorage.getItem("userid"),
    productId: productId,
  };
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(apiUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log("Response:", data);
      // Handle the response data here
    })
    .catch((error) => {
      console.error("Error:", error);
     
    });
  document.addEventListener("click", getUserCart, false); 
  getUserCart();
}

function callToAddToCartPlus(n) {
  const productId = n;

  const apiUrl = "http://localhost:3000/carts";
  const data = {
    userId: localStorage.getItem("userid"),
    productId: productId,
  };
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(apiUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log("Response:", data);

    })
    .catch((error) => {
      console.error("Error:", error);

    });
  document.addEventListener("click", getUserCart, false); 
  getUserCart();
}

function callToRemoveToCartPlus(n) {
  const productId = n;

  const apiUrl = "http://localhost:3000/carts";
  const data = {
    userId: localStorage.getItem("userid"),
    productId: productId,
  };
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(apiUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log("Response:", data);
      // Handle the response data here
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle any errors that occurred during the request
    });
  document.addEventListener("click", getUserCart, false); // get_json_data is the function name that will fire on page load
  getUserCart();
}

function placeOrder() {
  var apiUrl =
    "http://localhost:3000/carts/placeOrder/" + localStorage.getItem("userid");
  var response;
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  };
  fetch(apiUrl, requestOptions).catch((err) => {});
}

function submitOrder() {

  placeOrder();


  location.reload();
}

document.getElementById("logout").onclick = function () {
  localStorage.removeItem("userid");
  localStorage.removeItem("token");
  location.href = "./index.html";
};


function updateProductStock() {

  const userCart = getUserCart();
  const targetedProduct = userCart.forEach((item) => {
    updateProduct(item);
  });

  updateProduct;
}

function deleteUserCart() {
  const currentUserCart = getUserCart();
  currentUserCart.forEach((item) => {
    removeProductFromCart(item.productId, item.userId);
  });
}
