import React from 'react'

const AnimatedBackground: React.FC = () => {
    const generateSVG = () => {
        const gradientColors = {
            start: Math.floor(Math.random() * 16777215).toString(16),
            end: Math.floor(Math.random() * 16777215).toString(16),
        }

        const shapes = Array.from(
            { length: 2 },
            () => `
      <circle cx='${Math.floor(Math.random() * 1200)}' cy='${Math.floor(Math.random() * 800)}' r='${Math.floor(Math.random() * 100)}' fill='#ffffff' opacity='0.1'>
        <animate attributeName='r' values='${Array.from({ length: 2 }, () => Math.floor(Math.random() * 100)).join(';')}' dur='${Math.floor(Math.random() * 10 + 1)}s' repeatCount='indefinite' />
      </circle>
      <rect x='${Math.floor(Math.random() * 1200)}' y='${Math.floor(Math.random() * 800)}' width='${Math.floor(Math.random() * 200)}' height='${Math.floor(Math.random() * 200)}' fill='#ffffff' opacity='0.1'>
        <animate attributeName='width' values='${Array.from({ length: 2 }, () => Math.floor(Math.random() * 200)).join(';')}' dur='${Math.floor(Math.random() * 10 + 1)}s' repeatCount='indefinite' />
        <animate attributeName='height' values='${Array.from({ length: 2 }, () => Math.floor(Math.random() * 200)).join(';')}' dur='${Math.floor(Math.random() * 10 + 1)}s' repeatCount='indefinite' />
      </rect>
    `
        ).join('')

        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='600' y1='0' x2='600' y2='800'%3E%3Cstop offset='0' stop-color='%23${gradientColors.start}'/%3E%3Cstop offset='1' stop-color='%23${gradientColors.end}'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1200' height='800'/%3E%3Cg%3E${shapes}%3C/g%3E%3C/svg%3E`
    }

    return (
        <div
            className="absolute inset-0 z-0"
            style={{ backgroundImage: `url("${generateSVG()}")` }}
        />
    )
}

export default AnimatedBackground
