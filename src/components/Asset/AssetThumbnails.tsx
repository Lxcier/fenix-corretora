import React from 'react'

const AssetThumbnails: React.FC<{
    images: string[]
    onThumbnailClick: (index: number) => void
    activeIndex: number
}> = ({ images, onThumbnailClick, activeIndex }) => {
    return (
        <div className="flex flex-row mt-6 sm:flex-col mr-0 sm:mr-4 space-x-2 sm:space-x-0 sm:space-y-2 mb-4 sm:mb-0">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`w-16 h-16 md:w-20 md:h-20 cursor-pointer border-2 ${activeIndex === index ? 'border-red-500' : 'border-transparent'}`}
                    onClick={() => onThumbnailClick(index)}
                >
                    <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}
        </div>
    )
}

export default AssetThumbnails
