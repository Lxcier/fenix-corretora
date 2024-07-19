import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AssetCarousel from '../components/Asset/AssetCarousel'
import AssetThumbnails from '../components/Asset/AssetThumbnails'
import AssetDetails from '../components/Asset/AssetDetails'
import AssetSidebar from '../components/Asset/AssetSidebar'

const AssetPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [images] = useState([
        'https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg',
        'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
        'https://img.freepik.com/free-photo/beautiful-scenery-road-surrounded-by-high-rocky-mountains-under-cloudy-sky_181624-30216.jpg',
        'https://img.freepik.com/free-photo/beautiful-shot-crystal-clear-lake-snowy-mountain-base-during-sunny-day_181624-5459.jpg',
    ])
    const [activeIndex, setActiveIndex] = useState(0)

    const handleThumbnailClick = (index: number) => {
        setActiveIndex(index)
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header isHomePage={false} />
            <main className="flex-grow container mx-auto px-4 py-8 pt-28 md:pt-40">
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-3/4 pr-0 lg:pr-8">
                        <div className="flex flex-col-reverse sm:flex-row">
                            <AssetThumbnails
                                images={images}
                                onThumbnailClick={handleThumbnailClick}
                                activeIndex={activeIndex}
                            />
                            <AssetCarousel
                                images={images}
                                activeIndex={activeIndex}
                            />
                        </div>
                        <div className="w-full block lg:hidden">
                            <AssetSidebar price={850000} rentPrice={3500} />
                        </div>
                        <AssetDetails
                            title={''}
                            description={''}
                            city={''}
                            neighborhood={''}
                            state={''}
                            zipCode={''}
                            area={0}
                            bedrooms={0}
                            bathrooms={0}
                            parkingSpaces={0}
                            similarAssets={[]}
                        />
                    </div>
                    <aside className="w-full hidden lg:block lg:w-1/4 mt-8 lg:mt-0">
                        <AssetSidebar price={850000} rentPrice={3500} />
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default AssetPage
