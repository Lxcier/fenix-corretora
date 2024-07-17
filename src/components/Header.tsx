import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const heroHeight =
                document.getElementById('hero')?.offsetHeight || 0
            setIsScrolled(window.scrollY > heroHeight)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-orange-500">
                    <img
                        className="w-40 h-auto"
                        src="/src/assets/logo.png"
                        alt="Logo da Corretora Fenix"
                    />
                </Link>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link
                                to="/imoveis"
                                className={`font-semibold hover:text-orange-500 hover:border-orange-500 border-b-[3px] border-transparent transition-colors duration-200 pb-1 ${
                                    isScrolled ? 'text-gray-800' : 'text-white'
                                }`}
                            >
                                Imóveis
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/veiculos"
                                className={`font-semibold hover:text-orange-500 hover:border-orange-500 border-b-[3px] border-transparent transition-colors duration-200 pb-1 ${
                                    isScrolled ? 'text-gray-800' : 'text-white'
                                }`}
                            >
                                Veículos
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/financiamento"
                                className={`font-semibold hover:text-orange-500 hover:border-orange-500 border-b-[3px] border-transparent transition-colors duration-200 pb-1 ${
                                    isScrolled ? 'text-gray-800' : 'text-white'
                                }`}
                            >
                                Financiamento
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/negociacao"
                                className={`font-semibold hover:text-orange-500 hover:border-orange-500 border-b-[3px] border-transparent transition-colors duration-200 pb-1 ${
                                    isScrolled ? 'text-gray-800' : 'text-white'
                                }`}
                            >
                                Negociação
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/encomendar"
                                className={`font-semibold hover:text-orange-500 hover:border-orange-500 border-b-[3px] border-transparent transition-colors duration-200 pb-1 ${
                                    isScrolled ? 'text-gray-800' : 'text-white'
                                }`}
                            >
                                Encomendar
                            </Link>
                        </li>
                    </ul>
                </nav>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="https://wwww.instagram.com">
                                <i
                                    className={`fab fa-instagram text-3xl ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-orange-500`}
                                ></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://wwww.facebook.com">
                                <i
                                    className={`fab fa-facebook text-3xl ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-orange-500`}
                                ></i>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
