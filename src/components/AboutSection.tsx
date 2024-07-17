import React from 'react'
import { Link } from 'react-router-dom'
import { Parallax } from 'react-parallax'

const AboutSection: React.FC = () => {
    return (
        <Parallax
            blur={0}
            bgImage={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='600' y1='0' x2='600' y2='800'%3E%3Cstop offset='0' stop-color='%23${Math.floor(Math.random() * 16777215).toString(16)}'/%3E%3Cstop offset='1' stop-color='%23${Math.floor(Math.random() * 16777215).toString(16)}'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1200' height='800'/%3E%3Cg%3E${Array.from(
                { length: 2 },
                (_, i) => `
%3Ccircle cx='${Math.floor(Math.random() * 1200)}' cy='${Math.floor(Math.random() * 800)}' r='${Math.floor(Math.random() * 100)}' fill='%23ffffff' opacity='0.1'%3E%3Canimate attributeName='r' values='${Array.from({ length: 2 }, () => Math.floor(Math.random() * 100)).join(';')}' dur='${Math.floor(Math.random() * 10 + 1)}s' repeatCount='indefinite' /%3E%3C/circle%3E
%3Crect x='${Math.floor(Math.random() * 1200)}' y='${Math.floor(Math.random() * 800)}' width='${Math.floor(Math.random() * 200)}' height='${Math.floor(Math.random() * 200)}' fill='%23ffffff' opacity='0.1'%3E%3Canimate attributeName='width' values='${Array.from({ length: 2 }, () => Math.floor(Math.random() * 200)).join(';')}' dur='${Math.floor(Math.random() * 10 + 1)}s' repeatCount='indefinite' /%3E%3Canimate attributeName='height' values='${Array.from({ length: 2 }, () => Math.floor(Math.random() * 200)).join(';')}' dur='${Math.floor(Math.random() * 10 + 1)}s' repeatCount='indefinite' /%3E%3C/rect%3E`
            ).join('')}%3C/g%3E%3C/svg%3E`}
            strength={400}
        >
            <div className="min-h-[600px] flex items-center py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl lg:text-4xl font-bold bg-red-500 text-white py-3 px-6 rounded-top-left-sm">
                            Quem somos?
                        </h2>
                        <div className="px-6 pt-6 pb-8 bg-black drop-shadow-sm bg-opacity-15 backdrop-blur-sm">
                            <h3 className="text-xl lg:text-2xl font-semibold text-orange-400 mb-4">
                                Descubra nossa história e valores
                            </h3>
                            <p className="text-white text-lg mb-10">
                                Somos uma empresa imobiliária especializada em
                                conectar pessoas com seus sonhos em Atibaia e
                                região. Com profundo conhecimento do mercado
                                local e paixão por oferecer soluções
                                personalizadas, nossa missão é auxiliar clientes
                                na compra, venda ou aluguel de imóveis, terrenos
                                e chácaras, com profissionalismo, ética e
                                transparência.
                            </p>
                            <Link
                                to="/sobre"
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                            >
                                Saiba mais
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Parallax>
    )
}

export default AboutSection
