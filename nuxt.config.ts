// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  app: {
    head: {
      title: 'M2-MED Dashboard',
    },
  },
  typescript: {
    strict: true,
  },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/supabase'],
  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    config: {},
    viewer: true,
    exposeConfig: {
      level: 2,
    },
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/dashboard',
      include: undefined,
      exclude: ['/policy', '/payment'],
      cookieRedirect: false,
    },
  },
  runtimeConfig: {
    public: {
      notchPay: process.env.NOTCHPAY_PUBLIC_KEY,
    }
  },
})
