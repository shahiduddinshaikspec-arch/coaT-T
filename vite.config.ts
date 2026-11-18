import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// @ts-expect-error ESM server handler module
import { handleTutorRequest } from './server/tutorHandler.mjs';
// @ts-expect-error ESM server handler module
import { handleSyncRequest } from './server/syncHandler.mjs';

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
      if (url === '/api/sync') {
        void handleSyncRequest(req, res);
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
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          if (id.includes('/src/data/questions')) {
            return 'data-questions';
          }
          if (id.includes('/src/data/lessons') || id.includes('/src/data/simpleLessons')) {
            return 'data-lessons';
          }
          if (id.includes('/src/data/numericals') || id.includes('/src/data/glossary')) {
            return 'data-reference';
          }
        },
      },
    },
  },
});
