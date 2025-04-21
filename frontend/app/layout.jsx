// app/layout.jsx

import './globals.css';

export const metadata = {
  title: 'Sensor Dashboard',
  description: 'Proyecto de sensores con MQTT y Cassandra',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
