// =============================================
//   TOYVERSE — Shared Data & Utility Module
// =============================================

export const allProducts = [
  { id: 1,  name: "Crystal Magnetic Tiles",        category: "Building Blocks", price: 24.99, originalPrice: 34.99, rating: 4.8, reviews: 342,  emoji: "🧩" },
  { id: 2,  name: "Rainbow Blocks Deluxe 200pcs",  category: "Building Blocks", price: 19.99, originalPrice: 27.99, rating: 4.6, reviews: 215,  emoji: "🧩" },
  { id: 3,  name: "STEM Magnetic Playground",      category: "Building Blocks", price: 39.99, originalPrice: 54.99, rating: 4.9, reviews: 567,  emoji: "🧲" },
  { id: 4,  name: "Space Explorer Figure XL",      category: "Action Figures",  price: 18.99, originalPrice: 26.99, rating: 4.6, reviews: 189,  emoji: "🚀" },
  { id: 5,  name: "Superhero Collector Series",    category: "Action Figures",  price: 29.99, originalPrice: 45.99, rating: 4.7, reviews: 312,  emoji: "🦸" },
  { id: 6,  name: "Dino Adventure Pack 6pcs",      category: "Action Figures",  price: 22.99, originalPrice: 32.99, rating: 4.5, reviews: 234,  emoji: "🦕" },
  { id: 7,  name: "Strategy Board Game Deluxe",    category: "Board Games",     price: 49.99, originalPrice: 65.99, rating: 4.9, reviews: 567,  emoji: "♟️" },
  { id: 8,  name: "Family Game Night Bundle",      category: "Board Games",     price: 39.99, originalPrice: 59.99, rating: 4.8, reviews: 445,  emoji: "🎲" },
  { id: 9,  name: "Word Master Challenge",         category: "Board Games",     price: 24.99, originalPrice: 34.99, rating: 4.4, reviews: 156,  emoji: "🔠" },
  { id: 10, name: "Jumbo Plush Dinosaur 60cm",     category: "Plushies",        price: 34.99, originalPrice: 49.99, rating: 4.8, reviews: 623,  emoji: "🦕" },
  { id: 11, name: "Pastel Bear Plushie Set",       category: "Plushies",        price: 19.99, originalPrice: 28.99, rating: 4.7, reviews: 428,  emoji: "🧸" },
  { id: 12, name: "Cute Animal Plushie 8-Pack",    category: "Plushies",        price: 27.99, originalPrice: 39.99, rating: 4.6, reviews: 342,  emoji: "🐼" },
  { id: 13, name: "AI Interactive Robot V2",       category: "Gadgets",         price: 59.99, originalPrice: 79.99, rating: 4.5, reviews: 234,  emoji: "🤖" },
  { id: 14, name: "Coding Robot Starter Kit",      category: "Gadgets",         price: 79.99, originalPrice: 99.99, rating: 4.7, reviews: 312,  emoji: "💻" },
  { id: 15, name: "LED Glow Building Kit",         category: "Gadgets",         price: 29.99, originalPrice: 44.99, rating: 4.6, reviews: 189,  emoji: "💡" },
  { id: 16, name: "Art Studio Supreme Kit",        category: "Arts & Crafts",   price: 32.99, originalPrice: 44.99, rating: 4.8, reviews: 312,  emoji: "🎨" },
  { id: 17, name: "Beginner Painting Bundle",      category: "Arts & Crafts",   price: 24.99, originalPrice: 36.99, rating: 4.5, reviews: 178,  emoji: "🖌️" },
  { id: 18, name: "DIY Jewellery Making Set",      category: "Arts & Crafts",   price: 19.99, originalPrice: 29.99, rating: 4.9, reviews: 423,  emoji: "💎" },
]

export const categories = [
  'All', 'Building Blocks', 'Action Figures',
  'Board Games', 'Plushies', 'Gadgets', 'Arts & Crafts',
]

export const promoCodes = {
  SAVE10:    0.10,
  WELCOME20: 0.20,
  SAVE15:    0.15,
  HOLIDAY25: 0.25,
}

// ── Cart & Wishlist ──
export const getCart     = () => JSON.parse(localStorage.getItem('tv_cart'))     || []
export const getWishlist = () => JSON.parse(localStorage.getItem('tv_wishlist')) || []

export function saveCart(cart) {
  localStorage.setItem('tv_cart', JSON.stringify(cart))
  dispatchEvent(new Event('tv:cart-updated'))
}

