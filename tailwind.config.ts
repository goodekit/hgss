import type { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './component/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  prefix: '',
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'var(--popover)',
  				foreground: 'var(--popover-foreground)'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			white: {
  				DEFAULT: 'var(--white)',
  				foreground: 'hsl(var(--white-foreground))'
  			},
  			black: {
  				DEFAULT: 'var(--black)',
  				foreground: 'hsl(var(--black-foreground))'
  			},
  			tape: {
				DEFAULT   : 'var(--tape)',
				foreground: 'var(--black)'
  			},
  			punk: {
				DEFAULT   : 'var(--punk)',
				foreground: 'var(--black)'
  			},
			punkpink: {
				DEFAULT   : 'var(--punkpink)',
				foreground: 'var(--black)'
			},
			border: 'hsl(var(--border))',
			input : 'hsl(var(--input))',
			ring  : 'hsl(var(--ring))',
			chart : {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
			xs: 'calc(var(--radius) - 6px)'
  		},
  		keyframes: {
  			shuffle1: {
  				'0%, 100%': {
  					transform: 'translate(0, 0) rotate(0deg)'
  				},
  				'50%': {
  					transform: 'translate(80px, 80px) rotate(180deg)'
  				}
  			},
  			shuffle2: {
  				'0%, 100%': {
  					transform: 'translate(80px, 0) rotate(0deg)'
  				},
  				'50%': {
  					transform: 'translate(0, 80px) rotate(-180deg)'
  				}
  			},
  			shuffle3: {
  				'0%, 100%': {
  					transform: 'translate(0, 80px) rotate(0deg)'
  				},
  				'50%': {
  					transform: 'translate(80px, 0) rotate(-180deg)'
  				}
  			},
  			shuffle4: {
  				'0%, 100%': {
  					transform: 'translate(80px, 80px) rotate(0deg)'
  				},
  				'50%': {
  					transform: 'translate(0, 0) rotate(180deg)'
  				}
  			},
  			wave: {
  				'0%, 100%': {
  					transform: 'rotate(0deg)'
  				},
  				'25%': {
  					transform: 'rotate(-15deg)'
  				},
  				'75%': {
  					transform: 'rotate(15deg)'
  				}
  			}
  		},
  		animation: {
  			shuffle1: 'shuffle1 2s ease-in-out infinite',
  			shuffle2: 'shuffle2 2s ease-in-out infinite',
  			shuffle3: 'shuffle3 2s ease-in-out infinite',
  			shuffle4: 'shuffle4 2s ease-in-out infinite',
  			wave: 'wave 1.5s ease-in-out infinite'
  		}
  	}
  },
  plugins: [tailwindAnimate]
} satisfies Config

export default config
