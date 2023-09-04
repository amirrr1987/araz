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
        console.log("Value changed:", value);
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

export const reactive = <T>(obj: T): ReactiveObject<T> => {
  const reactiveObject = {} as ReactiveObject<T>;

  for (const key in obj) {
    if (obj[key]) {
      reactiveObject[key] = ref(obj[key]);
    }
  }

  const proxy: ProxyHandler<ReactiveObject<T>> = {
    get(target, key) {
      if (key in target) {
        return target[key].value;
      }
    },
    set(target, key, value) {
      if (key in target) {
        target[key].value = value;
        console.log(`Value changed for ${String(key)}:`, value);
        return true;
      }
      return false;
    },
  };

  return new Proxy(reactiveObject, proxy);
};
