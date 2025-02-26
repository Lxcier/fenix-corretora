import React, { useState, useEffect, useRef, useCallback } from 'react'
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
import { useAssets } from '../hooks/useAssets'
import { Asset } from '../data/assets'

// Components
const CustomSelect: React.FC<{
    options: { value: string; label: string; icon: React.ReactNode }[]
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

export const ListingCard: React.FC<{ item: Asset }> = ({ item }) => {
    const [isFavorite, setIsFavorite] = useState(false)

    const assetTitle = item.title.toLowerCase().replace(/\s+/g, '-')

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        setIsFavorite(favorites.includes(item.id))
    }, [item.id])

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault()
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        if (isFavorite) {
            const newFavorites = favorites.filter(
                (id: string) => id !== item.id
            )
            localStorage.setItem('favorites', JSON.stringify(newFavorites))
        } else {
            favorites.push(item.id)
            localStorage.setItem('favorites', JSON.stringify(favorites))
        }
        setIsFavorite(!isFavorite)
    }

    return (
        <Link to={`/asset/${assetTitle}`} className="block">
            <motion.div
                className="bg-white rounded-lg shadow-md overflow-hidden h-full"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
            >
                <div className="relative">
                    <img
                        src={item.images[0]}
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
                    <p className="text-gray-600 mb-2">{item.location.city}</p>
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
                                    {item.features.bedrooms} quartos
                                </span>
                                <span>
                                    <FaBath
                                        className="inline mr-1"
                                        aria-hidden="true"
                                    />
                                    <span className="sr-only">Banheiros:</span>
                                    {item.features.bathrooms} banheiros
                                </span>
                                <span>{item.features.area} m²</span>
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
                                    {item.features.year}
                                </span>
                                <span>
                                    {item.features.mileage?.toLocaleString()} km
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
    const [filterType, setFilterType] = useState<
        'all' | 'imoveis' | 'veiculos' | 'favoritos'
    >('all')
    const [displayedListings, setDisplayedListings] = useState<Asset[]>([])
    const [hasMore, setHasMore] = useState(true)
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
    const [advancedFilters, setAdvancedFilters] = useState({
        minPrice: 0,
        maxPrice: 1000000,
        bedrooms: 0,
        bathrooms: 0,
        minYear: 0,
        maxMileage: 1000000,
    })
    const { allAssets, getAssetsByType } = useAssets()

    const resetListings = useCallback(() => {
        let filteredAssets = allAssets
        if (filterType === 'imoveis') {
            filteredAssets = getAssetsByType('imovel')
        } else if (filterType === 'veiculos') {
            filteredAssets = getAssetsByType('veiculo')
        } else if (filterType === 'favoritos') {
            const favorites = JSON.parse(
                localStorage.getItem('favorites') || '[]'
            )
            filteredAssets = allAssets.filter(asset =>
                favorites.includes(asset.id)
            )
        }

        filteredAssets = filteredAssets.filter(
            asset =>
                asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                asset.location.city
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        )

        filteredAssets = filteredAssets.filter(asset => {
            if (
                asset.price < advancedFilters.minPrice ||
                asset.price > advancedFilters.maxPrice
            ) {
                return false
            }
            if (asset.type === 'imovel') {
                if (
                    advancedFilters.bedrooms > 0 &&
                    asset.features.bedrooms &&
                    asset.features.bedrooms < advancedFilters.bedrooms
                ) {
                    return false
                }
                if (
                    advancedFilters.bathrooms > 0 &&
                    asset.features.bathrooms &&
                    asset.features.bathrooms < advancedFilters.bathrooms
                ) {
                    return false
                }
            }
            if (asset.type === 'veiculo') {
                if (
                    advancedFilters.minYear > 0 &&
                    asset.features.year &&
                    asset.features.year < advancedFilters.minYear
                ) {
                    return false
                }
                if (
                    advancedFilters.maxMileage > 0 &&
                    asset.features.mileage &&
                    asset.features.mileage > advancedFilters.maxMileage
                ) {
                    return false
                }
            }

            return true
        })

        setDisplayedListings(filteredAssets.slice(0, 6))
        setHasMore(filteredAssets.length > 6)
    }, [allAssets, filterType, getAssetsByType, searchTerm, advancedFilters])
    useEffect(() => {
        const type = searchParams.get('type') as
            | 'all'
            | 'imoveis'
            | 'veiculos'
            | 'favoritos'
        setFilterType(type || 'all')
        resetListings()
    }, [searchParams, allAssets, resetListings])

    const loadMore = () => {
        const newListings = allAssets.slice(
            displayedListings.length,
            displayedListings.length + 6
        )
        setDisplayedListings([...displayedListings, ...newListings])
        setHasMore(
            displayedListings.length + newListings.length < allAssets.length
        )
    }

    const handleFilterChange = (
        newType: 'all' | 'imoveis' | 'veiculos' | 'favoritos'
    ) => {
        setFilterType(newType)
        setSearchParams({ type: newType })
    }

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

    return (
        <>
            <Header isHomePage={false} />
            <main className="container mx-auto px-4 py-8 pt-36">
                <div className="flex flex-col md:flex-row justify-between mb-8">
                    <div className="relative mb-4 md:mb-0 md:w-1/2">
                        <input
                            type="text"
                            placeholder={`Buscar ${filterType === 'imoveis' ? 'imóveis' : filterType === 'veiculos' ? 'veículos' : 'todos os itens'}`}
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
                                handleFilterChange(
                                    value as
                                        | 'all'
                                        | 'imoveis'
                                        | 'veiculos'
                                        | 'favoritos'
                                )
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
