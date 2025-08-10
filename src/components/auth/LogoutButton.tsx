import { logout } from '@/app/login/actions'
import { Button } from '@/components/ui/button'

export default function LogoutButton() {
  return (
    <form action={logout}>
      <Button>Logout</Button>
    </form>
  )
}
