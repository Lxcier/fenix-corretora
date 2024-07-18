import React from 'react'

import OurHistorySection from '../AboutUs/OurHistorySection'
import OurMissionSection from '../AboutUs/OurMissionSection'
import OurValuesSection from '../AboutUs/OurValuesSection'
import TestimonialsSection from '../AboutUs/TestimonialsSection'
import WhyChooseUs from '../AboutUs/WhyChooseUs'
import ServicesSection from './ServicesSection'

const AboutSection: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow bg-white py-8">
                <div className="container mx-auto px-4">
                    <OurHistorySection />
                    <OurMissionSection />
                    <OurValuesSection />
                </div>
                <TestimonialsSection />
                <ServicesSection />
                <WhyChooseUs />
            </main>
        </div>
    )
}

export default AboutSection
