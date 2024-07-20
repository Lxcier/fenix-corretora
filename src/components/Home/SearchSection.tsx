import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import IntentionDropdown from './IntentionDropDown'
import AssetTypeDropdown from './AssetTypeDropDown'
import { useAssets } from '../../hooks/useAssets'

const SearchSection: React.FC = () => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [selectedIntention, setSelectedIntention] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState('')
    const [suggestions, setSuggestions] = useState<
        Array<{ id: string; title: string; image: string }>
    >([])
    const navigate = useNavigate()
    const { allAssets } = useAssets()

    useEffect(() => {
        if (searchTerm.length > 2) {
            const filteredSuggestions = allAssets
                .filter(
                    asset =>
                        asset.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                        asset.location.city
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                )
                .map(asset => ({
                    id: asset.id,
                    title: asset.title,
                    image: asset.images[0],
                }))
                .slice(0, 5)
            setSuggestions(filteredSuggestions)
        } else {
            setSuggestions([])
        }
    }, [searchTerm, allAssets])

    const handleSearch = () => {
        const queryParams = new URLSearchParams({
            types: selectedTypes.join(','),
            intention: selectedIntention,
            term: searchTerm,
        })
        navigate(`/listing?${queryParams.toString()}`)
    }

    return (
        <section className="pt-10 bg-white">
            <div className="container mx-auto ">
                <div className="rounded-lg w-full mx-auto px-20">
                    <div className="flex items-center flex-wrap -mx-2 ">
                        <div className="w-full md:w-1/4 px-2 mb-4">
                            <AssetTypeDropdown
                                selectedTypes={selectedTypes}
                                setSelectedTypes={setSelectedTypes}
                            />
                        </div>
                        <div className="w-full md:w-1/4 px-2 mb-4">
                            <IntentionDropdown
                                selectedIntention={selectedIntention}
                                setSelectedIntention={setSelectedIntention}
                            />
                        </div>
                        <div className="w-full md:w-1/3 px-2 mb-4">
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={e =>
                                        setSearchTerm(e.target.value)
                                    }
                                    onKeyPress={e => {
                                        if (e.key === 'Enter') {
                                            handleSearch()
                                        }
                                    }}
                                    placeholder="Cidade, região, bairro..."
                                    className="w-full p-3 pl-10 border rounded-lg"
                                />

                                {suggestions.length > 0 && (
                                    <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow-lg">
                                        {suggestions.map(suggestion => (
                                            <li
                                                key={suggestion.id}
                                                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                                onClick={() => {
                                                    setSearchTerm(
                                                        suggestion.title
                                                    )
                                                    setSuggestions([])
                                                }}
                                            >
                                                <img
                                                    src={suggestion.image}
                                                    alt={suggestion.title}
                                                    className="w-12 h-12 object-cover rounded-md mr-3"
                                                />
                                                <span>{suggestion.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="w-full md:w-1/6 px-2 mb-4">
                            <button
                                onClick={handleSearch}
                                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SearchSection
