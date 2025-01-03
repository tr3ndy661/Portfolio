import HeroSection from "./HeroSection"
import NavBar from "./NavBar"
import TechnologiesSection from "./TechnologiesSection"
import ProjectsSection from "./ProjectsSection"
import Footer from "./Footer"

const LandingPage = () => {
  return (
    <div className="landing-page-container">

        <NavBar />
        <HeroSection />
        <TechnologiesSection />
        <ProjectsSection />
        <Footer />
    </div>
  )
}

export default LandingPage
