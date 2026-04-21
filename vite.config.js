import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [ tailwindcss() ],
  build: {
    rollupOptions: {
      input: {
        main:     'index.html',
        products: 'pages/products.html',
        cart:     'pages/cart.html',
        payment:  'pages/payments.html',
        login:    'pages/login.html',
        signup:   'pages/signup.html',
        about:    'pages/about.html',
        contact:  'pages/contact.html',
        support:  'pages/support.html',
        wishlist: 'pages/wishlist.html',
      },
    },
  },
})
