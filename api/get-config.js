/**
 * Servidor de configuración para el proyecto Mundialito.
 * Lee las variables de entorno de Vercel y previene errores de formato.
 */
export default function handler(req, res) {
  // Evitar bloqueos de navegador (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
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

  // Limpiamos las variables: quita comillas dobles, simples y espacios accidentales
  const cleanApiKey = apiKey.replace(/['"]+/g, '').trim();
  const cleanPass = masterPass.replace(/['"]+/g, '').trim();

  // CONFIGURACIÓN ACTUALIZADA CON TUS DATOS DE MUNDIALITO
  return res.status(200).json({
    apiKey: cleanApiKey,
    authDomain: "mundialito-7ed91.firebaseapp.com",
    projectId: "mundialito-7ed91",
    storageBucket: "mundialito-7ed91.firebasestorage.app",
    messagingSenderId: "104814323684",
    appId: "1:104814323684:web:9d00ea4cf5a513cb73c9f1",
    masterPassword: cleanPass
  });
}