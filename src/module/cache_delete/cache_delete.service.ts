import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheDeleteService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async clearCache(route: string) {
    const keys: string[] = await this.cacheManager.store.keys();
    const controllerPattern = new RegExp(`^/${route}/`);
    const controllerKeys = keys.filter((key) => controllerPattern.test(key));
    await Promise.all(controllerKeys.map((key) => this.cacheManager.del(key)));
  }
}
