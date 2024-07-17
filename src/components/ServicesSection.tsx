import React from 'react'
import { Link } from 'react-router-dom'

// Importe as imagens necessárias
import imgImoveis from '../assets/imoveis.jpg'
import imgVeiculos from '../assets/veiculos.jpg'

const ServicesSectionNew: React.FC = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center mb-16">
                    <div className="lg:w-5/12 mb-8 lg:mb-0">
                        <img
                            src={imgImoveis}
                            alt="Imóveis"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="lg:w-7/12 lg:pl-16">
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-red-600 mb-2">
                            Imóveis
                        </h2>
                        <h3 className="text-xl lg:text-2xl font-normal text-orange-500 tracking-wide mb-4">
                            Encontre o lar dos seus sonhos
                        </h3>
                        <p className="text-gray-700 mb-6">
                            Aqui você encontra o imóvel ideal para você, seja
                            casa, apartamento, comércio, lote/terreno ou para
                            investimento. Temos opções residenciais e comerciais
                            para todos os gostos e orçamentos. Desde casas
                            aconchegantes até terrenos prontos para seu próximo
                            projeto, a Corretora Fênix tem a solução perfeita
                            para você.
                        </p>
                        <Link
                            to="/imoveis"
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                        >
                            Ver Imóveis
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row-reverse items-center">
                    <div className="lg:w-5/12 mb-8 lg:mb-0">
                        <img
                            src={imgVeiculos}
                            alt="Veículos"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="lg:w-7/12 lg:pr-16">
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-red-600 mb-2">
                            Veículos
                        </h2>
                        <h3 className="text-xl lg:text-2xl font-normal text-orange-500 tracking-wide mb-4">
                            Dirija o carro dos seus sonhos
                        </h3>
                        <p className="text-gray-700 mb-6">
                            Descubra uma ampla gama de veículos que atendem a
                            todas as suas necessidades. Desde carros compactos
                            econômicos até SUVs luxuosos, temos opções para
                            todos os estilos de vida e orçamentos. Na Corretora
                            Fênix, você encontrará o veículo perfeito para
                            tornar suas viagens mais confortáveis e
                            emocionantes.
                        </p>
                        <Link
                            to="/veiculos"
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                        >
                            Ver Veículos
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServicesSectionNew
