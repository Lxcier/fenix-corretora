import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    FaSearch,
    FaFilter,
    FaBed,
    FaBath,
    FaCar,
    FaHeart,
} from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion, AnimatePresence } from 'framer-motion'

interface ListingItem {
    id: number
    title: string
    price: number
    location: string
    type: 'imovel' | 'veiculo'
    image: string
    details: {
        bedrooms?: number
        bathrooms?: number
        area?: number
        year?: number
        mileage?: number
    }
}

const dummyListings: ListingItem[] = [
    {
        id: 1,
        title: 'Casa Moderna',
        price: 500000,
        location: 'Centro, Atibaia',
        type: 'imovel',
        image: '/path-to-image1.jpg',
        details: { bedrooms: 3, bathrooms: 2, area: 150 },
    },
    {
        id: 2,
        title: 'Apartamento Luxuoso',
        price: 350000,
        location: 'Jardim Paulista, Atibaia',
        type: 'imovel',
        image: '/path-to-image2.jpg',
        details: { bedrooms: 2, bathrooms: 1, area: 80 },
    },
    {
        id: 3,
        title: 'SUV Esportivo',
        price: 120000,
        location: 'Atibaia',
        type: 'veiculo',
        image: '/path-to-image3.jpg',
        details: { year: 2021, mileage: 30000 },
    },
]

const ListingCard: React.FC<{ item: ListingItem }> = ({ item }) => {
    const [isFavorite, setIsFavorite] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                />
                <button
                    className="absolute top-2 right-2 text-white p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300"
                    onClick={() => setIsFavorite(!isFavorite)}
                >
                    <FaHeart
                        className={isFavorite ? 'text-red-500' : 'text-white'}
                    />
                </button>
            </div>
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600 mb-2">{item.location}</p>
                <p className="text-lg font-bold text-red-600 mb-2">
                    R$ {item.price.toLocaleString()}
                </p>
                <motion.div
                    className="overflow-hidden"
                    initial={false}
                    animate={{ height: isExpanded ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                        {item.type === 'imovel' && (
                            <>
                                <span>
                                    <FaBed className="inline mr-1" />{' '}
                                    {item.details.bedrooms} quartos
                                </span>
                                <span>
                                    <FaBath className="inline mr-1" />{' '}
                                    {item.details.bathrooms} banheiros
                                </span>
                                <span>{item.details.area} m²</span>
                            </>
                        )}
                        {item.type === 'veiculo' && (
                            <>
                                <span>
                                    <FaCar className="inline mr-1" />{' '}
                                    {item.details.year}
                                </span>
                                <span>{item.details.mileage} km</span>
                            </>
                        )}
                    </div>
                    <p className="text-sm text-gray-600">
                        Mais detalhes sobre{' '}
                        {item.type === 'imovel' ? 'o imóvel' : 'o veículo'}...
                    </p>
                </motion.div>
                <button
                    className="mt-2 text-blue-600 hover:text-blue-800 transition-colors duration-300"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? 'Ver menos' : 'Ver mais'}
                </button>
            </div>
        </motion.div>
    )
}

const ListingPage: React.FC = () => {
    const { type } = useParams<{ type: string }>()
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')
    const [filterType, setFilterType] = useState<
        'imoveis' | 'veiculos' | 'all'
    >((type as 'imoveis' | 'veiculos' | 'all') || 'all')

    useEffect(() => {
        setFilterType((type as 'imoveis' | 'veiculos' | 'all') || 'all')
    }, [type])

    const filteredListings = dummyListings.filter(
        item =>
            (filterType === 'all' || item.type === filterType) &&
            (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.location.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    const pageTitle =
        filterType === 'imoveis'
            ? 'Imóveis'
            : filterType === 'veiculos'
              ? 'Veículos'
              : 'Todos os Itens'

    const handleFilterChange = (newType: 'imoveis' | 'veiculos' | 'all') => {
        setFilterType(newType)
        navigate(`/listing/${newType}`)
    }

    return (
        <>
            <Header isHomePage={false} />
            <main className="container mx-auto px-4 py-8 pt-36">
                <div className="flex flex-col md:flex-row justify-between mb-8">
                    <div className="relative mb-4 md:mb-0 md:w-1/2">
                        <input
                            type="text"
                            placeholder={`Buscar ${pageTitle.toLowerCase()}`}
                            className="w-full p-2 pl-10 border rounded-md"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>

                    <div className="flex items-center">
                        <FaFilter className="mr-2" />
                        <select
                            className="p-2 border rounded-md"
                            value={filterType}
                            onChange={e =>
                                handleFilterChange(
                                    e.target.value as
                                        | 'imoveis'
                                        | 'veiculos'
                                        | 'all'
                                )
                            }
                        >
                            <option value="all">Todos</option>
                            <option value="imoveis">Imóveis</option>
                            <option value="veiculos">Veículos</option>
                        </select>
                    </div>
                </div>

                <AnimatePresence>
                    <motion.div
                        key={filterType}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredListings.map(item => (
                            <ListingCard key={item.id} item={item} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </main>
            <Footer />
        </>
    )
}

export default ListingPage
