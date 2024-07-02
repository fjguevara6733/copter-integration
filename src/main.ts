import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;
  const globalPrefix = 'api';

  const config = new DocumentBuilder()
    .setTitle('Chronos Prestamos')
    .setDescription('The chronos prestamos API description')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port, () => {
    //Logger.log('  Listening at http://localhost:' + port + '/' + globalPrefix);
    Logger.log(
      `🚀🚀Application is running on: http://localhost:${port}/${globalPrefix}`,
    );
  });
}
bootstrap();
