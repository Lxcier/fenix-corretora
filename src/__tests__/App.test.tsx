import React from 'react'
import { render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

describe('RouterProvider', () => {
    it('renders without crashing', () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: <div>Home</div>,
            },
        ])

        render(<RouterProvider router={router} />)
        expect(screen.getByText('Home')).toBeInTheDocument()
    })

    it('navigates to different routes', () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: <div>Home</div>,
            },
            {
                path: '/about',
                element: <div>About</div>,
            },
        ])

        render(<RouterProvider router={router} />)
        expect(screen.getByText('Home')).toBeInTheDocument()

        router.navigate('/about')
        expect(screen.getByText('About')).toBeInTheDocument()
    })

    it('handles 404 routes', () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: <div>Home</div>,
            },
            {
                path: '*',
                element: <div>Not Found</div>,
            },
        ])

        render(<RouterProvider router={router} />)
        router.navigate('/non-existent-route')
        expect(screen.getByText('Not Found')).toBeInTheDocument()
    })
})
