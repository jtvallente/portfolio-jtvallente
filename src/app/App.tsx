import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import AppRoutes from "./routes"
import ChatWidget from "@/components/chat/ChatWidget"


export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
        <AppRoutes />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
