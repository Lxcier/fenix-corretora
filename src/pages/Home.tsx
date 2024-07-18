import React from 'react'

import Header from '../components/Header'
import Hero from '../components/Home/Hero'
import SearchSection from '../components/Home/SearchSection'
import ServicesSectionFirst from '../components/Home/ServicesSectionFirst'
import AboutSection from '../components/Home/AboutSection'
import ContactForm from '../components/Home/ContactForm'
import Footer from '../components/Footer'

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header isHomePage={true} />
            <Hero />
            <SearchSection />
            <ServicesSectionFirst />
            <AboutSection />
            <ContactForm />
            <Footer />
        </div>
    )
}

export default Home
