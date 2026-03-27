/**
 * Servidor de configuración para el proyecto Mundialito.
 * Estructura: raíz/api/get-config.js
 */
export default function handler(req, res) {
  // Cabeceras CORS estándar para funciones de Vercel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const apiKey = process.env.FIREBASE_API_KEY;
  const masterPass = process.env.MASTER_PASSWORD;

  if (!apiKey || !masterPass) {
    return res.status(200).json({
      error: true,
      message: "Variables de entorno no encontradas en Vercel."
    });
  }

  // Limpieza de datos y respuesta con los IDs del proyecto mundialito-7ed91
  return res.status(200).json({
    apiKey: apiKey.replace(/['"]+/g, '').trim(),
    authDomain: "mundialito-7ed91.firebaseapp.com",
    projectId: "mundialito-7ed91",
    storageBucket: "mundialito-7ed91.firebasestorage.app",
    messagingSenderId: "104814323684",
    appId: "1:104814323684:web:9d00ea4cf5a513cb73c9f1",
    masterPassword: masterPass.replace(/['"]+/g, '').trim()
  });
}