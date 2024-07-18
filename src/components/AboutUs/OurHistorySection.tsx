import { FaBuilding, FaHandshake, FaUsers } from 'react-icons/fa'

const OurHistorySection = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row items-center mb-20">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <img
                        src="/src/assets/about-images/about-image-1.png"
                        alt="Equipe Corretora Fênix"
                        className="rounded-full "
                    />
                </div>
                <div className="md:w-1/2 md:pl-12">
                    <h2 className="text-4xl font-semibold text-red-500 mb-6">
                        Nossa História
                    </h2>
                    <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                        A Corretora Fênix nasceu da paixão por conectar pessoas
                        aos seus sonhos imobiliários. Desde nossa fundação em
                        [ANO], temos sido líderes no mercado de Atibaia e
                        região, oferecendo serviços de excelência em compra,
                        venda e aluguel de imóveis e veículos.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Nossa equipe de profissionais altamente qualificados
                        trabalha incansavelmente para proporcionar as melhores
                        oportunidades e soluções personalizadas para cada
                        cliente.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
                <div className="text-center p-6 rounded-lg">
                    <FaBuilding className="text-6xl text-red-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-semibold mb-4">
                        Expertise no Mercado
                    </h3>
                    <p className="text-gray-700">
                        Conhecimento profundo do mercado imobiliário local.
                    </p>
                </div>
                <div className="text-center p-6 rounded-lg">
                    <FaHandshake className="text-6xl text-red-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-semibold mb-4">
                        Atendimento Personalizado
                    </h3>
                    <p className="text-gray-700">
                        Soluções sob medida para cada cliente.
                    </p>
                </div>
                <div className="text-center p-6 rounded-lg">
                    <FaUsers className="text-6xl text-red-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-semibold mb-4">
                        Equipe Qualificada
                    </h3>
                    <p className="text-gray-700">
                        Profissionais experientes e dedicados.
                    </p>
                </div>
            </div>
        </>
    )
}

export default OurHistorySection
