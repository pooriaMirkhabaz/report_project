import { NestFactory } from '@nestjs/core';
import { SwaggerConfigInit } from 'src/configs/swagger.config';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global configs
  app.setGlobalPrefix("api")
  app.useGlobalPipes(new ValidationPipe())
  const port = process.env.APP_PORT as number;
  const appName = process.env.APP_NAME as string;
  SwaggerConfigInit(app)
  
  await app.listen(port, ()=>{
    console.log(`*** ${appName} running on port: ${port} ***`)
  });
}
bootstrap();
