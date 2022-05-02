import LandingBackground from "../components/LandingBackground/LandingBackground"
import Home from "../components/Home/Home"

export default function Index() {
  return (
    <div style={{ position: 'relative' }}>
      <Home />
      <LandingBackground />
    </div>
  )
}