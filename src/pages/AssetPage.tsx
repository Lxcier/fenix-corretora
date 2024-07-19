import React, { useState } from 'react'
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
    const { getAssetById } = useAssets()
    const asset = getAssetById(id || '')
    const [activeIndex, setActiveIndex] = useState(0)

    if (!asset) {
        return <div>Asset not found</div>
    }

    const handleThumbnailClick = (index: number) => {
        setActiveIndex(index)
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
                                onThumbnailClick={handleThumbnailClick}
                                activeIndex={activeIndex}
                            />
                            <AssetCarousel
                                images={asset.images}
                                activeIndex={activeIndex}
                            />
                        </div>
                        <AssetDetails assetId={asset.id} />
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
