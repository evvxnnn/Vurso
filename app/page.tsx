import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import Services from '@/components/Services'
import Demo from '@/components/Demo'
import HowItWorks from '@/components/HowItWorks'
import Support from '@/components/Support'
import CaseStudy from '@/components/CaseStudy'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <Demo />
      <HowItWorks />
      <Support />
      <CaseStudy />
      <Contact />
      <Footer />
      <ChatWidget />
    </main>
  )
}
