import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// @ts-expect-error ESM server handler module
import { handleTutorRequest } from './server/tutorHandler.mjs';

function tutorApiPlugin(): Plugin {
  const attachMiddleware = (middlewares: {
    use: (fn: (req: unknown, res: unknown, next: () => void) => void) => void;
  }) => {
    middlewares.use((req, res, next) => {
      const url = ((req as { url?: string }).url || '').split('?')[0];
      if (url === '/api/tutor' || url === '/api/tutor/status') {
        void handleTutorRequest(req, res);
        return;
      }
      next();
    });
  };

  return {
    name: 'coa-tutor-api',
    configureServer(server) {
      attachMiddleware(server.middlewares);
    },
    configurePreviewServer(server) {
      attachMiddleware(server.middlewares);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), tutorApiPlugin()],
});
