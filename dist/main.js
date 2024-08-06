"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 4000;
    const globalPrefix = 'api';
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Chronos Prestamos')
        .setDescription('The chronos prestamos API description')
        .setVersion('1.0')
        .addTag('api')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(port, () => {
        common_1.Logger.log(`🚀🚀Application is running on: http://localhost:${port}/${globalPrefix}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map