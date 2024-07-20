import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHome, FaCar } from 'react-icons/fa'
import CountUp from 'react-countup'
import { Parallax } from 'react-parallax'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import imgImoveis from '/src/assets/services-images/imoveis.jpg'
import imgVeiculos from '/src/assets/services-images/veiculos.jpg'

import { useAssets } from '../../hooks/useAssets'

const ServicesSectionFirst: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'imoveis' | 'veiculos'>(
        'imoveis'
    )
    const { getAssetsByType } = useAssets()

    const tabContent = {
        imoveis: {
            title: 'Imóveis',
            subtitle: 'Encontre o lar dos seus sonhos',
            description:
                'Aqui você encontra o imóvel ideal para você, seja casa, apartamento, comércio, lote/terreno ou para investimento. Temos opções residenciais e comerciais para todos os gostos e orçamentos.',
            image: imgImoveis,
            link: '/listing?type=imoveis',
            stats: {
                count: getAssetsByType('imovel').length,
                label: 'Imóveis disponíveis',
            },
        },
        veiculos: {
            title: 'Veículos',
            subtitle: 'Dirija o carro dos seus sonhos',
            description:
                'Descubra uma ampla gama de veículos que atendem a todas as suas necessidades. Desde carros compactos econômicos até SUVs luxuosos, temos opções para todos os estilos de vida e orçamentos.',
            image: imgVeiculos,
            link: '/listing?type=veiculos',
            stats: {
                count: getAssetsByType('veiculo').length,
                label: 'Veículos disponíveis',
            },
        },
    } as const

    const popularItems = {
        imoveis: getAssetsByType('imovel').slice(0, 3),
        veiculos: getAssetsByType('veiculo').slice(0, 3),
    }

    const sliderSettings = {
        dots: false,
        infinite: popularItems[activeTab].length > 1,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-center mb-8">
                    <button
                        className={`px-6 py-2 mr-4 flex items-center rounded-lg md:text-lg transition duration-300 ease-in-out ${
                            activeTab === 'imoveis'
                                ? 'bg-red-500  text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                        onClick={() => setActiveTab('imoveis')}
                    >
                        <FaHome className="mr-2" /> Imóveis
                    </button>
                    <button
                        className={`px-6 py-2 flex items-center rounded-lg md:text-lg transition duration-300 ease-in-out ${
                            activeTab === 'veiculos'
                                ? 'bg-red-500  text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                        onClick={() => setActiveTab('veiculos')}
                    >
                        <FaCar className="mr-2" /> Veículos
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Parallax
                            bgImage={tabContent[activeTab].image}
                            strength={200}
                            bgClassName="object-cover object-[22%] md:object-center"
                            className="h-[350px] sm:h-[400px] md:h-[500px] rounded"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r lg:bg-gradient-to-l from-black via-black/70 to-black/10 h-full" />
                            <div className=" h-[350px] sm:h-[400px] md:h-[500px] flex items-center justify-start relative">
                                <div className="container mx-auto px-4">
                                    <div className="flex pl-4 sm:pl-8 md:pl-12 lg:justify-end lg:pl-20">
                                        <div className="w-full md:w-2/3 lg:w-1/2 text-white">
                                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-red-500 mb-1 uppercase">
                                                {tabContent[activeTab].title}
                                            </h2>
                                            <h3 className="text-sm sm:text-base lg:text-xl font-normal text-orange-400 tracking-wide mb-2 sm:mb-4">
                                                {tabContent[activeTab].subtitle}
                                            </h3>
                                            <p className="text-sm sm:text-base text-gray-200 mb-4 sm:mb-6 md:mb-10">
                                                {
                                                    tabContent[activeTab]
                                                        .description
                                                }
                                            </p>
                                            <div className="mb-4 sm:mb-6 md:mb-10">
                                                <CountUp
                                                    end={
                                                        tabContent[activeTab]
                                                            .stats.count
                                                    }
                                                    duration={2.5}
                                                    separator=","
                                                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500"
                                                />
                                                <span className="text-base sm:text-lg md:text-xl ml-2 text-gray-300">
                                                    {
                                                        tabContent[activeTab]
                                                            .stats.label
                                                    }
                                                </span>
                                            </div>
                                            <Link
                                                to={tabContent[activeTab].link}
                                                className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition duration-300 text-sm sm:text-base"
                                            >
                                                Ver{' '}
                                                {tabContent[activeTab].title}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Parallax>

                        <div className="mt-16">
                            <h3 className="text-2xl font-bold mb-6 text-red-600">
                                Opções Populares
                            </h3>
                            <Slider {...sliderSettings} className="mx-[-8px]">
                                {popularItems[activeTab].map(item => {
                                    const assetTitle = item.title
                                        .toLowerCase()
                                        .replace(/\s+/g, '-')
                                    return (
                                        <div
                                            key={item.id}
                                            className="px-2 py-5 overflow-hidden"
                                        >
                                            <Link
                                                to={`/asset/${assetTitle}`}
                                                className="block"
                                            >
                                                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.01] cursor-pointer h-full flex flex-col">
                                                    <div className="relative">
                                                        <img
                                                            src={item.images[0]}
                                                            alt={item.title}
                                                            className="w-full h-48 object-cover"
                                                        />
                                                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm font-bold rounded">
                                                            {item.isNew
                                                                ? 'Novo'
                                                                : 'Destaque'}
                                                        </div>
                                                    </div>
                                                    <div className="p-4 flex-grow flex flex-col justify-between">
                                                        <div>
                                                            <h4 className="font-semibold text-lg mb-2">
                                                                {item.title}
                                                            </h4>
                                                            <p className="text-gray-600 text-sm mb-2">
                                                                {
                                                                    item
                                                                        .location
                                                                        .city
                                                                }
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-red-500 font-bold text-xl">
                                                                R${' '}
                                                                {item.price.toLocaleString()}
                                                            </p>
                                                            <div className="flex justify-between text-sm text-gray-500 mt-2">
                                                                <span>
                                                                    {activeTab ===
                                                                    'imoveis'
                                                                        ? `${item.features.bedrooms} quartos`
                                                                        : `${item.features.year}`}
                                                                </span>
                                                                <span>
                                                                    {activeTab ===
                                                                    'imoveis'
                                                                        ? `${item.features.area} m²`
                                                                        : `${item.features.mileage} km`}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </Slider>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}

export default ServicesSectionFirst
