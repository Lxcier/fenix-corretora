import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'

const Footer: React.FC = () => {
    return (
        <footer className="bg-red-700 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-xl font-bold mb-4">
                            Links Rápidos
                        </h3>
                        <ul>
                            <li>
                                <Link to="/" className="hover:text-red-500">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/imoveis"
                                    className="hover:text-red-500"
                                >
                                    Imóveis
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/veiculos"
                                    className="hover:text-red-500"
                                >
                                    Veículos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/sobre"
                                    className="hover:text-red-500"
                                >
                                    Sobre Nós
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contato"
                                    className="hover:text-red-500"
                                >
                                    Contato
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-xl font-bold mb-4">Contato</h3>
                        <p>Rua das Imobiliárias, 123 - Centro</p>
                        <p>Atibaia - SP</p>
                        <p>Telefone: (11) 1234-5678</p>
                        <p>Email: contato@corretorafenix.com</p>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h3 className="text-xl font-bold mb-4">
                            Redes Sociais
                        </h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-2xl hover:text-red-500">
                                <FaFacebook />
                            </a>
                            <a href="#" className="text-2xl hover:text-red-500">
                                <FaInstagram />
                            </a>
                            <a href="#" className="text-2xl hover:text-red-500">
                                <FaLinkedin />
                            </a>
                            <a href="#" className="text-2xl hover:text-red-500">
                                <FaWhatsapp />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p>
                        &copy; 2023 Corretora Fênix. Todos os direitos
                        reservados.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
