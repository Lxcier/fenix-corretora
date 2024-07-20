import { useState, useEffect } from 'react'
import { Asset, assets } from '../data/assets'

export const useAssets = () => {
    const [allAssets, setAllAssets] = useState<Asset[]>([])

    useEffect(() => {
        setAllAssets(assets)
    }, [])

    const getAssetById = (id: string) => {
        return allAssets.find(asset => asset.id === id)
    }

    const getAssetByTitle = (title: string) => {
        return allAssets.find(
            asset => asset.title.toLowerCase().replace(/\s+/g, '-') === title
        )
    }

    const getAssetsByType = (type: 'imovel' | 'veiculo') => {
        return allAssets.filter(asset => asset.type === type)
    }

    const getAssetByTitleAndType = (title: string, type: string) => {
        const formattedTitle = title.toLowerCase().replace(/-/g, ' ')
        return assets.find(
            asset =>
                asset.title.toLowerCase() === formattedTitle &&
                (type === '' || asset.type === type)
        )
    }

    const getSimilarAssets = (asset: Asset, limit: number = 3) => {
        return allAssets
            .filter(
                a =>
                    a.id !== asset.id &&
                    a.type === asset.type &&
                    Math.abs(a.price - asset.price) / asset.price <= 0.2
            )
            .slice(0, limit)
    }

    return {
        allAssets,
        getAssetById,
        getAssetByTitle,
        getAssetsByType,
        getAssetByTitleAndType,
        getSimilarAssets,
    }
}