export function saveWishlist(wishlist) {
  localStorage.setItem('tv_wishlist', JSON.stringify(wishlist))
  dispatchEvent(new Event('tv:wishlist-updated'))
}

export function addToCart(product) {
  const cart = getCart()
  const idx  = cart.findIndex(i => i.id === product.id)
  if (idx > -1) cart[idx].quantity += 1
  else          cart.push({ ...product, quantity: 1 })
  saveCart(cart)
}

export function toggleWishlist(productId) {
  const wishlist = getWishlist()
  const idx      = wishlist.indexOf(productId)
  if (idx > -1) wishlist.splice(idx, 1)
  else          wishlist.push(productId)
  saveWishlist(wishlist)
  return wishlist.includes(productId)
}

export function calcTotals(cart, discountRate) {
  const rate          = discountRate || 0
  const subtotal      = cart.reduce((s, i) => s + i.price * i.quantity, 0)
  const discountAmt   = subtotal * rate
  const afterDiscount = subtotal - discountAmt
  const tax           = afterDiscount * 0.10
  const shipping      = subtotal >= 50 ? 0 : 9.99
  const total         = afterDiscount + tax + shipping
  return { subtotal, discountAmt, afterDiscount, tax, shipping, total }
}

export function discountPct(product) {
  if (product.originalPrice <= product.price) return 0
  return Math.round((1 - product.price / product.originalPrice) * 100)
}

export function starsHTML(rating) {
  const full  = Math.floor(rating)
  const empty = 5 - full
  return '★'.repeat(full) + '<span style="color:#374151">' + '★'.repeat(empty) + '</span>'
}

// =============================================
//  THEME  — dark / light toggle
// =============================================
const THEME_KEY = 'tv_theme'

export function getTheme() {
  return localStorage.getItem(THEME_KEY) || 'dark'
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(THEME_KEY, theme)
}

export function toggleTheme() {
  const next = getTheme() === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  // Update all toggle buttons
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    updateThemeBtn(btn, next)
  })
  return next
}

function updateThemeBtn(btn, theme) {
  if (!btn) return
  const isDark = theme === 'dark'
  btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode')
  btn.innerHTML = isDark
    // Moon icon (currently dark → click to go light)
    ? '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>'
    // Sun icon (currently light → click to go dark)
    : '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
}

