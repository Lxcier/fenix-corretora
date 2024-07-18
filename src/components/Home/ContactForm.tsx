import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputMask from 'react-input-mask'
import {
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaUser,
    FaQuestionCircle,
} from 'react-icons/fa'

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    })

    const navigate = useNavigate()

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Form submission logic here
        navigate('/confirmation')
    }

    const FAQSection = () => (
        <div className="md:w-full mb-8 md:mb-0">
            <h3 className="text-2xl font-semibold text-red-500 mb-4">
                Perguntas Frequentes
            </h3>
            <div className="space-y-4">
                <div>
                    <h4 className="font-bold text-gray-700">
                        Como posso agendar uma visita?
                    </h4>
                    <p className="text-gray-600">
                        Entre em contato conosco por telefone ou preencha o
                        formulário para agendar uma visita.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-gray-700">
                        Quais documentos são necessários para comprar um imóvel?
                    </h4>
                    <p className="text-gray-600">
                        Geralmente, são necessários RG, CPF, comprovante de
                        renda e comprovante de residência.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-gray-700">
                        Vocês trabalham com financiamento?
                    </h4>
                    <p className="text-gray-600">
                        Sim, oferecemos diversas opções de financiamento. Entre
                        em contato para mais detalhes.
                    </p>
                </div>
            </div>
        </div>
    )

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-red-500 mb-4">
                    Entre em Contato
                </h2>
                <p className="text-xl text-center text-gray-600 mb-12">
                    Transforme seus sonhos em realidade - Estamos aqui para
                    ajudar!
                </p>
                <div className="flex flex-col-reverse lg:flex-row justify-between items-start">
                    <div className="lg:w-1/3 mb-8 lg:mb-0">
                        <FAQSection />
                        <div className="mt-8">
                            <h3 className="text-2xl font-semibold text-red-500 mb-4">
                                Informações de Contato
                            </h3>
                            <div className="flex items-center mb-4">
                                <FaMapMarkerAlt className="text-red-500 mr-2" />
                                <p>
                                    Rua das Imobiliárias, 123 - Centro, Atibaia
                                    - SP
                                </p>
                            </div>
                            <div className="flex items-center mb-4">
                                <FaPhone className="text-red-500 mr-2" />
                                <p>(11) 1234-5678</p>
                            </div>
                            <div className="flex items-center mb-4">
                                <FaEnvelope className="text-red-500 mr-2" />
                                <p>contato@corretorafenix.com</p>
                            </div>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="lg:w-7/12 w-full bg-white shadow-lg rounded-lg p-8 mb-8 lg:mb-0"
                    >
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-gray-700 font-bold mb-2 flex items-center"
                            >
                                <FaUser className="mr-2 text-red-500" />
                                Nome
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 font-bold mb-2 flex items-center"
                            >
                                <FaEnvelope className="mr-2 text-red-500" />
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="phone"
                                className="block text-gray-700 font-bold mb-2 flex items-center"
                            >
                                <FaPhone className="mr-2 text-red-500" />
                                Telefone
                            </label>
                            <InputMask
                                mask="(99) 99999-9999"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="message"
                                className="block text-gray-700 font-bold mb-2 flex items-center"
                            >
                                <FaQuestionCircle className="mr-2 text-red-500" />
                                Mensagem
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                        >
                            Enviar Mensagem
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ContactForm
