import React from 'react'
import { FaShippingFast, FaMoneyCheckAlt, FaHandshake } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ServiceCard: React.FC<{
    icon: React.ReactNode
    title: string
    description: string
    cta: string
    route: string
}> = ({ icon, title, description, cta, route }) => (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
        <div className="text-4xl text-red-500 mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-red-500 mb-2">{title}</h3>
        <p className="text-center text-gray-600 mb-4">{description}</p>
        <Link
            to={route}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
            {cta}
        </Link>
    </div>
)

const ServicesSection: React.FC = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-semibold text-center text-red-500 mb-12">
                    Nossos Serviços
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    <ServiceCard
                        icon={<FaShippingFast />}
                        title="Encomenda"
                        description="Facilitamos o processo de encomenda de veículos personalizados, atendendo às suas especificações únicas."
                        cta="Encomendar"
                        route="/encomenda"
                    />
                    <ServiceCard
                        icon={<FaMoneyCheckAlt />}
                        title="Financiamento"
                        description="Oferecemos opções de financiamento flexíveis e competitivas para tornar sua aquisição mais acessível."
                        cta="Simular"
                        route="/financiamento"
                    />
                    <ServiceCard
                        icon={<FaHandshake />}
                        title="Negociação"
                        description="Nossa equipe experiente garante negociações justas e transparentes para todos os envolvidos."
                        cta="Negociar"
                        route="/negociacao"
                    />
                </div>
            </div>
        </section>
    )
}

export default ServicesSection