// =============================================
//  NAVBAR  — DOM API, no template literals
// =============================================
export function mountNavbar(activePage) {
  const root = document.getElementById('app-navbar')
  if (!root) return

  // Apply saved theme immediately
  applyTheme(getTheme())

  const cartCount     = getCart().reduce((s, i) => s + i.quantity, 0)
  const wishlistCount = getWishlist().length

  const pages = [
    { href: '/index.html',          label: 'Home'    },
    { href: '/pages/products.html', label: 'Shop'    },
    { href: '/pages/about.html',    label: 'About'   },
    { href: '/pages/contact.html',  label: 'Contact' },
    { href: '/pages/support.html',  label: 'Support' },
  ]

  // ── nav ──
  const nav = document.createElement('nav')
  nav.className = 'navbar'
  nav.setAttribute('aria-label', 'Main navigation')

  const inner = document.createElement('div')
  inner.className = 'navbar-inner'
  nav.appendChild(inner)

  // ── logo ──
  const logo = document.createElement('a')
  logo.href      = '/index.html'
  logo.className = 'nav-logo'
  logo.setAttribute('aria-label', 'ToyVerse Home')
  logo.innerHTML = (
    '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>' +
    '</svg>ToyVerse'
  )
  inner.appendChild(logo)

  // ── desktop nav links ──
  const ul = document.createElement('ul')
  ul.className = 'nav-links'
  ul.setAttribute('role', 'list')
  pages.forEach(p => {
    const li = document.createElement('li')
    const a  = document.createElement('a')
    a.href        = p.href
    a.textContent = p.label
    if (activePage === p.label) { a.classList.add('active'); a.setAttribute('aria-current', 'page') }
    li.appendChild(a)
    ul.appendChild(li)
  })
  inner.appendChild(ul)

  // ── desktop search ──
  // NOTE: type="text" not type="search" — prevents browser from adding its own × button
  const searchWrap = document.createElement('div')
  searchWrap.className = 'nav-search'
  searchWrap.innerHTML = (
    '<input id="nav-search-input" type="text" placeholder="Search toys, gifts\u2026" autocomplete="off" aria-label="Search products" />' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="M21 21l-6-6"/></svg>'
  )
  inner.appendChild(searchWrap)

  // ── right actions ──
  const actions = document.createElement('div')
  actions.className = 'nav-actions'

  // Theme toggle button
  const themeBtn = document.createElement('button')
  themeBtn.className = 'icon-btn theme-toggle-btn'
  themeBtn.type      = 'button'
  updateThemeBtn(themeBtn, getTheme())
  themeBtn.addEventListener('click', toggleTheme)
  actions.appendChild(themeBtn)

  // Wishlist
  const wishBtn = document.createElement('a')
  wishBtn.href      = '/pages/wishlist.html'
  wishBtn.className = 'icon-btn'
  wishBtn.setAttribute('aria-label', 'Wishlist')
  wishBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>'
  const wishBadge = document.createElement('span')
  wishBadge.id = 'nav-wishlist-count'
  wishBadge.className = 'badge badge-pulse'
  wishBadge.style.background = '#ec4899'
  wishBadge.textContent = wishlistCount
  wishBtn.appendChild(wishBadge)
  actions.appendChild(wishBtn)

  // Cart
  const cartBtn = document.createElement('a')
  cartBtn.href      = '/pages/cart.html'
  cartBtn.className = 'icon-btn'
  cartBtn.setAttribute('aria-label', 'Shopping cart')
  cartBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>'
  const cartBadge = document.createElement('span')
  cartBadge.id = 'nav-cart-count'
  cartBadge.className = 'badge badge-pulse'
  cartBadge.style.background = '#a855f7'
  cartBadge.textContent = cartCount
  cartBtn.appendChild(cartBadge)
  actions.appendChild(cartBtn)

  // Auth slot
  const authSlot = document.createElement('div')
  authSlot.id = 'nav-auth-slot'
  actions.appendChild(authSlot)

  // ── Hamburger (mobile only) ──
  const hamburger = document.createElement('button')
  hamburger.id        = 'nav-hamburger'
  hamburger.className = 'hamburger-btn'
  hamburger.type      = 'button'
  hamburger.setAttribute('aria-label', 'Open menu')
  hamburger.setAttribute('aria-expanded', 'false')
  hamburger.setAttribute('aria-controls', 'mobile-menu')
  hamburger.innerHTML = (
    '<span class="ham-line"></span>' +
    '<span class="ham-line"></span>' +
    '<span class="ham-line"></span>'
  )
  actions.appendChild(hamburger)

  inner.appendChild(actions)
  root.appendChild(nav)

  // ── Bind desktop search (works on EVERY page) ──
  const searchInput = document.getElementById('nav-search-input')
  if (searchInput) {
    const doSearch = () => {
      const q = searchInput.value.trim()
      if (q) window.location.href = '/pages/products.html?search=' + encodeURIComponent(q)
    }
    searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch() })
    // Make the search icon clickable
    const searchIcon = searchWrap.querySelector('svg')
    if (searchIcon) {
      searchIcon.style.cursor = 'pointer'
      searchIcon.addEventListener('click', doSearch)
    }
  }

  // ── Mobile menu drawer ──
  const mobileMenu = document.createElement('div')
  mobileMenu.id        = 'mobile-menu'
  mobileMenu.className = 'mobile-menu'
  mobileMenu.setAttribute('aria-hidden', 'true')

  const mobileHeader = document.createElement('div')
  mobileHeader.className = 'mobile-menu-header'

  const mobileLogo = document.createElement('span')
  mobileLogo.className     = 'heading-gradient'
  mobileLogo.textContent   = 'ToyVerse'
  mobileLogo.style.cssText = 'font-family:Space Mono,monospace;font-size:1.2rem;font-weight:700'

  const mobileHeaderRight = document.createElement('div')
  mobileHeaderRight.style.cssText = 'display:flex;align-items:center;gap:0.5rem'

  // Mobile theme toggle
  const mobileThemeBtn = document.createElement('button')
  mobileThemeBtn.className = 'icon-btn theme-toggle-btn'
  mobileThemeBtn.type      = 'button'
  updateThemeBtn(mobileThemeBtn, getTheme())
  mobileThemeBtn.addEventListener('click', toggleTheme)
  mobileHeaderRight.appendChild(mobileThemeBtn)

  const closeBtn = document.createElement('button')
  closeBtn.className = 'mobile-menu-close'
  closeBtn.setAttribute('aria-label', 'Close menu')
  closeBtn.innerHTML = '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>'
  mobileHeaderRight.appendChild(closeBtn)

  mobileHeader.appendChild(mobileLogo)
  mobileHeader.appendChild(mobileHeaderRight)
  mobileMenu.appendChild(mobileHeader)

  // Mobile search — type="text" to prevent double ×
  const mobileSearch = document.createElement('div')
  mobileSearch.className = 'mobile-search-wrap'
  const mobileSearchInput = document.createElement('input')
  mobileSearchInput.id          = 'mobile-search-input'
  mobileSearchInput.type        = 'text'   // ← NOT "search"
  mobileSearchInput.className   = 'input-base'
  mobileSearchInput.placeholder = 'Search toys, gifts\u2026'
  mobileSearchInput.setAttribute('aria-label', 'Search products')
  mobileSearch.appendChild(mobileSearchInput)
  mobileMenu.appendChild(mobileSearch)

  // Mobile nav links
  const mobileNav = document.createElement('nav')
  mobileNav.setAttribute('aria-label', 'Mobile navigation')
  const mobileUl = document.createElement('ul')
  mobileUl.className = 'mobile-nav-links'
  pages.forEach(p => {
    const li = document.createElement('li')
    const a  = document.createElement('a')
    a.href        = p.href
    a.textContent = p.label
    a.className   = 'mobile-nav-link'
    if (activePage === p.label) { a.classList.add('active'); a.setAttribute('aria-current', 'page') }
    li.appendChild(a)
    mobileUl.appendChild(li)
  })
  mobileNav.appendChild(mobileUl)
  mobileMenu.appendChild(mobileNav)

  // Mobile auth
  const rawSession = localStorage.getItem('tv_session') || sessionStorage.getItem('tv_session')
  const session    = rawSession ? JSON.parse(rawSession) : null
  const mobileAuth = document.createElement('div')
  mobileAuth.className = 'mobile-auth'

  if (session && session.loggedIn) {
    const greeting = document.createElement('p')
    greeting.className   = 'mobile-greeting'
    greeting.textContent = 'Hi, ' + session.name.split(' ')[0] + ' 👋'
    mobileAuth.appendChild(greeting)
    const mobileLogout = document.createElement('button')
    mobileLogout.className     = 'btn-outline'
    mobileLogout.textContent   = 'Sign Out'
    mobileLogout.style.cssText = 'width:100%;padding:0.7rem;font-size:0.9rem'
    mobileLogout.addEventListener('click', () => {
      localStorage.removeItem('tv_session')
      sessionStorage.removeItem('tv_session')
      window.location.reload()
    })
    mobileAuth.appendChild(mobileLogout)
  } else {
    const mobileLogin = document.createElement('a')
    mobileLogin.href          = '/pages/login.html'
    mobileLogin.className     = 'btn-primary'
    mobileLogin.textContent   = 'Login'
    mobileLogin.style.cssText = 'width:100%;padding:0.75rem;font-size:0.9rem;text-align:center;display:block'
    const mobileSignup = document.createElement('a')
    mobileSignup.href          = '/pages/signup.html'
    mobileSignup.className     = 'btn-outline'
    mobileSignup.textContent   = 'Create Account'
    mobileSignup.style.cssText = 'width:100%;padding:0.75rem;font-size:0.9rem;text-align:center;display:block;margin-top:0.6rem'
    mobileAuth.appendChild(mobileLogin)
    mobileAuth.appendChild(mobileSignup)
  }
  mobileMenu.appendChild(mobileAuth)

  // Overlay
  const overlay = document.createElement('div')
  overlay.id        = 'mobile-overlay'
  overlay.className = 'mobile-overlay'

  document.body.appendChild(overlay)
  document.body.appendChild(mobileMenu)

  // Open / Close
  function openMenu() {
    mobileMenu.classList.add('open')
    overlay.classList.add('open')
    hamburger.setAttribute('aria-expanded', 'true')
    mobileMenu.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
    hamburger.classList.add('is-open')
  }
  function closeMenu() {
    mobileMenu.classList.remove('open')
    overlay.classList.remove('open')
    hamburger.setAttribute('aria-expanded', 'false')
    mobileMenu.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
    hamburger.classList.remove('is-open')
  }

  hamburger.addEventListener('click', () => mobileMenu.classList.contains('open') ? closeMenu() : openMenu())
  closeBtn.addEventListener('click', closeMenu)
  overlay.addEventListener('click', closeMenu)

  mobileSearchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = mobileSearchInput.value.trim()
      if (q) window.location.href = '/pages/products.html?search=' + encodeURIComponent(q)
    }
  })

  // ── Desktop auth slot ──
  if (session && session.loggedIn) {
    const initial   = session.name.charAt(0).toUpperCase()
    const firstName = session.name.split(' ')[0]

    const wrap    = document.createElement('div')
    wrap.style.cssText = 'position:relative'

    const menuBtn = document.createElement('button')
    menuBtn.id = 'user-menu-btn'
    menuBtn.style.cssText = 'display:flex;align-items:center;gap:0.5rem;background:var(--bg-card);border:1px solid var(--border-dim);border-radius:0.5rem;padding:0.4rem 0.85rem;color:var(--text-primary);font-size:0.82rem;font-weight:600;cursor:pointer;font-family:Poppins,sans-serif;transition:border-color 0.2s'
    menuBtn.onmouseover = () => { menuBtn.style.borderColor = 'var(--accent-purple)' }
    menuBtn.onmouseout  = () => { menuBtn.style.borderColor = 'var(--border-dim)' }

    const avatar = document.createElement('span')
    avatar.style.cssText = 'width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#db2777);display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;color:#fff;flex-shrink:0'
    avatar.textContent = initial
    menuBtn.appendChild(avatar)
    menuBtn.appendChild(document.createTextNode(firstName))
    menuBtn.innerHTML += '<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>'

    const dropdown = document.createElement('div')
    dropdown.id = 'user-dropdown'
    dropdown.style.cssText = 'display:none;position:absolute;right:0;top:calc(100% + 8px);background:var(--bg-card);border:1px solid var(--border-dim);border-radius:0.75rem;padding:0.5rem;min-width:170px;z-index:200;box-shadow:0 16px 48px rgba(0,0,0,0.3)'

    const ddHeader = document.createElement('div')
    ddHeader.style.cssText = 'padding:0.5rem 0.75rem 0.65rem;border-bottom:1px solid var(--border-dim);margin-bottom:0.4rem'
    const ddName  = document.createElement('p')
    ddName.style.cssText = 'font-size:0.78rem;font-weight:700;color:var(--text-primary)'
    ddName.textContent = session.name
    const ddEmail = document.createElement('p')
    ddEmail.style.cssText = 'font-size:0.7rem;color:var(--text-muted)'
    ddEmail.textContent = session.email
    ddHeader.appendChild(ddName)
    ddHeader.appendChild(ddEmail)
    dropdown.appendChild(ddHeader)

    const profileLink = document.createElement('a')
    profileLink.href          = '#'
    profileLink.textContent   = '👤 My Profile'
    profileLink.style.cssText = 'display:flex;align-items:center;gap:0.5rem;padding:0.5rem 0.75rem;font-size:0.82rem;color:var(--text-secondary);text-decoration:none;border-radius:0.4rem;transition:background 0.2s'
    profileLink.onmouseover = () => { profileLink.style.background = 'var(--bg-hover)' }
    profileLink.onmouseout  = () => { profileLink.style.background = 'none' }
    dropdown.appendChild(profileLink)

    const logoutLink = document.createElement('a')
    logoutLink.href          = '#'
    logoutLink.textContent   = '🚪 Sign Out'
    logoutLink.style.cssText = 'display:flex;align-items:center;gap:0.5rem;padding:0.5rem 0.75rem;font-size:0.82rem;color:#f87171;text-decoration:none;border-radius:0.4rem;transition:background 0.2s'
    logoutLink.onmouseover = () => { logoutLink.style.background = 'rgba(248,113,113,0.08)' }
    logoutLink.onmouseout  = () => { logoutLink.style.background = 'none' }
    logoutLink.addEventListener('click', e => {
      e.preventDefault()
      localStorage.removeItem('tv_session')
      sessionStorage.removeItem('tv_session')
      window.location.reload()
    })
    dropdown.appendChild(logoutLink)

    wrap.appendChild(menuBtn)
    wrap.appendChild(dropdown)
    authSlot.appendChild(wrap)

    menuBtn.addEventListener('click', e => {
      e.stopPropagation()
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none'
    })
    document.addEventListener('click', () => { dropdown.style.display = 'none' })

  } else {
    const loginLink = document.createElement('a')
    loginLink.href          = '/pages/login.html'
    loginLink.className     = 'btn-primary'
    loginLink.textContent   = 'Login'
    loginLink.style.cssText = 'padding:0.5rem 1.1rem;font-size:0.85rem'
    authSlot.appendChild(loginLink)
  }

  // ── Live badge updates ──
  window.addEventListener('tv:cart-updated', () => {
    const el = document.getElementById('nav-cart-count')
    if (el) el.textContent = getCart().reduce((s, i) => s + i.quantity, 0)
  })
  window.addEventListener('tv:wishlist-updated', () => {
    const el = document.getElementById('nav-wishlist-count')
    if (el) el.textContent = getWishlist().length
  })
}

