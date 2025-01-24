import { useNavigate } from "react-router-dom"
import { ArrowLeft, Search } from "lucide-react"

export default function PageNotFound() {
  const navigate = useNavigate()

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="px-4 md:px-6 flex flex-col items-center text-center space-y-4">
        {/* Main error section with animation */}
        <div className="space-y-2 animate-[fadeIn_1s_ease-in]">
          <h1 className="text-9xl font-bold text-orange-600 dark:text-orange-500">404</h1>
          <p className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Page not found</p>
          <p className="max-w-[600px] text-gray-600 dark:text-gray-400 md:text-xl/relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might have been moved or deleted.
          </p>
        </div>

        {/* Illustration */}
        <div className="w-full max-w-sm py-8 animate-[fadeIn_1s_ease-in_0.3s]">
          <div className="relative w-full aspect-[2/1]">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-300 dark:from-orange-900/20 dark:to-orange-800/40 rounded-lg blur-3xl" />
            <div className="relative w-full h-full flex items-center justify-center">
              <Search className="h-24 w-24 text-orange-600 dark:text-orange-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-2 min-[400px]:gap-4 animate-[fadeIn_1s_ease-in_0.6s]">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-lg font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors dark:bg-orange-600 dark:hover:bg-orange-700"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-lg font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors dark:bg-gray-800 dark:text-orange-400 dark:hover:bg-gray-700"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

