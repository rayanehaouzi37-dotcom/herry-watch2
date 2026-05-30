// ==========================================================================
// LUXURY PRODUCT DATA ARCHITECTURE
// ==========================================================================
const productsData = [
    { id: 1, title: "Herry Royal Chrono", category: "montres", price: 3400, img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600", rating: 5, badge: "Best Seller", desc: "Mouvement à quartz de précision suisse avec boîtier en acier chirurgical poli et cadran noir d'encre profonde." },
    { id: 2, title: "Bracelet Torsadé Or 18K", category: "bracelets", price: 1800, img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600", rating: 5, badge: "Prestige", desc: "Bracelet minimaliste torsadé à la main, plaqué or jaune fin 18 carats pour une brillance éternelle." },
    { id: 3, title: "Collier Signature Atlas", category: "colliers", price: 2200, img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600", rating: 4, badge: "Nouveau", desc: "Chaîne fine sertie d'un pendentif géométrique inspiré des lignes pures de l'artisanat haut de gamme." },
    { id: 4, title: "Herry Minimalist Rose Gold", category: "montres", price: 2900, img: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&q=80&w=600", rating: 5, badge: "Édition Limitée", desc: "Pureté intemporelle alliant un profil ultra-fin en or rose à un bracelet en cuir véritable italien." },
    { id: 5, title: "Herry Oyster Diver Deluxe", category: "montres", price: 4200, img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600", rating: 5, badge: "Premium", desc: "Montre de plongée étanche à lunette rotative en céramique et index luminescents de haute clarté." },
    { id: 6, title: "Manchette Impériale Argent", category: "bracelets", price: 1500, img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600", rating: 4, badge: "Classique", desc: "Manchette d'une structure impeccable forgée dans l'argent sterling 925 brossé." },
    { id: 7, title: "Pendentif Diamant Solitaire", category: "colliers", price: 4900, img: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=600", rating: 5, badge: "Rare", desc: "Incrustation d'un oxyde de zirconium de grade impérial reproduisant l'éclat parfait du diamant d'Anvers." },
    { id: 8, title: "Herry Classic Black Crocodile", category: "montres", price: 3100, img: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80&w=600", rating: 5, badge: "Best Seller", desc: "Cadran soleillé orné d'un bracelet en cuir à motif crocodile noir mat d'une prestance rare." }
];

// Shopping Cart Core State Management
let shoppingCart = [];

// ==========================================================================
// INITIALIZER ENGINE
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    runLuxuryLoader();
    generateProductsGrid(productsData);
    generateSliderTrack();
    setupCartMechanics();
    setupFilteringSystem();
    setupSearchSystem();
    setupScrollEffects();
    setupMobileMenu();
    setupContactForm();
});

// 2.5 Seconds Cinematic Smooth Transition Loader (White Theme)
function runLuxuryLoader() {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 800);
    }, 2500);
}

// ==========================================================================
// CARD GENERATION & UI DISPLAY INJECTIONS
// ==========================================================================
function createProductCardHTML(p) {
    let starsHTML = '';
    for(let i=0; i<5; i++) {
        starsHTML += `<i class="fa-${i < p.rating ? 'solid' : 'regular'} fa-star"></i>`;
    }

    return `
        <div class="product-card reveal" data-category="${p.category}">
            <div class="product-img-holder">
                ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
                <img src="${p.img}" alt="${p.title}">
                <div class="product-actions-overlay">
                    <div class="action-btn qv-trigger" data-id="${p.id}" title="Aperçu Rapide"><i class="fa-regular fa-eye"></i></div>
                    <div class="action-btn add-to-wishlist" title="Ajouter aux Favoris"><i class="fa-regular fa-heart"></i></div>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${p.title}</h3>
                <div class="product-rating">${starsHTML}</div>
                <div class="product-price">${p.price.toLocaleString()} MAD</div>
                <button class="add-to-cart-btn-card" data-id="${p.id}">Ajouter au panier</button>
            </div>
        </div>
    `;
}

function generateProductsGrid(products) {
    const grid = document.getElementById("products-grid");
    if(!grid) return;
    grid.innerHTML = products.map(p => createProductCardHTML(p)).join('');
    setupQuickViewListeners();
    setupAddToCartListeners();
}

function generateSliderTrack() {
    const track = document.getElementById("slider-track");
    if(!track) return;
    const arrivals = productsData.slice(0, 6);
    track.innerHTML = arrivals.map(p => createProductCardHTML(p)).join('');
    setupSliderNavigation();
}

// ==========================================================================
// LUXURY SLIDER CAROUSEL NAVIGATION
// ==========================================================================
function setupSliderNavigation() {
    const track = document.getElementById("slider-track");
    const prev = document.getElementById("slide-prev");
    const next = document.getElementById("slide-next");
    if(!track || !prev || !next) return;

    let index = 0;
    
    function getSlideWidth() {
        const item = track.querySelector('.product-card');
        return item ? item.clientWidth + 30 : 300;
    }

    next.addEventListener("click", () => {
        const maxIndex = track.children.length - Math.floor(track.parentElement.clientWidth / getSlideWidth());
        if (index < maxIndex) {
            index++;
            track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
        }
    });

    prev.addEventListener("click", () => {
        if (index > 0) {
            index--;
            track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
        }
    });
}

// ==========================================================================
// SHOPPING CART SUB-SYSTEM INTERACTIVE CONTROL WITH SHIPPMENT FORM
// ==========================================================================
function setupCartMechanics() {
    const cartToggle = document.getElementById("cart-toggle-btn");
    const cartClose = document.getElementById("cart-close-btn");
    const cartSidebar = document.getElementById("cart-sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    
    const checkoutBtn = document.getElementById("checkout-btn");
    const backToCartBtn = document.getElementById("back-to-cart-btn");
    const shippingForm = document.getElementById("shipping-checkout-form");
    
    const step1 = document.getElementById("cart-step-1");
    const step2 = document.getElementById("cart-step-2");

    const toggleCart = () => {
        cartSidebar.classList.toggle("open");
        overlay.classList.toggle("open");
        // Reset to Step 1 on Close
        if(!cartSidebar.classList.contains("open")) {
            step1.style.display = "flex";
            step2.style.display = "none";
        }
    };

    if(cartToggle) cartToggle.addEventListener("click", toggleCart);
    if(cartClose) cartClose.addEventListener("click", toggleCart);
    if(overlay) overlay.addEventListener("click", toggleCart);
    
    // Smooth navigation to shipment checkout details form
    if(checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if(shoppingCart.length === 0) {
                alert("Votre panier est vide.");
                return;
            }
            const totalSpend = shoppingCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
            document.getElementById("checkout-final-price").innerText = `${totalSpend.toLocaleString()} MAD`;
            
            step1.style.display = "none";
            step2.style.display = "block";
        });
    }

    // Back to cart products list view
    if(backToCartBtn) {
        backToCartBtn.addEventListener("click", () => {
            step2.style.display = "none";
            step1.style.display = "flex";
        });
    }

    // Cash on Delivery Submit Form Handling
    if(shippingForm) {
        shippingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const clientName = document.getElementById("shipping-name").value;
            const clientPhone = document.getElementById("shipping-phone").value;
            const clientCity = document.getElementById("shipping-city").value;
            const clientAddress = document.getElementById("shipping-address").value;
            const totalSpend = shoppingCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

            console.log("Nouvelle Commande Maroc CoD HERRY WATCH :", {
                Client: clientName,
                Telephone: clientPhone,
                Ville: clientCity,
                Adresse: clientAddress,
                Panier: shoppingCart,
                Total: totalSpend
            });

            // Luxury confirmation layout window alert
            alert(`Merci pour votre confiance, M./Mme. ${clientName}.\n\nVotre commande de prestige a été enregistrée avec succès pour une livraison sécurisée à ${clientCity}.\n\nNotre service de conciergerie va vous appeler au numéro : ${clientPhone} sous 24h pour validation finale avant expédition.`);
            
            // Clean state & views resets
            shoppingCart = [];
            updateCartUI();
            shippingForm.reset();
            toggleCart();
        });
    }
}

