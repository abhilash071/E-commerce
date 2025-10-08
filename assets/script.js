(function(){
}


// wire add-to-cart buttons
document.addEventListener('click', function(e){
const a = e.target.closest('.add-to-cart');
if(a){
const id = a.dataset.id, name = a.dataset.name, price = a.dataset.price
addToCart(id,name,price)
}
})


// populate order summary on checkout page
function renderOrder(){
const itemsEl = document.getElementById('order-items');
const totalEl = document.getElementById('order-total');
if(!itemsEl || !totalEl) return;
const cart = getCart();
itemsEl.innerHTML = '';
let total = 0;
if(cart.length === 0){ itemsEl.innerHTML = '<p class="muted">Your cart is empty. <a href="products.html">Shop now</a></p>'; totalEl.textContent = '₹0'; return }
cart.forEach(it=>{
const row = document.createElement('div'); row.style.display='flex'; row.style.justifyContent='space-between'; row.style.marginBottom='8px';
row.innerHTML = `<div>${it.name} × ${it.qty}</div><div>₹${it.price*it.qty}</div>`
itemsEl.appendChild(row); total += it.price * it.qty
})
totalEl.textContent = '₹' + total;
}


// checkout form submit
const checkoutForm = document.getElementById('checkout-form');
if(checkoutForm){
checkoutForm.addEventListener('submit', function(ev){
ev.preventDefault();
// naive validation
const cart = getCart();
if(cart.length === 0){ alert('Your cart is empty. Add items before placing order.'); return }
// collect fields (we won't actually process payment in demo)
const name = document.getElementById('fullname').value.trim();
const email = document.getElementById('email').value.trim();
if(!name || !email){ alert('Please fill required fields'); return }
// simulate order placement
localStorage.removeItem(CART_KEY); updateCartCount();
// redirect to thank you with a tiny delay
setTimeout(()=>{ window.location.href = 'thankyou.html' }, 400)
})
}


// contact form
const contactForm = document.getElementById('contact-form');
if(contactForm){
contactForm.addEventListener('submit', function(ev){ ev.preventDefault(); alert('Thanks — we received your message (demo).'); contactForm.reset(); })
}


// on thankyou page maybe clear cart (already cleared on checkout) and show message


// initial render
updateCartCount(); renderOrder();


// small helper to show cart on console during demo
window.__sunlit = {getCart, addToCart, saveCart}
})();


<!-- EOF script -->
