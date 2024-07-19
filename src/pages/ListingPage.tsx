import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
    FaSearch,
    FaFilter,
    FaBed,
    FaBath,
    FaCar,
    FaHeart,
    FaDollarSign,
    FaChevronDown,
    FaCalendarAlt,
    FaTachometerAlt,
    FaList,
    FaHome,
} from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import InfiniteScroll from 'react-infinite-scroll-component'

// Interfaces
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

interface AdvancedFilters {
    minPrice: number
    maxPrice: number
    bedrooms: number
    bathrooms: number
    minYear: number
    maxMileage: number
}

// Mock Data
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

// Components
const CustomSelect: React.FC<{
    options: { value: string; label: string }[]
    value: string
    onChange: (value: string) => void
}> = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="relative" ref={selectRef}>
            <button
                className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white w-full text-left flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                {options.find(option => option.value === value)?.label}
                <FaChevronDown
                    className={`ml-2 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg"
                    >
                        {options.map(option => (
                            <li
                                key={option.value}
                                className="p-3 hover:bg-red-100 cursor-pointer transition-colors duration-200 flex items-center"
                                onClick={() => {
                                    onChange(option.value)
                                    setIsOpen(false)
                                }}
                            >
                                {option.icon}
                                <span className="ml-2">{option.label}</span>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}

const ListingCard: React.FC<{ item: ListingItem }> = ({ item }) => {
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        setIsFavorite(favorites.includes(item.id))
    }, [item.id])

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault()
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        if (isFavorite) {
            const newFavorites = favorites.filter(
                (id: number) => id !== item.id
            )
            localStorage.setItem('favorites', JSON.stringify(newFavorites))
        } else {
            favorites.push(item.id)
            localStorage.setItem('favorites', JSON.stringify(favorites))
        }
        setIsFavorite(!isFavorite)
    }

    return (
        <Link to={`/listing/${item.type}/${item.id}`} className="block">
            <motion.div
                className="bg-white rounded-lg shadow-md overflow-hidden h-full"
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
                        className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-75 hover:bg-opacity-100 transition-colors duration-300"
                        onClick={toggleFavorite}
                        aria-label={
                            isFavorite
                                ? 'Remover dos favoritos'
                                : 'Adicionar aos favoritos'
                        }
                    >
                        <FaHeart
                            className={`text-xl ${
                                isFavorite ? 'text-red-500' : 'text-gray-400'
                            } hover:text-red-600 transition-colors duration-300`}
                        />
                    </button>
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                    <p className="text-gray-600 mb-2">{item.location}</p>
                    <p className="text-lg font-bold text-red-600 mb-2">
                        R$ {item.price.toLocaleString()}
                    </p>
                    <div className="flex justify-between text-sm text-gray-500">
                        {item.type === 'imovel' && (
                            <>
                                <span>
                                    <FaBed
                                        className="inline mr-1"
                                        aria-hidden="true"
                                    />
                                    <span className="sr-only">Quartos:</span>
                                    {item.details.bedrooms} quartos
                                </span>
                                <span>
                                    <FaBath
                                        className="inline mr-1"
                                        aria-hidden="true"
                                    />
                                    <span className="sr-only">Banheiros:</span>
                                    {item.details.bathrooms} banheiros
                                </span>
                                <span>{item.details.area} m²</span>
                            </>
                        )}
                        {item.type === 'veiculo' && (
                            <>
                                <span>
                                    <FaCar
                                        className="inline mr-1"
                                        aria-hidden="true"
                                    />
                                    <span className="sr-only">Ano:</span>
                                    {item.details.year}
                                </span>
                                <span>
                                    {item.details.mileage?.toLocaleString()} km
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}

// Main Component
const ListingPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchTerm, setSearchTerm] = useState('')

    const [displayedListings, setDisplayedListings] = useState<ListingItem[]>(
        []
    )
    const [hasMore, setHasMore] = useState(true)

    const [filterType, setFilterType] = useState<FilterTypeOption>(
        (searchParams.get('type') as FilterTypeOption) || 'all'
    )
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
    const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
        minPrice: 0,
        maxPrice: 1000000,
        bedrooms: 0,
        bathrooms: 0,
        minYear: 0,
        maxMileage: 1000000,
    })

    //Filter
    type FilterTypeOption = 'all' | 'imoveis' | 'veiculos' | 'favoritos'

    const filterOptions = [
        {
            value: 'all',
            label: 'Todos',
            icon: <FaList className="text-red-500" />,
        },
        {
            value: 'imoveis',
            label: 'Imóveis',
            icon: <FaHome className="text-red-500" />,
        },
        {
            value: 'veiculos',
            label: 'Veículos',
            icon: <FaCar className="text-red-500" />,
        },
        {
            value: 'favoritos',
            label: 'Favoritos',
            icon: <FaHeart className="text-orange-500" />,
        },
    ]

    const handleFilterChange = (newType: FilterTypeOption) => {
        setFilterType(newType)
        setSearchParams({ type: newType })
    }

    const applyAdvancedFilters = (item: ListingItem) => {
        if (
            item.price < advancedFilters.minPrice ||
            item.price > advancedFilters.maxPrice
        ) {
            return false
        }
        if (item.type === 'imovel') {
            if (
                advancedFilters.bedrooms > 0 &&
                item.details?.bedrooms !== undefined &&
                item.details.bedrooms < advancedFilters.bedrooms
            ) {
                return false
            }
            if (
                advancedFilters.bathrooms > 0 &&
                item.details?.bathrooms !== undefined &&
                item.details.bathrooms < advancedFilters.bathrooms
            ) {
                return false
            }
        }
        if (item.type === 'veiculo') {
            if (
                advancedFilters.minYear > 0 &&
                item.details?.year !== undefined &&
                item.details.year < advancedFilters.minYear
            ) {
                return false
            }
            if (
                advancedFilters.maxMileage > 0 &&
                item.details?.mileage !== undefined &&
                item.details.mileage > advancedFilters.maxMileage
            ) {
                return false
            }
        }
        return true
    }

    // Listing Functions
    const resetListings = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        const filtered = dummyListings.filter(item => {
            const itemType =
                filterType === 'imoveis'
                    ? 'imovel'
                    : filterType === 'veiculos'
                      ? 'veiculo'
                      : 'all'
            const matchesType = itemType === 'all' || item.type === itemType
            const matchesSearch =
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.location.toLowerCase().includes(searchTerm.toLowerCase())
            const isFavorite =
                filterType === 'favoritos' ? favorites.includes(item.id) : true

            return (
                matchesType &&
                matchesSearch &&
                isFavorite &&
                applyAdvancedFilters(item)
            )
        })
        setDisplayedListings(filtered.slice(0, 6))
        setHasMore(filtered.length > 6)
    }

    const loadMore = () => {
        const filtered = dummyListings.filter(
            item =>
                (filterType === 'all' ||
                    item.type === filterType.slice(0, -1)) &&
                (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.location
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()))
        )
        const newListings = filtered.slice(
            displayedListings.length,
            displayedListings.length + 6
        )
        setDisplayedListings([...displayedListings, ...newListings])
        setHasMore(
            displayedListings.length + newListings.length < filtered.length
        )
    }

    // Constants
    const pageTitle =
        filterType === 'imoveis'
            ? 'Imóveis'
            : filterType === 'veiculos'
              ? 'Veículos'
              : 'Todos os Itens'

    useEffect(() => {
        const type = searchParams.get('type') as FilterTypeOption
        const intention = searchParams.get('intention')
        const term = searchParams.get('term')

        setFilterType(type || 'all')
        setSearchTerm(term || '')
        // Você pode adicionar lógica adicional para lidar com a intenção, se necessário

        resetListings()
    }, [searchParams])

    useEffect(() => {
        resetListings()
    }, [searchTerm, filterType])

    return (
        <>
            <Header isHomePage={false} />
            <main className="container mx-auto px-4 py-8 pt-36">
                <div className="flex flex-col md:flex-row justify-between mb-8">
                    <div className="relative mb-4 md:mb-0 md:w-1/2">
                        <input
                            type="text"
                            placeholder={`Buscar ${pageTitle.toLowerCase()}`}
                            className="w-full p-3 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            aria-label="Buscar"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    <div className="w-full md:w-1/4">
                        <CustomSelect
                            options={filterOptions}
                            value={filterType}
                            onChange={value =>
                                handleFilterChange(value as FilterTypeOption)
                            }
                        />
                    </div>
                </div>
                <motion.button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="mb-4 text-red-600 hover:text-red-800 font-semibold flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaFilter className="mr-2" />
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={showAdvancedFilters ? 'hide' : 'show'}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.05 }}
                        >
                            {showAdvancedFilters
                                ? 'Ocultar filtros avançados'
                                : 'Mostrar filtros avançados'}
                        </motion.span>
                    </AnimatePresence>
                </motion.button>

                <AnimatePresence>
                    {showAdvancedFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.1 }}
                            className="mb-8 p-6 bg-gray-50 rounded-lg shadow-md border border-red-200"
                        >
                            <h3 className="text-xl font-semibold mb-4 text-red-600">
                                Filtros Avançados
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-gray-700 mb-2 font-medium">
                                        Faixa de Preço
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <FaDollarSign className="text-red-500" />
                                        <input
                                            type="number"
                                            placeholder="Mín"
                                            value={advancedFilters.minPrice}
                                            onChange={e =>
                                                setAdvancedFilters({
                                                    ...advancedFilters,
                                                    minPrice: Number(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                            className="w-full p-2 border rounded focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                        />
                                        <span>-</span>
                                        <input
                                            type="number"
                                            placeholder="Máx"
                                            value={advancedFilters.maxPrice}
                                            onChange={e =>
                                                setAdvancedFilters({
                                                    ...advancedFilters,
                                                    maxPrice: Number(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                            className="w-full p-2 border rounded focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                        />
                                    </div>
                                </div>
                                {filterType === 'imoveis' && (
                                    <>
                                        <div>
                                            <label className="block text-gray-700 mb-2 font-medium">
                                                Quartos
                                            </label>
                                            <div className="flex items-center">
                                                <FaBed className="text-red-500 mr-2" />
                                                <input
                                                    type="number"
                                                    placeholder="Mínimo"
                                                    value={
                                                        advancedFilters.bedrooms
                                                    }
                                                    onChange={e =>
                                                        setAdvancedFilters({
                                                            ...advancedFilters,
                                                            bedrooms: Number(
                                                                e.target.value
                                                            ),
                                                        })
                                                    }
                                                    className="w-full p-2 border rounded focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-2 font-medium">
                                                Banheiros
                                            </label>
                                            <div className="flex items-center">
                                                <FaBath className="text-red-500 mr-2" />
                                                <input
                                                    type="number"
                                                    placeholder="Mínimo"
                                                    value={
                                                        advancedFilters.bathrooms
                                                    }
                                                    onChange={e =>
                                                        setAdvancedFilters({
                                                            ...advancedFilters,
                                                            bathrooms: Number(
                                                                e.target.value
                                                            ),
                                                        })
                                                    }
                                                    className="w-full p-2 border rounded focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                                {filterType === 'veiculos' && (
                                    <>
                                        <div>
                                            <label className="block text-gray-700 mb-2 font-medium">
                                                Ano
                                            </label>
                                            <div className="flex items-center">
                                                <FaCalendarAlt className="text-red-500 mr-2" />
                                                <input
                                                    type="number"
                                                    placeholder="Ano mínimo"
                                                    value={
                                                        advancedFilters.minYear
                                                    }
                                                    onChange={e =>
                                                        setAdvancedFilters({
                                                            ...advancedFilters,
                                                            minYear: Number(
                                                                e.target.value
                                                            ),
                                                        })
                                                    }
                                                    className="w-full p-2 border rounded focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-2 font-medium">
                                                Quilometragem
                                            </label>
                                            <div className="flex items-center">
                                                <FaTachometerAlt className="text-red-500 mr-2" />
                                                <input
                                                    type="number"
                                                    placeholder="Máxima"
                                                    value={
                                                        advancedFilters.maxMileage
                                                    }
                                                    onChange={e =>
                                                        setAdvancedFilters({
                                                            ...advancedFilters,
                                                            maxMileage: Number(
                                                                e.target.value
                                                            ),
                                                        })
                                                    }
                                                    className="w-full p-2 border rounded focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <button
                                onClick={resetListings}
                                className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center"
                            >
                                <FaFilter className="mr-2" />
                                Aplicar Filtros
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <InfiniteScroll
                    dataLength={displayedListings.length}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={<h4>Carregando mais itens...</h4>}
                    className="overflow-hidden py-6 px-6"
                >
                    <AnimatePresence>
                        <motion.div
                            key={filterType}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {displayedListings.map(item => (
                                <ListingCard key={item.id} item={item} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </InfiniteScroll>
            </main>
            <Footer />
        </>
    )
}

export default ListingPage
