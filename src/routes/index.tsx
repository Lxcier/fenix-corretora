import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Imoveis from '../pages/Imoveis'
import Veiculos from '../pages/Veiculos'
import AtivoDetalhes from '../pages/AtivoDetalhes'
import Financiamento from '../pages/Financiamento'
import Negociacao from '../pages/Negociacao'
import Encomendar from '../pages/Encomendar'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/imoveis',
        element: <Imoveis />,
    },
    {
        path: '/veiculos',
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
])

export default router
