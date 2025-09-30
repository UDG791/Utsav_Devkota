// ==========================
// Slider
// ==========================
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((s, i) => {
    s.classList.remove('active');
    s.style.opacity = '0';
    if (i === index) {
      s.classList.add('active');
      s.style.opacity = '1';
    }
  });
}

// Auto slide every 3s
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 3000);

// ==========================
// Cart functionality
// ==========================
let cartItems = [];

function buyNow(product) {
  alert(`🛒 Thank you for buying ${product}!`);
}

function addToCart(product, price) {
  const existingItem = cartItems.find(item => item.name === product);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cartItems.push({ name: product, price: price, qty: 1 });
  }
  alert(`✅ ${product} has been added to your cart!`);
  updateCartUI();
}

function clearCart() {
  if (cartItems.length === 0) {
    alert("⚠️ Your cart is already empty!");
    return;
  }
  cartItems = [];
  alert("🧹 Cart cleared!");
  updateCartUI();
}

function updateCartUI() {
  const cartList = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartList.innerHTML = '';
  let totalQty = 0;
  let totalPrice = 0;

  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x ${item.qty} - NPR ${item.price * item.qty}`;
    cartList.appendChild(li);
    totalQty += item.qty;
    totalPrice += item.price * item.qty;
  });

  cartTotal.textContent = `Total Items: ${totalQty} | Total Price: NPR ${totalPrice}`;
  document.getElementById('cart-count').textContent = totalQty;
}

// Clear cart button event
document.getElementById('clear-cart-btn').addEventListener('click', clearCart);

// Cart Button Alert
const cartBtn = document.getElementById('cartBtn');
if (cartBtn) {
  cartBtn.addEventListener('click', () => {
    alert("🛒 Opening your cart...");
    document.querySelector('#cart-section').scrollIntoView({ behavior: 'smooth' });
  });
}

// Smooth Scroll (for nav links)
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Sticky Header
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) header.classList.add('sticky');
  else header.classList.remove('sticky');
});

// Scroll Reveal
const revealElements = document.querySelectorAll('section h1, .product');
window.addEventListener('scroll', () => {
  const windowBottom = window.innerHeight + window.scrollY;
  revealElements.forEach(el => {
    if (windowBottom > el.offsetTop + 100) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
});

// Initialize hidden state
revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = '0.6s ease-out';
});

// Login / Signup Form
function setError(id, show) {
  const i = document.getElementById(id);
  const err = document.getElementById('err-' + id);
  if (show) {
    i.classList.add('error');
    err.style.display = 'block';
  } else {
    i.classList.remove('error');
    err.style.display = 'none';
  }
}

function validateLogin() {
  setError('fname', !document.getElementById('fname').value.trim());
  setError('lname', !document.getElementById('lname').value.trim());
  setError('email', !/^[^@]+@[^@]+\.[a-z]{2,}$/i.test(document.getElementById('email').value));
  setError('phone', !/^98[0-9]{8}$/.test(document.getElementById('phone').value));

  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (fname && lname && /^[^@]+@[^@]+\.[a-z]{2,}$/i.test(email) && /^98[0-9]{8}$/.test(phone)) {
    document.getElementById('success-msg').style.display = 'block';
    alert('🎉 Login/Signup Successful!');
  } else {
    document.getElementById('success-msg').style.display = 'none';
    alert('⚠️ Please fill all fields correctly.');
  }
}

// Attach validateLogin to the form submit
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    validateLogin();
  });
}

// Seller Form Submission
function submitSellerForm() {
  const name = document.getElementById('seller-name').value.trim();
  const email = document.getElementById('seller-email').value.trim();
  const product = document.getElementById('seller-product').value.trim();
  const desc = document.getElementById('seller-desc').value.trim();

  if (!name || !email || !product || !desc) {
    alert('⚠️ Please fill all seller form fields!');
    return false;
  }

  alert(`✅ Thank you ${name}, your product "${product}" has been submitted for approval!`);
  document.getElementById('seller-form').reset();
  return false;
}

// Dropdown toggle for mobile or click
const dropdownBtn = document.querySelectorAll('.dropdown-btn');
dropdownBtn.forEach(btn => {
  btn.addEventListener('click', function() {
    this.parentElement.classList.toggle('active');
  });
});
