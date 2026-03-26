/**
 * Este archivo actúa como un puente seguro.
 * Vercel ejecuta esto en el servidor, lee las variables de entorno
 * y le entrega al navegador la configuración necesaria.
 */
export default function handler(request, response) {
  try {
    // 1. Verificación y limpieza extrema de variables de entorno
    // .trim() quita espacios. .replace quita comillas accidentales si las hubiera.
    const rawApiKey = process.env.FIREBASE_API_KEY || "";
    const rawMasterPassword = process.env.MASTER_PASSWORD || "";

    const apiKey = rawApiKey.trim().replace(/['"]+/g, '');
    const masterPassword = rawMasterPassword.trim().replace(/['"]+/g, '');

    // Log interno para depuración en Vercel (no se ve en el navegador)
    console.log("Intentando servir configuración de Firebase...");

    if (!apiKey || !masterPassword) {
      return response.status(500).json({ 
        error: 'Variables de entorno faltantes.',
        details: 'Configura FIREBASE_API_KEY y MASTER_PASSWORD en el panel de Vercel.' 
      });
    }

    // 2. Objeto de configuración que se enviará al frontend
    const config = {
      apiKey: apiKey, 
      authDomain: "torneo-interclases.firebaseapp.com",
      projectId: "torneo-interclases",
      storageBucket: "torneo-interclases.firebasestorage.app",
      messagingSenderId: "676891636137",
      appId: "1:676891636137:web:06562e91b7680ad7ad54b8",
      masterPassword: masterPassword
    };

    // 3. Cabeceras para evitar caché y asegurar JSON
    // Esto previene el error 304 y obliga al navegador a pedir datos frescos
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.setHeader('Pragma', 'no-cache');
    response.setHeader('Expires', '0');
    
    return response.status(200).json(config);

  } catch (error) {
    console.error("Error en get-config:", error);
    return response.status(500).json({ error: 'Error interno', message: error.message });
  }
}