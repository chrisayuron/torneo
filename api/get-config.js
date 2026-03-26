/**
 * Este archivo actúa como un puente seguro entre las variables de entorno de Vercel
 * y el frontend de la aplicación.
 */
export default function handler(request, response) {
  try {
    // 1. Obtención y limpieza de variables de entorno
    const rawApiKey = process.eanv.FIREBASE_API_KEY || "";
    const rawMasterPassword = process.env.MASTER_PASSWORD || "";

    // Eliminamos posibles espacios o comillas accidentales
    const apiKey = rawApiKey.trim().replace(/['"]+/g, '');
    const masterPassword = rawMasterPassword.trim().replace(/['"]+/g, '');

    // Log para depuración en el panel de Vercel (no visible para el usuario final)
    console.log("Iniciando solicitud de configuración...");

    // 2. Validación de presencia de datos críticos
    if (!apiKey) {
      console.error("Falta FIREBASE_API_KEY en las variables de entorno.");
      return response.status(500).json({ 
        error: 'Configuración incompleta', 
        details: 'Falta la API Key en el servidor.' 
      });
    }

    if (!masterPassword) {
      console.error("Falta MASTER_PASSWORD en las variables de entorno.");
      return response.status(500).json({ 
        error: 'Configuración incompleta', 
        details: 'Falta la contraseña maestra en el servidor.' 
      });
    }

    // 3. Objeto de configuración de Firebase
    const config = {
      apiKey: apiKey,
      authDomain: "torneo-interclases.firebaseapp.com",
      projectId: "torneo-interclases",
      storageBucket: "torneo-interclases.firebasestorage.app",
      messagingSenderId: "676891636137",
      appId: "1:676891636137:web:06562e91b7680ad7ad54b8",
      masterPassword: masterPassword
    };

    // 4. Configuración de cabeceras para prevenir redirecciones (302) y caché (304)
    // Forzamos al navegador a obtener siempre una respuesta nueva en formato JSON
    response.setHeader('Access-Control-Allow-Origin', '*'); // Permite peticiones desde cualquier origen si fuera necesario
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.setHeader('Pragma', 'no-cache');
    response.setHeader('Expires', '0');

    console.log("Configuración enviada correctamente.");
    return response.status(200).json(config);

  } catch (error) {
    console.error("Error crítico en get-config:", error.message);
    return response.status(500).json({ 
      error: 'Error interno del servidor', 
      message: error.message 
    });
  }
}