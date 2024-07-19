import React from 'react'
import { Link } from 'react-router-dom'
import { FaBed, FaBath, FaCar, FaRuler } from 'react-icons/fa'

interface AssetCardProps {
    asset: {
        id: string
        title: string
        price: number
        area: number
        bedrooms: number
        bathrooms: number
        parkingSpaces: number
        imageUrl: string
    }
}

const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
    return (
        <Link to={`/asset/${asset.id}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <img
                    src={asset.imageUrl}
                    alt={asset.title}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {asset.title}
                    </h3>
                    <p className="text-red-600 font-bold mb-2">
                        R$ {asset.price.toLocaleString()}
                    </p>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span className="flex items-center">
                            <FaRuler className="mr-1" /> {asset.area} m²
                        </span>
                        <span className="flex items-center">
                            <FaBed className="mr-1" /> {asset.bedrooms}
                        </span>
                        <span className="flex items-center">
                            <FaBath className="mr-1" /> {asset.bathrooms}
                        </span>
                        <span className="flex items-center">
                            <FaCar className="mr-1" /> {asset.parkingSpaces}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default AssetCard
