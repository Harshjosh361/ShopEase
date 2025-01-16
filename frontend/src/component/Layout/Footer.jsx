function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-blue-200 to-purple-200 flex justify-center items-center min-h-28 py-6 text-gray-800 text-xl flex-col shadow-inner">
      <div className="flex flex-col items-center gap-2">
        <h3 className="font-medium">
          All rights reserved &copy; {currentYear}
        </h3>
        <h2 className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Shop Ease
        </h2>
      </div>
    </footer>
  )
}

export default Footer

