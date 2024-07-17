import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { FaWhatsapp } from 'react-icons/fa6'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <FaWhatsapp
            className="fixed bottom-10 right-10 text-5xl text-green-500 z-50 cursor-pointer hover:text-green-600 transition-colors duration-300"
            onClick={() =>
                window.open('https://wa.me/your-whatsapp-number', '_blank')
            }
            aria-label="Contact us on WhatsApp"
        />
        <RouterProvider router={router} />
    </React.StrictMode>
)
