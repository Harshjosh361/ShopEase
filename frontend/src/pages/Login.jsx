import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import Layout from "../component/Layout/Layout"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/auth"
import { API_URL } from "../config"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }
    setError("")
    setIsLoading(true)

    try {
      const user = { email, password }
      const res = await axios.post(`${API_URL}api/v1/auth/login`, user)
      if (res.data.success) {
        toast.success(res.data.message)
        setAuth({ ...auth, user: res.data.user, token: res.data.token })
        localStorage.setItem("auth", JSON.stringify(res.data))
        navigate(location.state || "/")
      } else {
        setError(res.data.message)
        toast.error(res.data.message)
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 animate-pulse"></div>
          <Card className="relative w-full max-w-md bg-white/90">
            {/* Moving lights */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <div className="absolute w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-moving-light-1"></div>
              <div className="absolute w-20 h-20 bg-purple-400/20 rounded-full blur-xl animate-moving-light-2"></div>
            </div>

            <CardHeader className="relative">
              <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                Welcome Back
              </CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 relative">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="transition-all duration-200 hover:border-blue-400 focus:ring-2 focus:ring-blue-400 bg-white/80"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pr-10 transition-all duration-200 hover:border-blue-400 focus:ring-2 focus:ring-blue-400 bg-white/80"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </CardContent>
              <CardFooter className="relative">
                <Button
                  type="submit"
                  className="w-full transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center"
                    >
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                      Logging in...
                    </motion.div>
                  ) : (
                    "Log in"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </Layout>
  )
}

