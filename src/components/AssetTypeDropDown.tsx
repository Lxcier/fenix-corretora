import React, { useState } from 'react'
import { FaChevronDown, FaCheck } from 'react-icons/fa'

const AssetTypeDropdown: React.FC = () => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])

    const handleCheckboxChange = (type: string) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter(t => t !== type))
        } else {
            setSelectedTypes([...selectedTypes, type])
        }
    }

    return (
        <details className="relative">
            <summary className="flex items-center justify-between w-full p-3 border rounded-lg cursor-pointer">
                <span className="text-gray-500">Tipo ativo</span>
                <FaChevronDown className="text-gray-400" />
            </summary>
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg h-[250px] overflow-y-scroll">
                <div className="p-3">
                    <label className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            checked={selectedTypes.length === 0}
                            onChange={() => setSelectedTypes([])}
                            className="mr-2"
                        />
                        Todos os ativos
                    </label>

                    <h3 className="font-bold mt-4 mb-2">Imóveis</h3>
                    {['Casa', 'Apartamento', 'Chácara', 'Terreno'].map(type => (
                        <label key={type} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                checked={selectedTypes.includes(type)}
                                onChange={() => handleCheckboxChange(type)}
                                className="mr-2"
                            />
                            {type}
                        </label>
                    ))}

                    <h3 className="font-bold mt-4 mb-2">Comercial</h3>
                    {['Casa', 'Terreno'].map(type => (
                        <label
                            key={`comercial-${type}`}
                            className="flex items-center mb-2"
                        >
                            <input
                                type="checkbox"
                                checked={selectedTypes.includes(
                                    `Comercial ${type}`
                                )}
                                onChange={() =>
                                    handleCheckboxChange(`Comercial ${type}`)
                                }
                                className="mr-2"
                            />
                            {type}
                        </label>
                    ))}

                    <h3 className="font-bold mt-4 mb-2">Industrial</h3>
                    <label className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            checked={selectedTypes.includes(
                                'Industrial Terreno'
                            )}
                            onChange={() =>
                                handleCheckboxChange('Industrial Terreno')
                            }
                            className="mr-2"
                        />
                        Terreno
                    </label>

                    <h3 className="font-bold mt-4 mb-2">Veículo</h3>
                    {['Carro', 'Moto'].map(type => (
                        <label key={type} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                checked={selectedTypes.includes(type)}
                                onChange={() => handleCheckboxChange(type)}
                                className="mr-2"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>
        </details>
    )
}

export default AssetTypeDropdown
