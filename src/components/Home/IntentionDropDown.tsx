import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

const IntentionDropdown: React.FC = () => {
    const [selectedIntention, setSelectedIntention] = useState<string>('')

    const handleIntentionChange = (intention: string) => {
        setSelectedIntention(intention)
    }

    return (
        <details className="relative">
            <summary className="flex items-center justify-between w-full p-3 border rounded-lg cursor-pointer">
                <span className="text-gray-500">
                    {selectedIntention || 'Intenção'}
                </span>
                <FaChevronDown className="text-gray-400" />
            </summary>
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                <div className="p-3">
                    <label className="flex items-center mb-2">
                        <input
                            type="radio"
                            checked={selectedIntention === 'Comprar'}
                            onChange={() => handleIntentionChange('Comprar')}
                            className="mr-2"
                        />
                        Comprar
                    </label>
                    <label className="flex items-center mb-2">
                        <input
                            type="radio"
                            checked={selectedIntention === 'Alugar'}
                            onChange={() => handleIntentionChange('Alugar')}
                            className="mr-2"
                        />
                        Alugar
                    </label>
                </div>
            </div>
        </details>
    )
}

export default IntentionDropdown
