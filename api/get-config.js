// api/get-config.js
// Endpoint serverless para entregar SOLO la configuración pública de Firebase
// ⚠️ NO incluir secretos (contraseñas, claves privadas, Admin SDK, etc.)

export default function handler(req, res) {
  // Validación básica: asegúrate de que las variables existen en Vercel
  if (!process.env.FIREBASE_API_KEY || !process.env.FIREBASE_PROJECT_ID) {
    return res.status(500).json({
      error: "Faltan variables de entorno en el servidor (Vercel)."
    });
  }

  // Configuración pública de Firebase (segura de exponer)
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };

  return res.status(200).json(config);
}
