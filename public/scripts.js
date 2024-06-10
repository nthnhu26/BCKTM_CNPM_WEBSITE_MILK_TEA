function showLoginForm() {
  // Lấy phần tử loginContainer
  const loginContainer = document.getElementById('loginContainer');

  // Kiểm tra nếu nội dung đăng nhập đã được tải
  if (loginContainer.innerHTML === '') {
    // Nếu chưa, tải nội dung đăng nhập từ máy chủ bằng AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/login', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        // Chèn nội dung đăng nhập vào loginContainer
        loginContainer.innerHTML = xhr.responseText;
        loginContainer.style.display = 'block';
      }
    };
    xhr.send();
  } else {
    // Nếu đã tải, chỉ cần hiển thị loginContainer
    loginContainer.style.display = 'block';
  }
}

// Hàm này sẽ được gọi khi đóng form đăng nhập
function hideLoginForm() {
  // Ẩn form đăng nhập
  var loginContainer = document.getElementById('loginContainer');
  loginContainer.style.display = 'none';
  // Xóa nội dung của phần tử có id là "loginContainer" để ẩn form đăng nhập đi
  loginContainer.innerHTML = '';
}

function showRegisterForm() {
  // Ẩn form đăng nhập
  hideLoginForm();
  // Tải nội dung trang đăng ký
  loadRegisterForm();
}

function loadRegisterForm() {
  // Tạo một đối tượng XMLHttpRequest
  const xhr = new XMLHttpRequest();
  // Xử lý sự kiện khi yêu cầu hoàn tất
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Lấy nội dung trang đăng ký từ máy chủ
        const registerContent = xhr.responseText;
        // Chèn nội dung trang đăng ký vào phần tử loginContainer
        const loginContainer = document.getElementById('loginContainer');
        loginContainer.innerHTML = registerContent;
        loginContainer.style.display = 'flex';
      } else {
        console.error('Error loading register form:', xhr.status);
      }
    }
  };
  // Gửi yêu cầu GET đến máy chủ để lấy nội dung trang đăng ký
  xhr.open('GET', '/register', true);
  xhr.send();
}

function loadOrderForm(productId) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const orderContent = xhr.responseText;

        const orderContainer = document.getElementById('orderContainer');
        orderContainer.innerHTML = orderContent;
        orderContainer.style.display = 'block';
      } else {
        console.error('Error loading order form:', xhr.status);
      }
    }
  };
  xhr.open('GET', `/order?productId=${productId}`, true);
  xhr.send();
}
/***************ADMIN*************/
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');
  loadCategories();
  loadProducts();
  loadUsers();
  loadOrders();
  loadPayments();
  loadContacts();
  loadMonthlyIncome();

  const categoryForm = document.getElementById('categoryForm');
  const productForm = document.getElementById('productForm');

  if (categoryForm) {
    categoryForm.addEventListener('submit', addCategory);
  } else {
    console.error('categoryForm not found');
  }

  if (productForm) {
    productForm.addEventListener('submit', addProduct);
  } else {
    console.error('productForm not found');
  }
});

function loadCategories() {
  console.log('Loading categories');
  fetch('/api/categories')
    .then(response => response.json())
    .then(categories => {
      console.log('Categories:', categories);
      const categoryList = document.getElementById('categoryList');
      const productCategory = document.getElementById('productCategory');
      categoryList.innerHTML = '';
      productCategory.innerHTML = '';
      categories.forEach(category => {
        categoryList.innerHTML += `<li>${category.TEN_DM}</li>`;
        productCategory.innerHTML += `<option value="${category.ID_DM}">${category.TEN_DM}</option>`;
      });
    })
    .catch(error => console.error('Error loading categories:', error));
}

function loadProducts() {
  console.log('Loading products');
  fetch('/api/products')
    .then(response => response.json())
    .then(products => {
      console.log('Products:', products);
      const productList = document.getElementById('productList');
      productList.innerHTML = '';
      products.forEach(product => {
        productList.innerHTML += `<li>${product.TEN_SP} - ${product.GIA}</li>`;
      });
    })
    .catch(error => console.error('Error loading products:', error));
}

function loadUsers() {
  console.log('Loading users');
  fetch('/api/users')
    .then(response => response.json())
    .then(users => {
      console.log('Users:', users);
      const userList = document.getElementById('userList');
      userList.innerHTML = '';
      users.forEach(user => {
        userList.innerHTML += `<li>${user.TEN_ND} - ${user.EMAIL}</li>`;
      });
    })
    .catch(error => console.error('Error loading users:', error));
}

function loadOrders() {
  console.log('Loading orders');
  fetch('/api/orders')
    .then(response => response.json())
    .then(orders => {
      console.log('Orders:', orders);
      const orderList = document.getElementById('orderList');
      orderList.innerHTML = '';
      orders.forEach(order => {
        orderList.innerHTML += `<li>Order ID: ${order.ID_DH} - ${order.TONG_TIEN}</li>`;
      });
    })
    .catch(error => console.error('Error loading orders:', error));
}

function loadPayments() {
  console.log('Loading payments');
  fetch('/api/payments')
    .then(response => response.json())
    .then(payments => {
      console.log('Payments:', payments);
      const paymentList = document.getElementById('paymentList');
      paymentList.innerHTML = '';
      payments.forEach(payment => {
        paymentList.innerHTML += `<li>Payment ID: ${payment.ID_TT} - ${payment.TONG_TIEN}</li>`;
      });
    })
    .catch(error => console.error('Error loading payments:', error));
}

function loadContacts() {
  console.log('Loading contacts');
  fetch('/api/contacts')
    .then(response => response.json())
    .then(contacts => {
      console.log('Contacts:', contacts);
      const contactList = document.getElementById('contactList');
      contactList.innerHTML = '';
      contacts.forEach(contact => {
        contactList.innerHTML += `<li>${contact.TEN_LH} - ${contact.EMAIL}</li>`;
      });
    })
    .catch(error => console.error('Error loading contacts:', error));
}

function loadMonthlyIncome() {
  console.log('Loading monthly income');
  fetch('/api/monthly-income')
    .then(response => response.json())
    .then(data => {
      console.log('Monthly Income:', data);
      document.getElementById('monthlyIncome').querySelector('span').textContent = data.totalIncome;
    })
    .catch(error => console.error('Error loading monthly income:', error));
}

function addCategory(event) {
  event.preventDefault();
  const categoryName = document.getElementById('categoryName').value;

  fetch('/api/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ categoryName })
  })
    .then(response => response.json())
    .then(category => {
      console.log('Category added:', category);
      loadCategories();
      document.getElementById('categoryForm').reset();
    })
    .catch(error => console.error('Error adding category:', error));
}

function addProduct(event) {
  event.preventDefault();
  const productName = document.getElementById('productName').value;
  const productPrice = document.getElementById('productPrice').value;
  const productCategory = document.getElementById('productCategory').value;

  fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      productName,
      productPrice,
      productCategory
    })
  })
    .then(response => response.json())
    .then(product => {
      console.log('Product added:', product);
      loadProducts();
      document.getElementById('productForm').reset();
    })
    .catch(error => console.error('Error adding product:', error));
}

