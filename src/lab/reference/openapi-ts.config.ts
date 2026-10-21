import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './openapispecs/library.json',
  output: [
    {
      path: 'app/src/areas/shared/api/',
    },
  ],
});
