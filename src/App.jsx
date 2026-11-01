import { useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import { useRoute } from './lib/router.js'

export default function App() {
  const route = useRoute()

  // When the homepage loads with a #section hash, scroll to it once mounted.
  useEffect(() => {
    if (route.name !== 'home') return
    const id = window.location.hash.replace('#', '')
    if (!id) return
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
    return () => clearTimeout(t)
  }, [route])

  return (
    <div className="grain relative min-h-screen">
      <Nav mode={route.name} />
      <main>
        {route.name === 'project' ? <ProjectPage id={route.id} /> : <Home />}
      </main>
      <Footer />
    </div>
  )
}
