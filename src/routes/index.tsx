import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Imoveis from '../pages/Imoveis'
import Veiculos from '../pages/Veiculos'
import AtivoDetalhes from '../pages/AtivoDetalhes'
import Financiamento from '../pages/Financiamento'
import Negociacao from '../pages/Negociacao'
import Encomendar from '../pages/Encomendar'
import ConfirmarForm from '../pages/ConfirmationPage'
import ListingPage from '../pages/ListingPage'
import AssetPage from '../pages/AssetPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/listing/imoveis',
        element: <Imoveis />,
    },
    {
        path: '/listing/veiculos',
        element: <Veiculos />,
    },
    {
        path: '/ativo/:id',
        element: <AtivoDetalhes />,
    },
    {
        path: '/financiamento',
        element: <Financiamento />,
    },
    {
        path: '/negociacao',
        element: <Negociacao />,
    },
    {
        path: '/encomendar',
        element: <Encomendar />,
    },
    {
        path: '/confirmation',
        element: <ConfirmarForm />,
    },
    {
        path: '/listing',
        element: <ListingPage />,
    },
    {
        path: '/asset/:id',
        element: <AssetPage />,
    },
])

export default router
