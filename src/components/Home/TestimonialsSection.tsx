import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { FaQuoteLeft } from 'react-icons/fa'

const testimonials = [
    {
        name: 'João Silva',
        avatar: '/avatars/avatar1.png',
        text: 'A Corretora Fênix superou todas as minhas expectativas. Encontrei o imóvel dos meus sonhos em tempo recorde!',
    },
    {
        name: 'Maria Santos',
        avatar: '/avatars/avatar2.png',
        text: 'Profissionalismo e dedicação definem a equipe da Fênix. Recomendo a todos que buscam uma experiência imobiliária de qualidade.',
    },
    {
        name: 'Carlos Oliveira',
        avatar: '/avatars/avatar3.png',
        text: 'O processo de financiamento foi simplificado graças à orientação expert da Corretora Fênix. Estou muito satisfeito!',
    },
    {
        name: 'Carlos Oliveira',
        avatar: '/avatars/avatar3.png',
        text: 'O processo de financiamento foi simplificado graças à orientação expert da Corretora Fênix. Estou muito satisfeito!',
    },
    {
        name: 'Carlos Oliveira',
        avatar: '/avatars/avatar3.png',
        text: 'O processo de financiamento foi simplificado graças à orientação expert da Corretora Fênix. Estou muito satisfeito!',
    },
]

const TestimonialsSection: React.FC = () => {
    return (
        <section className="py-20 bg-gradient-to-t from-red-500 to-red-700">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-white mb-16">
                    O que nossos clientes dizem
                </h2>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="pb-12"
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                                <FaQuoteLeft className="text-3xl text-red-400 mb-4" />
                                <p className="text-gray-700 mb-6 italic">
                                    "{testimonial.text}"
                                </p>
                                <div className="flex items-center">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full mr-4 border-2 border-red-500"
                                    />
                                    <p className="font-bold text-red-500">
                                        {testimonial.name}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default TestimonialsSection
