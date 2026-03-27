/**
 * Servidor de configuración para el proyecto Mundialito.
 * Lee las variables de entorno de Vercel.
 */
export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  
  // Nombres de variables en Vercel
  const apiKey = process.env.FIREBASE_API_KEY;
  const masterPass = process.env.MASTER_PASSWORD;

  if (!apiKey || !masterPass) {
    return res.status(200).json({
      error: true,
      message: "Faltan variables en Vercel (FIREBASE_API_KEY o MASTER_PASSWORD)."
    });
  }

  // CONFIGURACIÓN ACTUALIZADA CON TUS DATOS DE MUNDIALITO
  return res.status(200).json({
    apiKey: apiKey.trim(),
    authDomain: "mundialito-7ed91.firebaseapp.com",
    projectId: "mundialito-7ed91",
    storageBucket: "mundialito-7ed91.firebasestorage.app",
    messagingSenderId: "104814323684",
    appId: "1:104814323684:web:9d00ea4cf5a513cb73c9f1",
    masterPassword: masterPass.trim()
  });
}