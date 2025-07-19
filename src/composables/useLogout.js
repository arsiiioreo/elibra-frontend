import { useRouter } from 'vue-router'

export default function useLogout() {
  const router = useRouter()
  const logout = () => {
    localStorage.clear()
    router.push({ name: 'login' })
  }
  return { logout }
}
