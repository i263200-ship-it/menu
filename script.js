const PRODUCTS = [
  {id:"halwa-puri", name:"Halwa Puri Platter", category:"Breakfast", price:450, description:"Fluffy puris with sweet halwa, chana and pickle.", image:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85"},
  {id:"chana", name:"Spicy Chana Masala", category:"Breakfast", price:280, description:"Slow-cooked chickpeas with our house masala.", image:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85"},
  {id:"nihari", name:"Beef Nihari", category:"Specials", price:650, description:"Rich, comforting slow-cooked nihari with ginger.", image:"https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=900&q=85"},
  {id:"paratha", name:"Desi Aloo Paratha", category:"Breakfast", price:220, description:"Crisp, flaky paratha stuffed with spiced potato.", image:"https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85"},
  {id:"omelette", name:"Masala Omelette", category:"Breakfast", price:180, description:"Two eggs, green chilli, onion and fresh coriander.", image:"https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=85"},
  {id:"chai", name:"Doodh Patti Chai", category:"Drinks", price:120, description:"Strong, creamy Pakistani tea brewed fresh.", image:"https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=900&q=85"},
  {id:"lassi", name:"Sweet Lassi", category:"Drinks", price:180, description:"Chilled, creamy yoghurt drink served traditional style.", image:"https://images.unsplash.com/photo-1553909489-cd47e0ef937f?auto=format&fit=crop&w=900&q=85"},
  {id:"kulcha", name:"Cholay Kulcha", category:"Breakfast", price:350, description:"Soft kulcha served with tangy, spiced chickpeas.", image:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=900&q=85"},
  {id:"payee", name:"Maghaz & Paye Special", category:"Specials", price:750, description:"A weekend favourite, full of traditional flavour.", image:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=85"}
];
const CART_KEY = "rajaDabaCart";
const money = n => "Rs. " + Number(n).toLocaleString("en-PK");
function getCart(){ try{return JSON.parse(localStorage.getItem(CART_KEY)) || [];}catch(e){return [];} }
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartCount(); }
function updateCartCount(){
  const count = getCart().reduce((sum,item)=>sum+item.qty,0);
  document.querySelectorAll("#cart-count").forEach(el=>el.textContent=count);
}
function addToCart(id){
  const product=PRODUCTS.find(p=>p.id===id); if(!product)return;
  const cart=getCart(); const found=cart.find(i=>i.id===id);
  if(found)found.qty++; else cart.push({id,qty:1});
  saveCart(cart); showToast(product.name+" added to your cart.");
}
function showToast(message){
  let toast=document.getElementById("toast");
  if(!toast){toast=document.createElement("div");toast.id="toast";toast.className="toast-message";document.body.appendChild(toast);}
  toast.textContent=message; toast.classList.remove("is-hidden"); clearTimeout(window.toastTimer);
  window.toastTimer=setTimeout(()=>toast.classList.add("is-hidden"),2300);
}
function productCard(p){
  return `<article class="food-card"><img src="${p.image}" alt="${p.name}" loading="lazy"><div class="food-info"><div class="food-top"><h3>${p.name}</h3><span class="price">${money(p.price)}</span></div><p>${p.description}</p><div class="food-actions"><span class="tag">${p.category}</span><button class="button small" type="button" onclick="addToCart('${p.id}')">Add to cart +</button></div></div></article>`;
}
function renderFeatured(){
  const el=document.getElementById("featured-products"); if(el)el.innerHTML=PRODUCTS.slice(0,3).map(productCard).join("");
}
function renderMenu(){
  const grid=document.getElementById("menu-products"); if(!grid)return;
  const search=document.getElementById("menu-search");
  const active=document.querySelector(".filter-btn.active")?.dataset.category || "All";
  const term=(search?.value||"").trim().toLowerCase();
  const results=PRODUCTS.filter(p=>(active==="All"||p.category===active) && (p.name.toLowerCase().includes(term)||p.description.toLowerCase().includes(term)));
  grid.innerHTML=results.length?results.map(productCard).join(""):'<div class="empty no-results"><div class="emoji">🍽️</div><h3>No dishes found</h3><p>Try another search or category.</p></div>';
}
function renderCart(){
  const wrap=document.getElementById("cart-content"); if(!wrap)return;
  const cart=getCart();
  if(!cart.length){wrap.innerHTML='<div class="empty"><div class="emoji">🧺</div><h2>Your cart is waiting</h2><p>Add a few breakfast favourites and they will appear here.</p><a class="button" href="menu.html">Explore the menu</a></div>';return;}
  let subtotal=0;
  const rows=cart.map(item=>{
    const p=PRODUCTS.find(x=>x.id===item.id); if(!p)return "";
    subtotal+=p.price*item.qty;
    return `<div class="cart-row"><img src="${p.image}" alt="${p.name}"><div><h3>${p.name}</h3><p>${money(p.price)} each</p><div class="qty"><button type="button" aria-label="Decrease ${p.name}" onclick="changeQty('${p.id}',-1)">−</button><span>${item.qty}</span><button type="button" aria-label="Increase ${p.name}" onclick="changeQty('${p.id}',1)">+</button></div></div><div><strong>${money(p.price*item.qty)}</strong><br><button class="remove" type="button" onclick="removeItem('${p.id}')">Remove</button></div></div>`;
  }).join("");
  const delivery=0;
  wrap.innerHTML=`<div class="cart-layout"><div class="cart-items"><h2>Your order</h2>${rows}</div><aside class="summary"><h2>Order summary</h2><div class="summary-line"><span>Subtotal</span><strong>${money(subtotal)}</strong></div><div class="summary-line"><span>Delivery</span><strong>Calculated on confirmation</strong></div><div class="summary-line total"><span>Total</span><span>${money(subtotal)}</span></div><a class="button" href="checkout.html">Continue to checkout</a><a class="button secondary" href="menu.html" class="continue-shopping">Continue shopping</a></aside></div>`;
}
function changeQty(id,delta){const cart=getCart();const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)return removeItem(id);saveCart(cart);renderCart();}
function removeItem(id){saveCart(getCart().filter(x=>x.id!==id));renderCart();}
function renderCheckout(){
  const box=document.getElementById("checkout-summary");if(!box)return;
  const cart=getCart();if(!cart.length){box.innerHTML='<p>Your cart is empty. <a href="menu.html">Browse the menu</a>.</p>';const form=document.getElementById("checkout-form");if(form)form.querySelector("button[type=submit]").disabled=true;return;}
  let total=0;box.innerHTML=cart.map(i=>{const p=PRODUCTS.find(x=>x.id===i.id);if(!p)return "";total+=p.price*i.qty;return `<div class="summary-line"><span>${p.name} × ${i.qty}</span><strong>${money(p.price*i.qty)}</strong></div>`;}).join("")+`<div class="summary-line total"><span>Total</span><span>${money(total)}</span></div>`;
}
document.addEventListener("DOMContentLoaded",()=>{
  updateCartCount();renderFeatured();renderMenu();renderCart();renderCheckout();
  const toggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav-links");
  if(toggle&&nav)toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});
  document.querySelectorAll(".filter-btn").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));btn.classList.add("active");renderMenu();}));
  const search=document.getElementById("menu-search");if(search)search.addEventListener("input",renderMenu);
  const contact=document.getElementById("contact-form");
  if(contact)contact.addEventListener("submit",e=>{e.preventDefault();if(!contact.reportValidity())return;const n=document.getElementById("contact-notice");n.textContent="Thank you! Your message has been recorded in this demo.";n.className="notice success show";contact.reset();});
  const checkout=document.getElementById("checkout-form");
  if(checkout)checkout.addEventListener("submit",e=>{
    e.preventDefault();if(!checkout.reportValidity())return;
    if(!getCart().length){showToast("Your cart is empty.");return;}
    const order="RD"+Date.now().toString().slice(-7);
    localStorage.removeItem(CART_KEY);updateCartCount();
    document.getElementById("checkout-main").innerHTML=`<div class="empty"><div class="emoji">🎉</div><p class="eyebrow">Order received</p><h1 class="confirmation-title">Thank you!</h1><p>Your demo order <strong>${order}</strong> has been placed successfully.</p><p>Payment method: Cash on delivery.</p><a class="button" href="index.html">Back to home</a></div>`;
  });
});
