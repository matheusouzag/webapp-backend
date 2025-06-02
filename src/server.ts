import app from './app';
import { AppDataSource } from './database/data-source';

export async function startServer() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('Data Source inicializado!');
    }
    const PORT = process.env.PORT || 3001;
    const server = app.listen(PORT, () => {
      console.log(`Rodando em: http://localhost:${PORT}`);
    });
    return server;
  } catch (error) {
    console.error('Erro ao inicializar Data Source:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}
