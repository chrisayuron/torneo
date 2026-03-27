/**
 * Servidor de configuración para el Torneo Beth Shalom.
 * Versión ultra-simplificada para evitar Error 500.
 */
export default function handler(req, res) {
  // Cabeceras obligatorias para evitar caché y errores 304/302
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    // 1. Obtener variables directamente del entorno de Vercel
    const apiKey = process.env.FIREBASE_API_KEY || "";
    const masterPass = process.env.MASTER_PASSWORD || "";

    // 2. Si faltan variables, enviamos un 200 con el aviso detallado para el frontend
    if (!apiKey || !masterPass) {
      return res.status(200).json({
        error: true,
        message: "Configuración incompleta en Vercel.",
        missingKey: !apiKey,
        missingPass: !masterPass
      });
    }

    // 3. Respuesta exitosa con los datos necesarios para inicializar Firebase
    return res.status(200).json({
      apiKey: apiKey.trim().replace(/['"]+/g, ''),
      authDomain: "torneo-interclases.firebaseapp.com",
      projectId: "torneo-interclases",
      storageBucket: "torneo-interclases.firebasestorage.app",
      messagingSenderId: "676891636137",
      appId: "1:676891636137:web:06562e91b7680ad7ad54b8",
      masterPassword: masterPass.trim().replace(/['"]+/g, ''),
      status: "online"
    });

  } catch (error) {
    // Manejo de excepciones catastróficas enviando JSON limpio
    return res.status(200).json({
      error: true,
      message: error.message
    });
  }
}