import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KENLESS | Meet Your Goals',
  description: 'KENLESS - Marca de ropa streetwear exclusiva que fusiona el estilo urbano con la alta calidad. Diseños únicos que reflejan la cultura street y la autenticidad.',
  keywords: [
    'kenless',
    'streetwear',
    'ropa urbana',
    'moda street',
    'ropa exclusiva',
    'meet your goals',
    'marca de ropa',
    'estilo urbano',
    'diseños únicos',
    'cultura street',
    'moda juvenil',
    'ropa de calidad'
  ],
  openGraph: {
    title: 'KENLESS | Meet Your Goals',
    description: 'KENLESS - Marca de ropa streetwear exclusiva que fusiona el estilo urbano con la alta calidad.',
    url: 'https://kenless.es',
    siteName: 'KENLESS',
    images: [
      {
        url: '/kenless.png',
        width: 800,
        height: 600,
        alt: 'KENLESS Logo'
      }
    ],
    locale: 'es_ES',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KENLESS | Meet Your Goals',
    description: 'KENLESS - Marca de ropa streetwear exclusiva que fusiona el estilo urbano con la alta calidad.',
    images: ['/logokenlessnew.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'uBV55nN9fShbQQ10gZ1ZtMWQXlRX1mT5E20IyXQzr7M'
  },
  alternates: {
    canonical: 'https://kenless.es'
  }
}; 