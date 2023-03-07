import swaggerJsdoc from 'swagger-jsdoc';
import express from 'express';
import { serve, setup } from 'swagger-ui-express';

const router = express.Router();

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Dojo Wall',
      version: '0.0.1',
    },
    servers: [
      { url: 'https://api.progdojo.link' },
    ],
  },
  apis: ['./src/swagger.yaml'],
};

// customCss: '.try-out { display: none }',
router.use('/', serve, setup(swaggerJsdoc(options), { swaggerOptions: { supportedSubmitMethods: ['get'] } }));

export default router;
