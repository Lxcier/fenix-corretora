import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import { FaQuoteLeft, FaStar } from 'react-icons/fa'

const testimonials = [
    {
        name: 'João Silva',
        text: 'A Corretora Fênix superou todas as minhas expectativas. Encontrei o imóvel dos meus sonhos em tempo recorde!',
        image: '/path-to-joao-image.jpg',
        rating: 5,
    },
    {
        name: 'Maria Santos',
        text: 'Profissionalismo e dedicação definem a equipe da Fênix. Recomendo a todos que buscam uma experiência imobiliária de qualidade.',
        image: '/path-to-maria-image.jpg',
        rating: 5,
    },
    {
        name: 'Carlos Oliveira',
        text: 'O processo de financiamento foi simplificado graças à orientação expert da Corretora Fênix. Estou muito satisfeito!',
        image: '/path-to-carlos-image.jpg',
        rating: 4,
    },
]

const TestimonialsSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <section className="py-20 bg-gradient-to-r from-red-500 to-red-700 w-full overflow-visible">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-semibold text-center text-white mb-16 animate-fade-in-down">
                    Experiências Transformadoras
                </h2>
                <Swiper
                    modules={[Pagination, Autoplay, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={1}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    pagination={{
                        clickable: true,
                        el: '.swiper-pagination',
                    }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    className="mySwiper pt-6 pb-12 rounded-2xl"
                    onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className={`bg-white p-8 rounded-2xl shadow-2xl transform transition-all duration-500 relative ${
                                    index === activeIndex
                                        ? 'scale-100 z-10'
                                        : 'scale-90'
                                }`}
                            >
                                <div className="relative z-10">
                                    <div className="flex justify-center mb-6">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-24 h-24 rounded-full border-4 border-red-500 animate-pulse"
                                        />
                                    </div>
                                    <FaQuoteLeft className="text-4xl text-red-500 mb-4" />
                                    <p className="text-gray-700 mb-6 italic">
                                        {testimonial.text}
                                    </p>
                                    <p className="font-bold text-red-500 text-lg">
                                        {testimonial.name}
                                    </p>
                                    <div className="flex justify-center mt-4">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`text-2xl ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="swiper-pagination"></div>
                </Swiper>
            </div>
        </section>
    )
}

export default TestimonialsSection
