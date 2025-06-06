import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class CloudinaryService implements OnModuleInit {
    private readonly configService;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    uploadImage(file: string): Promise<string>;
}
