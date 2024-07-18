const OurValuesSection = () => (
    <section className="py-20">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-semibold text-red-500 mb-12 text-center">
                Nossos Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold text-red-500 mb-4">
                        Integridade
                    </h3>
                    <p className="text-gray-600">
                        Conduzimos nossos negócios com honestidade e
                        transparência, sempre priorizando a ética em todas as
                        nossas interações.
                    </p>
                </div>
                <div className="p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold text-red-500 mb-4">
                        Excelência
                    </h3>
                    <p className="text-gray-600">
                        Buscamos constantemente a excelência em nossos serviços,
                        superando as expectativas dos nossos clientes em cada
                        transação.
                    </p>
                </div>
                <div className="p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold text-red-500 mb-4">
                        Inovação
                    </h3>
                    <p className="text-gray-600">
                        Estamos sempre à frente, adotando as mais recentes
                        tecnologias e práticas para oferecer soluções inovadoras
                        no mercado imobiliário.
                    </p>
                </div>
            </div>
        </div>
    </section>
)

export default OurValuesSection
