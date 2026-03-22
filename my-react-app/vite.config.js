import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change '/Website/' to match your GitHub repo name
// If deploying to https://lancaster-rocketry-society.github.io/Website/
// the base should be '/Website/'
// If deploying to https://lancaster-rocketry-society.github.io/ (org site)
// change base to '/'
export default defineConfig({
  plugins: [react()],
  base: '/Website/',
})