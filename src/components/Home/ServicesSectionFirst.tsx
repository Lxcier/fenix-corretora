import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHome, FaCar } from 'react-icons/fa'
import CountUp from 'react-countup'

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
    const { getAssetsByType, allAssets } = useAssets()

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
                        <div className="flex flex-col lg:flex-row items-center">
                            <div className="lg:w-1/2 mb-8 lg:mb-0 overflow-hidden rounded-lg shadow-lg">
                                <img
                                    src={tabContent[activeTab].image}
                                    alt={tabContent[activeTab].title}
                                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <div className="lg:w-1/2 lg:pl-16">
                                <h2 className="text-3xl lg:text-4xl font-extrabold text-red-500 mb-1 uppercase">
                                    {tabContent[activeTab].title}
                                </h2>
                                <h3 className="text-base lg:text-xl font-normal text-orange-500 tracking-wide mb-4">
                                    {tabContent[activeTab].subtitle}
                                </h3>
                                <p className="text-gray-700 mb-10">
                                    {tabContent[activeTab].description}
                                </p>
                                <div className="mb-10">
                                    <CountUp
                                        end={tabContent[activeTab].stats.count}
                                        duration={2.5}
                                        separator=","
                                        className="text-4xl font-bold text-red-500"
                                    />
                                    <span className="text-xl ml-2 text-gray-600">
                                        {tabContent[activeTab].stats.label}
                                    </span>
                                </div>

                                <Link
                                    to={tabContent[activeTab].link}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                                >
                                    Ver {tabContent[activeTab].title}
                                </Link>
                            </div>
                        </div>

                        <div className="mt-16">
                            <h3 className="text-2xl font-bold mb-6 text-red-600">
                                Opções Populares
                            </h3>
                            <Slider
                                dots={false}
                                infinite={true}
                                speed={500}
                                slidesToShow={3}
                                slidesToScroll={1}
                                autoplay={true}
                                autoplaySpeed={2000}
                                responsive={[
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
                                ]}
                                className="mx-[-8px]"
                            >
                                {popularItems[activeTab].map(item => (
                                    <div
                                        key={item.id}
                                        className="px-2 py-5 overflow-hidden"
                                    >
                                        <Link
                                            to={`/asset/${item.id}`}
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
                                                            {item.location.city}
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
                                ))}
                            </Slider>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}

export default ServicesSectionFirst
