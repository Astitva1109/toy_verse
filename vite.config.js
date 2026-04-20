import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  // Multi-page app setup
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        products: 'pages/products.html',
        cart: 'pages/cart.html',
        payment: 'pages/payment.html',
      },
    },
  },
})