function setupAddToCartListeners() {
    document.querySelectorAll(".add-to-cart-btn-card").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.target.getAttribute("data-id"));
            addToCart(id);
        });
    });
}

function addToCart(id) {
    const product = productsData.find(p => p.id === id);
    const existing = shoppingCart.find(item => item.product.id === id);

    if(existing) {
        existing.quantity++;
    } else {
        shoppingCart.push({ product, quantity: 1 });
    }
    updateCartUI();
    document.getElementById("cart-sidebar").classList.add("open");
    document.getElementById("sidebar-overlay").classList.add("open");
}

function updateCartUI() {
    const countSpan = document.getElementById("cart-count");
    const container = document.getElementById("cart-items-container");
    const totalPriceSpan = document.getElementById("cart-total-price");
    
    const totalItems = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);
    if(countSpan) countSpan.innerText = totalItems;

    if(shoppingCart.length === 0) {
        container.innerHTML = `<p class="empty-cart-msg">Votre panier est vide.</p>`;
        if(totalPriceSpan) totalPriceSpan.innerText = "0 MAD";
        return;
    }

    let totalSpend = 0;
    container.innerHTML = shoppingCart.map(item => {
        totalSpend += item.product.price * item.quantity;
        return `
            <div class="cart-item">
                <img src="${item.product.img}" alt="${item.product.title}">
                <div class="cart-item-details">
                    <h4>${item.product.title}</h4>
                    <p style="font-size:0.85rem; color:var(--luxury-gold);">${(item.product.price * item.quantity).toLocaleString()} MAD</p>
                    <div class="cart-item-qty">
                        <span class="qty-btn minus-qty" data-id="${item.product.id}">-</span>
                        <span style="font-size:0.85rem;">${item.quantity}</span>
                        <span class="qty-btn plus-qty" data-id="${item.product.id}">+</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    if(totalPriceSpan) totalPriceSpan.innerText = `${totalSpend.toLocaleString()} MAD`;
    setupQtyControls();
}

function setupQtyControls() {
    document.querySelectorAll(".plus-qty").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.target.getAttribute("data-id"));
            const item = shoppingCart.find(i => i.product.id === id);
            if(item) item.quantity++;
            updateCartUI();
        });
    });

    document.querySelectorAll(".minus-qty").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.target.getAttribute("data-id"));
            const index = shoppingCart.findIndex(i => i.product.id === id);
            if(index > -1) {
                shoppingCart[index].quantity--;
                if(shoppingCart[index].quantity <= 0) {
                    shoppingCart.splice(index, 1);
                }
            }
            updateCartUI();
        });
    });
}

// ==========================================================================
// QUICK VIEW MODAL PRODUCTION CONTROLS
// ==========================================================================
function setupQuickViewListeners() {
    document.querySelectorAll(".qv-trigger").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(btn.getAttribute("data-id"));
            openQuickView(id);
        });
    });

    const closeBtn = document.getElementById("close-modal-btn");
    const modal = document.getElementById("quickview-modal");
    if(closeBtn && modal) {
        closeBtn.addEventListener("click", () => modal.classList.remove("open"));
        modal.addEventListener("click", (e) => {
            if(e.target === modal) modal.classList.remove("open");
        });
    }
}

function openQuickView(id) {
    const p = productsData.find(prod => prod.id === id);
    const targetGrid = document.getElementById("qv-grid-content");
    const modal = document.getElementById("quickview-modal");
    if(!p || !targetGrid || !modal) return;

    targetGrid.innerHTML = `
        <div class="qv-img">
            <img src="${p.img}" alt="${p.title}">
        </div>
        <div class="qv-details">
            <h2>${p.title}</h2>
            <div class="qv-price">${p.price.toLocaleString()} MAD</div>
            <p class="qv-desc">${p.desc}</p>
            <button class="btn btn-gold full-width" id="qv-add-btn" data-id="${p.id}">Ajouter au Panier</button>
        </div>
    `;

    modal.classList.add("open");
    
    document.getElementById("qv-add-btn").addEventListener("click", (e) => {
        addToCart(p.id);
        modal.classList.remove("open");
    });
}

// ==========================================================================
// DYNAMIC LIVE CATEGORY FILTERING
// ==========================================================================
function setupFilteringSystem() {
    const tabs = document.querySelectorAll(".filter-tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            tabs.forEach(t => t.classList.remove("active"));
            e.target.classList.add("active");
            
            const target = e.target.getAttribute("data-target");
            if(target === "all") {
                generateProductsGrid(productsData);
            } else {
                const filtered = productsData.filter(p => p.category === target);
                generateProductsGrid(filtered);
            }
        });
    });

    document.querySelectorAll(".nav-link[data-filter]").forEach(link => {
        link.addEventListener("click", (e) => {
            const filterCat = e.target.getAttribute("data-filter");
            const correspondingTab = document.querySelector(`.filter-tab[data-target="${filterCat}"]`);
            if(correspondingTab) correspondingTab.click();
        });
    });
}

// ==========================================================================
// SEARCH INTERACTIVE INPUT OVERLAY SYSTEM
// ==========================================================================
function setupSearchSystem() {
    const searchBtn = document.getElementById("search-btn");
    const searchInput = document.getElementById("search-input");
    
    if(searchBtn && searchInput) {
        searchBtn.addEventListener("click", () => {
            searchInput.classList.toggle("active");
            if(searchInput.classList.contains("active")) {
                searchInput.focus();
            }
        });

        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            const matching = productsData.filter(p => p.title.toLowerCase().includes(query));
            generateProductsGrid(matching);
        });
    }
}

// ==========================================================================
// SCROLL EFFECTS & LUXURY REVEAL ANIMATIONS
// ==========================================================================
function setupScrollEffects() {
    const header = document.querySelector(".luxury-header");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add("active");
            }
        });
    });
}

// ==========================================================================
// MOBILE RESPONSIVE HAMBURGER VIEW NAVIGATION
// ==========================================================================
function setupMobileMenu() {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const navMenu = document.getElementById("nav-menu");
    
    if(menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            menuBtn.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                menuBtn.classList.remove("active");
            });
        });
    }
}

// ==========================================================================
// LUXURY CONTACT FORM CONFIRMATION VALIDATOR
// ==========================================================================
function setupContactForm() {
    const form = document.getElementById("luxury-contact-form");
    if(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("nom").value;
            alert(`Merci pour votre confiance, M./Mme. ${name}. Votre demande de conciergerie privée a été transmise avec succès à notre bureau de Casablanca.`);
            form.reset();
        });
    }
}