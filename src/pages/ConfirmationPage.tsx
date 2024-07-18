import React from 'react'
import { Link } from 'react-router-dom'

const ConfirmationPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold text-red-500 mb-4">
                    Mensagem Enviada!
                </h1>
                <p className="text-gray-700 mb-6">
                    Obrigado por entrar em contato. Responderemos em breve.
                </p>
                <Link
                    to="/"
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-300"
                >
                    Voltar para a Página Inicial
                </Link>
            </div>
        </div>
    )
}

export default ConfirmationPage