// =============================================
//  FOOTER
// =============================================
export function mountFooter() {
  const root = document.getElementById('app-footer')
  if (!root) return
  root.innerHTML = (
    '<footer class="footer">' +
      '<div class="footer-inner">' +
        '<div class="footer-grid">' +
          '<div class="footer-col">' +
            '<h4 style="font-size:1.25rem;text-transform:none;letter-spacing:0" class="heading-gradient">ToyVerse</h4>' +
            '<p style="color:var(--text-muted);font-size:0.875rem;margin-top:0.75rem;line-height:1.6">Premium toys &amp; gifts for every age and occasion.</p>' +
          '</div>' +
          '<div class="footer-col"><h4>Shop</h4><ul>' +
            '<li><a href="/index.html">Home</a></li>' +
            '<li><a href="/pages/products.html">All Products</a></li>' +
            '<li><a href="/pages/wishlist.html">Wishlist</a></li>' +
          '</ul></div>' +
          '<div class="footer-col"><h4>Support</h4><ul>' +
            '<li><a href="/pages/support.html">FAQ</a></li>' +
            '<li><a href="/pages/contact.html">Contact Us</a></li>' +
            '<li><a href="/pages/cart.html">Track Order</a></li>' +
          '</ul></div>' +
          '<div class="footer-col"><h4>Company</h4><ul>' +
            '<li><a href="/pages/about.html">About Us</a></li>' +
            '<li><a href="/pages/login.html">My Account</a></li>' +
            '<li><a href="#">Privacy Policy</a></li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '\u00a9 2024 ToyVerse. All rights reserved. Built for portfolio showcase.' +
        '</div>' +
      '</div>' +
    '</footer>'
  )
}

