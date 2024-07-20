import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { useAssets } from '../hooks/useAssets'

const Footer: React.FC = () => {
    const { getAssetsByType } = useAssets()

    const featuredImoveis = getAssetsByType('imovel')
        .filter(asset => asset.isHighlight)
        .slice(0, 3)
    const featuredVeiculos = getAssetsByType('veiculo')
        .filter(asset => asset.isHighlight)
        .slice(0, 3)

    const socialLinks = [
        { icon: FaFacebook, url: '#', ariaLabel: 'Facebook' },
        { icon: FaInstagram, url: '#', ariaLabel: 'Instagram' },
        { icon: FaLinkedin, url: '#', ariaLabel: 'LinkedIn' },
        { icon: FaWhatsapp, url: '#', ariaLabel: 'WhatsApp' },
    ]

    const quickLinks = [
        { to: '/', text: 'Home' },
        { to: '/listing?type=imoveis', text: 'Imóveis' },
        { to: '/listing?type=veiculos', text: 'Veículos' },
        { to: '/financiamento', text: 'Financiamento' },
        { to: '/negociacao', text: 'Negociação' },
        { to: '/encomendar', text: 'Encomendar' },
    ]

    return (
        <footer className="bg-gradient-to-r from-red-700 to-red-800 text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold">
                            Corretora{' '}
                            <span className="text-orange-400">Fênix</span>
                        </h3>
                        <p className="text-gray-300">
                            Sua parceira confiável em imóveis e veículos.
                        </p>
                        <div className="flex space-x-6">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    className="text-white hover:text-orange-400 text-2xl transition-all duration-300 transform hover:scale-110"
                                    aria-label={link.ariaLabel}
                                >
                                    <link.icon />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-6">
                            Links Rápidos
                        </h3>
                        <ul className="space-y-3 w-fit">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.to}
                                        className="hover:text-orange-400 transition-colors duration-200 flex items-center w-fit"
                                    >
                                        <span className="mr-2">‣</span>
                                        <p className="hover:underline ">
                                            {link.text}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-6">
                            Imóveis em Destaque
                        </h3>
                        <ul className="space-y-3">
                            {featuredImoveis.map(imovel => (
                                <li key={imovel.id}>
                                    <Link
                                        to={`/asset/${imovel.id}`}
                                        className="hover:text-orange-400 transition-colors duration-300 flex items-center"
                                    >
                                        <span className="mr-2">‣</span>
                                        {imovel.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-6">
                            Veículos em Destaque
                        </h3>
                        <ul className="space-y-3">
                            {featuredVeiculos.map(veiculo => (
                                <li key={veiculo.id}>
                                    <Link
                                        to={`/asset/${veiculo.id}`}
                                        className="hover:text-orange-400 transition-colors duration-300 flex items-center"
                                    >
                                        <span className="mr-2">‣</span>
                                        {veiculo.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-red-600 text-center">
                    <p className="text-gray-300">
                        © {new Date().getFullYear()} Corretora Fênix. Todos os
                        direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
