export interface Asset {
    id: string
    type: 'imovel' | 'veiculo'
    title: string
    description: string
    price: number
    rentPrice?: number
    images: string[]
    location: {
        city: string
        neighborhood: string
        state: string
        zipCode: string
    }
    features: {
        area?: number
        bedrooms?: number
        bathrooms?: number
        parkingSpaces?: number
        year?: number
        mileage?: number
    }
    isHighlight: boolean
    isNew: boolean
    forSale: boolean
    forRent: boolean
    condoFee?: number
    iptu?: number
}

export const assets: Asset[] = [
    {
        id: '1',
        type: 'imovel',
        title: 'Apartamento Luxuoso no Centro',
        description:
            'Lindo apartamento com vista panorâmica, acabamento de alto padrão e localização privilegiada. Próximo a restaurantes, shopping e transporte público.',
        price: 500000,
        rentPrice: 2500,
        images: ['url1', 'url2', 'url3'],
        location: {
            city: 'São Paulo',
            neighborhood: 'Centro',
            state: 'SP',
            zipCode: '01000-000',
        },
        features: {
            area: 120,
            bedrooms: 3,
            bathrooms: 2,
            parkingSpaces: 1,
        },
        isHighlight: true,
        isNew: false,
        forSale: true,
        forRent: true,
        condoFee: 800,
        iptu: 200,
    },
    {
        id: '2',
        type: 'veiculo',
        title: 'SUV Esportivo 2022',
        description:
            'Veículo em excelente estado, baixa quilometragem, completo com teto solar, câmera de ré e sistema de som premium.',
        price: 150000,
        images: ['url1', 'url2'],
        location: {
            city: 'Rio de Janeiro',
            neighborhood: 'Barra da Tijuca',
            state: 'RJ',
            zipCode: '22000-000',
        },
        features: {
            year: 2022,
            mileage: 15000,
        },
        isHighlight: true,
        isNew: true,
        forSale: true,
        forRent: false,
    },
    {
        id: '3',
        type: 'imovel',
        title: 'Casa de Campo com Piscina',
        description:
            'Espaçosa casa de campo com piscina, área de churrasco e amplo jardim. Perfeita para quem busca tranquilidade e contato com a natureza.',
        price: 800000,
        rentPrice: 5000,
        images: ['url1', 'url2', 'url3', 'url4'],
        location: {
            city: 'Atibaia',
            neighborhood: 'Condomínio Flamboyant',
            state: 'SP',
            zipCode: '12940-000',
        },
        features: {
            area: 350,
            bedrooms: 4,
            bathrooms: 3,
            parkingSpaces: 2,
        },
        isHighlight: false,
        isNew: true,
        forSale: true,
        forRent: true,
        condoFee: 500,
        iptu: 300,
    },
]
