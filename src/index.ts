import createServer from '@app/server';
import app from '@app/app';

async function main(): Promise<void> {
  const server = createServer(app);
  server.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}

(async () => await main())();