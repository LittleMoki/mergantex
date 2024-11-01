import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001', // Укажите порт, если сервер работает на нём
        pathname: '/uploads/**', // Разрешите доступ к файлам из этой директории
      },
      {
        protocol: 'http',
        hostname: '95.130.227.209',
        port: '3001', // Укажите порт, если сервер работает на нём
        pathname: '/uploads/**', // Разрешите доступ к файлам из этой директории
      },
    ],
  },
};

export default withNextIntl(nextConfig);
