import React, { useState, useEffect } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

// Importe suas imagens aqui
import heroImage1 from '../assets/hero-images/hero-image-1.jpg'
import heroImage2 from '../assets/hero-images/hero-image-2.jpg'
import heroImage3 from '../assets/hero-images/hero-image-3.jpg'
import heroImage4 from '../assets/hero-images/hero-image-4.jpg'

const images = [heroImage1, heroImage2, heroImage3, heroImage4]

const Hero: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length)
        }, 5000) // Muda a imagem a cada 5 segundos

        return () => clearInterval(interval)
    }, [])

    return (
        <div id="hero" className="relative h-screen">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                        index === currentImageIndex
                            ? 'opacity-100'
                            : 'opacity-0'
                    }`}
                    style={{ backgroundImage: `url(${image})` }}
                />
            ))}
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="absolute inset-0 flex flex-col justify-center md:items-start items-center text-white px-4">
                <h1 className="font-extrabold text-center md:text-start mb-2">
                    <span className="text-red-500 text-4xl md:text-[46px]">
                        CORRETORA FÊNIX:{' '}
                    </span>
                    <span className="text-orange-400 text-2xl md:text-[46px]">
                        ADMINISTRAÇÃO MILIONÁRIA
                    </span>
                </h1>
                <h2 className="text-xl md:text-3xl font-bold text-center md:text-start mb-14">
                    AQUI, SEUS <span className="text-orange-400">SONHOS</span>{' '}
                    VALEM MILHÕES!
                </h2>
                <p className="text-base md:text-xl text-center md:text-start mb-6 font-bold">
                    CONVERSE COM NOSSOS ESPECIALISTAS E{' '}
                    <span className="text-orange-400">
                        REALIZE SEUS OBJETIVOS.
                    </span>
                </p>
                <div className="flex space-x-4">
                    <a
                        href="https://wa.me/5511999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded flex items-center"
                    >
                        <FaWhatsapp className="text-2xl mr-2" />
                        (11) 99999-9999
                    </a>
                    <a
                        href="mailto:contato@corretorafenix.com"
                        className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                    >
                        E-mail
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Hero
