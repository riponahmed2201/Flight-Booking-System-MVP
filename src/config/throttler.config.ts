import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const throttlerConfig: ThrottlerModuleOptions = [
    {
        ttl: 60000, // 60 seconds
        limit: 10, // 10 requests per ttl
    },
];
