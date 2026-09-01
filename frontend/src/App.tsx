import { useEffect } from 'react'
import { About } from './components/About'
import { Attractions } from './components/Attractions'
import { Awards } from './components/Awards'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { InfoBar } from './components/InfoBar'
import { Location } from './components/Location'
import { Participate } from './components/Participate'
import { Partners } from './components/Partners'
import { Regulation } from './components/Regulation'
import { Schedule } from './components/Schedule'

export default function App() {
  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    if (!id) return
    document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
  }, [])

  return (
    <div className="w-full">
      <Header />
      <Hero />
      <InfoBar />
      <About />
      <Attractions />
      <Participate />
      <Awards />
      <Location />
      <Schedule />
      <Regulation />
      <Partners />
      <Footer />
    </div>
  )
}
