import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// @ts-ignore
import { handleReservationRequest } from './server/reservationHandler.js'

function reservationApiPlugin(): Plugin {
  const attachMiddleware = (middlewares: any) => {
    middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url === '/api/health' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            status: 'ok',
            service: 'Cafe Cue & Brew Booking API',
            bookingRecipient: process.env.BOOKING_TO_EMAIL || 'shivsaai2010@gmail.com',
            resendConfigured: Boolean(
              process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.startsWith('re_')
            ),
          })
        );
        return;
      }

      if (req.url === '/api/reservations' && req.method === 'POST') {
        let bodyStr = '';
        req.on('data', (chunk: any) => {
          bodyStr += chunk;
        });
        req.on('end', async () => {
          try {
            const body = JSON.parse(bodyStr || '{}');
            const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
            const result = await handleReservationRequest(body, String(clientIp));
            res.statusCode = result.statusCode;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result.body));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err?.message || 'Server error' }));
          }
        });
        return;
      }

      next();
    });
  };

  return {
    name: 'reservation-api-middleware',
    configureServer(server) {
      attachMiddleware(server.middlewares);
    },
    configurePreviewServer(server) {
      attachMiddleware(server.middlewares);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    reservationApiPlugin(),
  ],
})
