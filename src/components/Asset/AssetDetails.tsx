import React, { useState } from 'react'
import { FaMapMarkerAlt, FaBed, FaBath, FaCar, FaRuler } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAssets } from '../../hooks/useAssets'
import AssetCard from './AssetCard'

interface AssetDetailsProps {
    assetId: string
}

const AssetDetails: React.FC<AssetDetailsProps> = ({ assetId }) => {
    const { getAssetById, getSimilarAssets } = useAssets()
    const asset = getAssetById(assetId)
    const similarAssets = asset ? getSimilarAssets(asset) : []

    const [showFullDescription, setShowFullDescription] = useState(false)
    const descriptionLimit = 200

    if (!asset) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl text-gray-600">Asset not found</p>
            </div>
        )
    }

    return (
        <div className="mt-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {asset.title}
            </h1>

            <p className="text-gray-600 mb-2">
                {showFullDescription
                    ? asset.description
                    : `${asset.description.slice(0, descriptionLimit)}...`}
            </p>
            {asset.description.length > descriptionLimit && (
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
                <FaMapMarkerAlt className="text-red-500 text-2xl mr-4 mt-1" />
                <div>
                    <p className="font-semibold">
                        {asset.location.city}, {asset.location.neighborhood}
                    </p>
                    <p className="text-gray-600">
                        {asset.location.state} - CEP: {asset.location.zipCode}
                    </p>
                </div>
            </div>

            <hr className="my-6" />

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Detalhes
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {asset.type === 'imovel' && (
                    <>
                        <div className="flex items-center">
                            <FaRuler className="text-red-500 text-2xl mr-2" />
                            <span>{asset.features.area} m²</span>
                        </div>
                        <div className="flex items-center">
                            <FaBed className="text-red-500 text-2xl mr-2" />
                            <span>{asset.features.bedrooms} quartos</span>
                        </div>
                        <div className="flex items-center">
                            <FaBath className="text-red-500 text-2xl mr-2" />
                            <span>{asset.features.bathrooms} banheiros</span>
                        </div>
                        <div className="flex items-center">
                            <FaCar className="text-red-500 text-2xl mr-2" />
                            <span>{asset.features.parkingSpaces} vagas</span>
                        </div>
                    </>
                )}
                {asset.type === 'veiculo' && (
                    <>
                        <div className="flex items-center">
                            <FaCar className="text-red-500 mr-2" />
                            <span>Ano: {asset.features.year}</span>
                        </div>
                        <div className="flex items-center">
                            <FaRuler className="text-red-500 mr-2" />
                            <span>{asset.features.mileage} km</span>
                        </div>
                    </>
                )}
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
                <Link
                    to="/financiamento"
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    Simular Financiamento
                </Link>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Itens Similares
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarAssets.map(similarAsset => (
                    <AssetCard
                        key={similarAsset.id}
                        asset={{
                            id: similarAsset.id,
                            title: similarAsset.title,
                            price: similarAsset.price,
                            area: similarAsset.features?.area || 0,
                            bedrooms: similarAsset.features?.bedrooms || 0,
                            bathrooms: similarAsset.features?.bathrooms || 0,
                            parkingSpaces:
                                similarAsset.features?.parkingSpaces || 0,
                            imageUrl: similarAsset.imageUrl || '',
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default AssetDetails
