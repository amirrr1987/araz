type Ref<T> = {
  value: T;
};

export const ref = <T>(value: T): Ref<T> => {
  const reactiveObject: { value: T } = {
    value,
  };

  const proxy: ProxyHandler<typeof reactiveObject> = {
    get(target: typeof reactiveObject, key: string | symbol) {
      if (key === "value") {
        return target[key];
      }
      return false;
    },
    set(
      target: typeof reactiveObject,
      key: string | symbol,
      value: T
    ): boolean {
      if (key === "value") {
        target[key] = value;
        return true;
      }
      return false;
    },
  };

  return new Proxy(reactiveObject, proxy);
};

type ReactiveObject<T> = {
  [K in keyof T]: Ref<T[K]>;
};

export const reactive = <T extends Record<string, any>>(
  obj: T
): ReactiveObject<T> => {
  const reactiveObject = {} as ReactiveObject<T>;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      reactiveObject[key as keyof T] = ref(obj[key]);
    }
  }

  const proxy: ProxyHandler<ReactiveObject<T>> = {
    get(target, key) {
      if (key in target) {
        return target[key as keyof T].value;
      }
    },
    set(target, key, value) {
      if (key in target) {
        target[key as keyof T].value = value;
        return true;
      }
      return false;
    },
  };

  return new Proxy(reactiveObject, proxy);
};
