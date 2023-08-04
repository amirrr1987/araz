const memoization = <T extends (...args: any[]) => any>(
    func: T
  ): T & { memoizedFunction: T } => {
    const cache: Map<string, ReturnType<T>> = new Map();
  
    const memoizedFunction = (...args: Parameters<T>): ReturnType<T> => {
      const key = JSON.stringify(args);
  
      if (cache.has(key)) {
        return cache.get(key)!;
      }
  
      const result = func(...args);
      cache.set(key, result);
      return result;
    };
  
    return Object.assign(memoizedFunction, { memoizedFunction }) as T & {
      memoizedFunction: T;
    };
  };
export default memoization  