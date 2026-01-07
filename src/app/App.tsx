import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Home from "@/pages/Home"

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
        <Home />
      </main>
      <Footer />
    </div>
  )
}
