import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface AssetSidebarProps {
    price: number
    rentPrice?: number
    condoFee?: number
    iptu?: number
    isHighlight?: boolean
    isNew?: boolean
    forSale?: boolean
    forRent?: boolean
}

const AssetSidebar: React.FC<AssetSidebarProps> = ({
    price,
    rentPrice,
    condoFee,
    iptu,
    isHighlight,
    isNew,
    forSale,
    forRent,
}) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-3xl font-bold text-red-600 mb-4">
                R$ {price.toLocaleString()}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {isHighlight && (
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded text-sm">
                        Destaque
                    </span>
                )}
                {isNew && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                        Novo
                    </span>
                )}
                {forSale && (
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                        Venda
                    </span>
                )}
                {forRent && (
                    <span className="bg-purple-500 text-white px-2 py-1 rounded text-sm">
                        Aluguel
                    </span>
                )}
            </div>

            <div className="border-b border-gray-200 py-3 flex justify-between">
                <span>Aluguel</span>
                <span>R$ {rentPrice?.toLocaleString()} / mês</span>
            </div>

            <div className="border-b border-gray-200 py-3 flex justify-between">
                <span>Condomínio</span>
                <span>R$ {condoFee?.toLocaleString()}</span>
            </div>

            <div className="border-b border-gray-200 py-3 flex justify-between">
                <span>IPTU</span>
                <span>R$ {iptu?.toLocaleString()}</span>
            </div>

            <Link
                to="/financiamento"
                className="text-red-600 hover:text-red-800 py-3 inline-block"
            >
                Simular Financiamento
            </Link>

            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition duration-300 flex items-center justify-center mt-4">
                <FaWhatsapp className="mr-2" />
                Agendar Visita
            </button>
        </div>
    )
}

export default AssetSidebar
