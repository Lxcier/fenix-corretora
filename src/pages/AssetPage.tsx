import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AssetCarousel from '../components/Asset/AssetCarousel'
import AssetThumbnails from '../components/Asset/AssetThumbnails'
import AssetDetails from '../components/Asset/AssetDetails'
import AssetSidebar from '../components/Asset/AssetSidebar'
import { useAssets } from '../hooks/useAssets'

const AssetPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const { getAssetById, getSimilarAssets } = useAssets()
    const asset = getAssetById(id || '')
    const similarAssets = asset ? getSimilarAssets(asset) : []

    if (!asset) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Ativo não encontrado
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Desculpe, não foi possível encontrar o ativo que você
                        está procurando.
                    </p>
                    <a
                        href="/"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Voltar para a página inicial
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header isHomePage={false} />
            <main className="flex-grow container mx-auto px-4 py-8 pt-28 md:pt-40">
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-3/4 pr-0 lg:pr-8">
                        <div className="flex flex-col sm:flex-row">
                            <AssetThumbnails
                                images={asset.images}
                                onThumbnailClick={() => {}}
                                activeIndex={0}
                            />
                            <AssetCarousel
                                images={asset.images}
                                activeIndex={0}
                            />
                        </div>
                        <AssetDetails
                            title={asset.title}
                            description={asset.description}
                            city={asset.location.city}
                            neighborhood={asset.location.neighborhood}
                            state={asset.location.state}
                            zipCode={asset.location.zipCode}
                            area={asset.features.area || 0}
                            bedrooms={asset.features.bedrooms || 0}
                            bathrooms={asset.features.bathrooms || 0}
                            parkingSpaces={asset.features.parkingSpaces || 0}
                            similarAssets={similarAssets}
                        />
                    </div>
                    <aside className="w-full lg:w-1/4 mt-8 lg:mt-0">
                        <AssetSidebar
                            price={asset.price}
                            rentPrice={asset.rentPrice}
                            condoFee={asset.condoFee}
                            iptu={asset.iptu}
                            isHighlight={asset.isHighlight}
                            isNew={asset.isNew}
                            forSale={asset.forSale}
                            forRent={asset.forRent}
                        />
                    </aside>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default AssetPage
