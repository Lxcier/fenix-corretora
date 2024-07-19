import React, { useState } from 'react'
import { FaMapMarkerAlt, FaBed, FaBath, FaCar, FaRuler } from 'react-icons/fa'
import AssetCard from './AssetCard'

interface AssetDetailsProps {
    title?: string
    description?: string
    city?: string
    neighborhood?: string
    state?: string
    zipCode?: string
    area?: number
    bedrooms?: number
    bathrooms?: number
    parkingSpaces?: number
    similarAssets: any[] // Tipo a ser definido conforme a estrutura dos ativos
}

const AssetDetails: React.FC<AssetDetailsProps> = ({
    title,
    description,
    city,
    neighborhood,
    state,
    zipCode,
    area,
    bedrooms,
    bathrooms,
    parkingSpaces,
    similarAssets,
}) => {
    const [showFullDescription, setShowFullDescription] = useState(false)
    const descriptionLimit = 200

    return (
        <div className="mt-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>

            <p className="text-gray-600 mb-2">
                {showFullDescription
                    ? description
                    : `${description.slice(0, descriptionLimit)}...`}
            </p>
            {description.length > descriptionLimit && (
                <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                >
                    {showFullDescription
                        ? 'Ver menos'
                        : 'Ver descrição completa'}
                </button>
            )}

            <hr className="my-6" />

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Localização
            </h2>
            <div className="flex items-start">
                <FaMapMarkerAlt className="text-red-500 mr-4 mt-1" />
                <div>
                    <p className="font-semibold">
                        {city}, {neighborhood}
                    </p>
                    <p className="text-gray-600">
                        {state} - CEP: {zipCode}
                    </p>
                </div>
            </div>

            <hr className="my-6" />

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Detalhes
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center">
                    <FaRuler className="text-red-500 mr-2" />
                    <span>{area} m²</span>
                </div>
                <div className="flex items-center">
                    <FaBed className="text-red-500 mr-2" />
                    <span>{bedrooms} quartos</span>
                </div>
                <div className="flex items-center">
                    <FaBath className="text-red-500 mr-2" />
                    <span>{bathrooms} banheiros</span>
                </div>
                <div className="flex items-center">
                    <FaCar className="text-red-500 mr-2" />
                    <span>{parkingSpaces} vagas</span>
                </div>
            </div>

            <hr className="my-6" />

            <div className="bg-gray-100 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Financiamento
                </h2>
                <p className="text-gray-600 mb-4">
                    Realize o sonho da casa própria! Simule agora seu
                    financiamento e descubra as melhores condições para adquirir
                    este imóvel.
                </p>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Simular Financiamento
                </button>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Imóveis Similares
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarAssets.map((asset, index) => (
                    <AssetCard key={index} asset={asset} />
                ))}
            </div>
        </div>
    )
}

export default AssetDetails
