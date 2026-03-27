/**
 * Servidor de configuración para el proyecto Mundialito.
 * Versión robusta con manejo de errores para Vercel Functions.
 */
export default function handler(req, res) {
  // Habilitar CORS para evitar bloqueos del navegador
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const apiKey = process.env.FIREBASE_API_KEY;
    const masterPass = process.env.MASTER_PASSWORD;

    // Validación de variables de entorno
    if (!apiKey || !masterPass) {
      return res.status(200).json({
        error: true,
        details: "Faltan variables de entorno en Vercel",
        env_status: {
          has_api_key: !!apiKey,
          has_master_pass: !!masterPass
        }
      });
    }

    // Respuesta con los datos del proyecto mundialito-7ed91
    return res.status(200).json({
      apiKey: apiKey.replace(/['"]+/g, '').trim(),
      authDomain: "mundialito-7ed91.firebaseapp.com",
      projectId: "mundialito-7ed91",
      storageBucket: "mundialito-7ed91.firebasestorage.app",
      messagingSenderId: "104814323684",
      appId: "1:104814323684:web:9d00ea4cf5a513cb73c9f1",
      masterPassword: masterPass.replace(/['"]+/g, '').trim()
    });
  } catch (error) {
    // En caso de error crítico, enviamos el mensaje al cliente para depurar
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
      details: error.message
    });
  }
}