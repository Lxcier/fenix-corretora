import React from 'react'

import Header from '../components/Header'
import Hero from '../components/Hero'
import SearchSection from '../components/SearchSection'
import ServicesSectionFirst from '../components/ServicesSectionFirst'
import AboutSection from '../components/AboutSection'

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <Hero />
            <SearchSection />
            <ServicesSectionFirst />
            <AboutSection />
            <footer className="bg-gray-200 mt-8 p-4 text-center">
                <p>
                    &copy; 2023 Corretora Fênix. Todos os direitos reservados.
                </p>
            </footer>
        </div>
    )
}

export default Home
