import {
  catchError,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
  race,
} from "rxjs";
import { fromFetch } from "rxjs/fetch";

/**
 * 兼容 v2 接口，获取内存使用情况
 * @returns {Observable<{ free: number; usage: number }>}
 */
function getMemoryLegacy(): Observable<{ free: number; usage: number }> {
  const legacyUsage = fromFetch("/api/v2/memory/usage").pipe(
    mergeMap((res) => res.json())
  );
  const legacyFree = fromFetch("/api/v2/memory/free").pipe(
    mergeMap((res) => res.json())
  );
  return forkJoin([legacyUsage, legacyFree], (usage, free) => ({
    free: free.data.free,
    usage: usage.data.usage,
  }));
}

/**
 * 请求 v3 接口，获取内存使用情况
 * @returns {Observable<{ free: number; usage: number }>}
 */
function getMemory(): Observable<{ free: number; usage: number }> {
  const current = fromFetch("/api/v3/memory").pipe(
    mergeMap((res) => res.json()),
    map((data) => data.data)
  );
  return race(getMemoryLegacy(), current).pipe(
    catchError(() => of({ usage: 0, free: 0 }))
  );
}

/**
 * 获取未使用内存
 * @returns {Observable<number>}
 */
function getMemoryFree(): Observable<number> {
  return getMemory().pipe(map((data) => data.free));
}

/**
 * 获取已使用内存
 * @returns {Observable<number>}
 */
function getMemoryUsage(): Observable<number> {
  return getMemory().pipe(map((data) => data.usage));
}

/**
 * 获取内存占用率
 * @returns {Observable<number>}
 */
function getMemoryUsagePercent(): Observable<number> {
  return getMemory().pipe(
    map(({ usage, free }) => +((usage / (usage + free)) * 100).toFixed(2) || 0)
  );
}

export { getMemoryFree, getMemoryUsage, getMemoryUsagePercent };
