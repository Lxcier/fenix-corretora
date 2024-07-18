import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FaHandshake,
    FaChartLine,
    FaUserTie,
    FaMapMarkedAlt,
    FaWhatsapp,
} from 'react-icons/fa'

const ReasonButton = React.memo(
    ({
        title,
        isActive,
        onClick,
    }: {
        title: string
        isActive: boolean
        onClick: () => void
    }) => (
        <motion.button
            className={`w-full text-left cursor-pointer mb-4 p-4 rounded-lg transition-colors duration-100 ${
                isActive
                    ? 'bg-red-500 border-l-4 border-orange-500'
                    : 'hover:bg-gray-100'
            }`}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={false}
            animate={{
                backgroundColor: isActive ? '#ef4444' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : '#374151',
                transition: { duration: 0.2 },
            }}
        >
            <h3 className={`text-lg md:text-xl font-semibold `}>{title}</h3>
        </motion.button>
    )
)

const ReasonContent = React.memo(
    ({
        icon,
        title,
        description,
    }: {
        icon: React.ReactNode
        title: string
        description: string
    }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
        >
            <div className="flex items-center mb-6">
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {icon}
                </motion.div>
                <h3 className="text-xl md:text-2xl font-semibold ml-4 text-gray-800">
                    {title}
                </h3>
            </div>
            <p className="text-gray-600 text-base md:text-lg flex-grow">
                {description}
            </p>
        </motion.div>
    )
)

const WhyChooseUs: React.FC = () => {
    const [activeReason, setActiveReason] = useState(0)

    const reasons = [
        {
            icon: <FaHandshake className="text-5xl md:text-6xl text-red-500" />,
            title: 'Atendimento Personalizado',
            description:
                'Oferecemos um serviço sob medida para cada cliente, entendendo suas necessidades únicas e proporcionando soluções personalizadas.',
        },
        {
            icon: <FaChartLine className="text-5xl md:text-6xl text-red-500" />,
            title: 'Expertise de Mercado',
            description:
                'Nossa equipe possui profundo conhecimento do mercado imobiliário local, garantindo as melhores oportunidades para nossos clientes.',
        },
        {
            icon: <FaUserTie className="text-5xl md:text-6xl text-red-500" />,
            title: 'Profissionalismo',
            description:
                'Conduzimos cada negociação com ética, transparência e um compromisso inabalável com a excelência em todos os aspectos.',
        },
        {
            icon: (
                <FaMapMarkedAlt className="text-5xl md:text-6xl text-red-500" />
            ),
            title: 'Ampla Carteira de Imóveis',
            description:
                'Dispomos de uma vasta seleção de propriedades cuidadosamente selecionadas para atender a todos os gostos e necessidades.',
        },
    ]

    const handleReasonClick = useCallback((index: number) => {
        setActiveReason(index)
    }, [])

    return (
        <section className="py-8 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-semibold text-center text-red-500 mb-10 md:mb-16">
                    Por que escolher a Corretora Fênix?
                </h2>
                <div className="flex flex-col lg:flex-row items-start justify-center mb-12">
                    <div className="w-full lg:w-1/3 mb-8 lg:mb-0 lg:pr-8">
                        {reasons.map((reason, index) => (
                            <ReasonButton
                                key={index}
                                title={reason.title}
                                isActive={activeReason === index}
                                onClick={() => handleReasonClick(index)}
                            />
                        ))}
                    </div>
                    <div className="w-full lg:w-2/3 bg-gray-50 p-6 md:p-8 rounded-lg shadow-lg min-h-[250px]">
                        <AnimatePresence mode="wait">
                            <ReasonContent
                                key={activeReason}
                                {...reasons[activeReason]}
                            />
                        </AnimatePresence>
                    </div>
                </div>
                <div className="text-center">
                    <motion.a
                        href="https://wa.me/5511999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaWhatsapp className="mr-2" />
                        Fale Conosco pelo WhatsApp
                    </motion.a>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs
