import React, { useState, useCallback } from 'react'
import { FaSearchPlus, FaSearchMinus } from 'react-icons/fa'

const AssetCarousel: React.FC<{ images: string[]; activeIndex: number }> = ({
    images,
    activeIndex,
}) => {
    const [isZoomed, setIsZoomed] = useState(false)
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (isZoomed) {
                const { left, top, width, height } =
                    e.currentTarget.getBoundingClientRect()
                const x = (e.clientX - left) / width
                const y = (e.clientY - top) / height
                setZoomPosition({ x, y })
            }
        },
        [isZoomed]
    )

    const toggleZoom = useCallback(() => {
        setIsZoomed(!isZoomed)
    }, [isZoomed])

    return (
        <div className="relative flex-grow">
            <div
                className="relative w-full h-64 sm:h-96 overflow-hidden cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onClick={toggleZoom}
            >
                <img
                    src={images[activeIndex]}
                    alt={`Asset view ${activeIndex + 1}`}
                    className={`w-full h-full object-contain transition-transform duration-200 ${isZoomed ? 'scale-150' : ''}`}
                    style={{
                        transformOrigin: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
                    }}
                />
            </div>
            <button
                className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md"
                onClick={toggleZoom}
            >
                {isZoomed ? <FaSearchMinus /> : <FaSearchPlus />}
            </button>
        </div>
    )
}

export default AssetCarousel
