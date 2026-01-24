export const ENV = {
  API_ENDPOINT:
    window.__ENV__?.API_ENDPOINT ??
    import.meta.env.VITE_API_ENDPOINT ??
    'http://localhost:8000'
}
