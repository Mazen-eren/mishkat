const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
});
const cards = document.querySelectorAll(".carousel .card");
function rotateCarousel() {
  const activeCard = document.querySelector('.carousel .card.active');
  const nextCard = activeCard.nextElementSibling || document.querySelector('.carousel .card:first-child');
  cards.forEach(card => {
    card.classList.remove('active');
    card.style.opacity = '0.7';
    card.style.zIndex = '1';
    card.style.transform = '';
  });
  cards.forEach((card, index) => {
    if (card === nextCard) {
      card.classList.add('active');
      card.style.transform = 'translateX(0) scale(1.1)';
      card.style.zIndex = '4';
      card.style.opacity = '1';
    } else if (card === activeCard) {
      card.style.transform = 'translateX(60px) scale(0.9)';
      card.style.zIndex = '1';
    } else {
      card.style.transform = 'translateX(-60px) scale(0.9)';
      card.style.zIndex = '1';
    }
  });
}
cards.forEach(card => {
  card.addEventListener('click', () => {
    rotateCarousel();
  });
});
setInterval(rotateCarousel, 5000);
const slider = document.querySelector('.slider');
let scrollAmount = 0;
if (slider) {
  function autoScrollCarousel() {
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    scrollAmount += slider.clientWidth;
    if (scrollAmount > maxScroll) {
      scrollAmount = 0;
    }
    slider.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }
  setInterval(autoScrollCarousel, 4000);
}
const quantityDisplay = document.getElementById('quantity');
const cartQuantityDisplay = document.getElementById('cart-quantity');
const decreaseBtn = document.getElementById('decrease');
const increaseBtn = document.getElementById('increase');
const cartDecreaseBtn = document.getElementById('cart-decrease');
const cartIncreaseBtn = document.getElementById('cart-increase');
const totalPrice = document.getElementById('total-price');
const formQuantity = document.getElementById('form-quantity');
const formTotal = document.getElementById('form-total');
let quantity = 1;
const pricePerUnit = 59;
function updateQuantity() {
  quantityDisplay.textContent = quantity;
  cartQuantityDisplay.textContent = quantity;
  totalPrice.textContent = (quantity * pricePerUnit) + ' د.ت';
  formQuantity.value = quantity;
  formTotal.value = quantity * pricePerUnit;
}
if (decreaseBtn && increaseBtn) {
  decreaseBtn.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      updateQuantity();
    }
  });

  increaseBtn.addEventListener('click', () => {
    quantity++;
    updateQuantity();
  });
}

if (cartDecreaseBtn && cartIncreaseBtn) {
  cartDecreaseBtn.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      updateQuantity();
    }
  });

  cartIncreaseBtn.addEventListener('click', () => {
    quantity++;
    updateQuantity();
  });
}

const cartOverlay = document.getElementById('cart-overlay');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');

if (openCartBtn && closeCartBtn && cartOverlay) {
  openCartBtn.addEventListener('click', () => {
    cartOverlay.classList.add('active');
  });

  closeCartBtn.addEventListener('click', () => {
    cartOverlay.classList.remove('active');
  });

  cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) {
      cartOverlay.classList.remove('active');
    }
  });
}

updateQuantity();


function updateFormHiddenFields() {
  document.getElementById('form-quantity').value = quantity;
  document.getElementById('form-total').value = quantity * pricePerUnit;
}


function updateQuantity() {
  quantityDisplay.textContent = quantity;
  cartQuantityDisplay.textContent = quantity;
  totalPrice.textContent = (quantity * pricePerUnit) + ' د.ت';
  updateFormHiddenFields(); 
}

const orderForm = document.querySelector('.order-form');
if (orderForm) {
  orderForm.addEventListener('submit', function(e) {
  
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('customer-address').value;
    
    if (!name || !phone || !address) {
      e.preventDefault();
      alert('⚠️ الرجاء ملء جميع الحقول المطلوبة');
      return false;
    }
  
    setTimeout(() => {
      alert('✅ تم إرسال طلبك بنجاح! سنتواصل معك قريباً.');
      cartOverlay.classList.remove('active');
      orderForm.reset();
      quantity = 1;
      updateQuantity();
    }, 100);
    
    return true;
  });

}