// =============================================
//  PRODUCT CARD
// =============================================
export function productCardHTML(product) {
  const pct    = discountPct(product)
  const inWish = getWishlist().includes(product.id)
  const badge  = pct > 0 ? '<div class="product-badge">-' + pct + '%</div>' : ''
  const orig   = pct > 0 ? '<span class="price-original">$' + product.originalPrice.toFixed(2) + '</span>' : ''
  const wishCls  = inWish ? 'btn-wish active' : 'btn-wish'
  const wishIcon = inWish ? '\u2764\ufe0f' : '\ud83e\udd0d'
  return (
    '<div class="product-card" data-id="' + product.id + '">' +
      '<div class="product-card-img"><span>' + product.emoji + '</span>' + badge + '</div>' +
      '<div class="product-card-body">' +
        '<div class="product-name">'  + product.name     + '</div>' +
        '<div class="product-cat">'   + product.category + '</div>' +
        '<div class="product-stars"><span class="stars">' + starsHTML(product.rating) + '</span><span class="review-count">(' + product.reviews.toLocaleString() + ')</span></div>' +
        '<div class="product-price"><span class="price-current">$' + product.price.toFixed(2) + '</span>' + orig + '</div>' +
        '<div class="product-actions">' +
          '<button class="btn-add"  data-action="add"  data-id="' + product.id + '">Add to Cart</button>' +
          '<button class="' + wishCls + '" data-action="wish" data-id="' + product.id + '">' + wishIcon + '</button>' +
        '</div>' +
      '</div>' +
    '</div>'
  )
}

// =============================================
//  PRODUCT GRID EVENTS
// =============================================
export function bindProductGrid(container) {
  container.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]')
    if (!btn) return
    const id      = Number(btn.dataset.id)
    const product = allProducts.find(p => p.id === id)
    if (!product) return
    if (btn.dataset.action === 'add') {
      addToCart(product)
      btn.textContent = '\u2713 Added'
      btn.classList.add('added')
      setTimeout(() => { btn.textContent = 'Add to Cart'; btn.classList.remove('added') }, 1600)
    }
    if (btn.dataset.action === 'wish') {
      const inWish    = toggleWishlist(id)
      btn.textContent = inWish ? '\u2764\ufe0f' : '\ud83e\udd0d'
      btn.classList.toggle('active', inWish)
    }
  })
}
