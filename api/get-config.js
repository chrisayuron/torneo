/**
 * Servidor de configuración para el Torneo Beth Shalom.
 * Diagnóstico de variables de entorno.
 */
export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  // Nombres esperados en Vercel
  const KEY_NAME = "FIREBASE_API_KEY";
  const PASS_NAME = "MASTER_PASSWORD";

  const apiKey = process.env[KEY_NAME];
  const masterPass = process.env[PASS_NAME];

  // Si faltan, informamos específicamente cuál falta
  if (!apiKey || !masterPass) {
    return res.status(200).json({
      error: true,
      message: `Falta configuración: ${!apiKey ? KEY_NAME : ''} ${!masterPass ? PASS_NAME : ''}`,
      status: "missing_env"
    });
  }

  return res.status(200).json({
    apiKey: apiKey.trim().replace(/['"]+/g, ''),
    authDomain: "torneo-interclases.firebaseapp.com",
    projectId: "torneo-interclases",
    storageBucket: "torneo-interclases.firebasestorage.app",
    messagingSenderId: "676891636137",
    appId: "1:676891636137:web:06562e91b7680ad7ad54b8",
    masterPassword: masterPass.trim().replace(/['"]+/g, ''),
    status: "ready"
  });
}