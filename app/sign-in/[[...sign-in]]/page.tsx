import { getBrand } from "@/lib/brand"
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  const brand = getBrand()
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
      <SignIn />
    </div>
  )
}
