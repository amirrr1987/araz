import { ReactiveObject, ReactiveProxy, Ref } from "./types";

export const ref = <T>(value: T): Ref<T> => {
  const obj: { value: T } = {
    value,
  };

  const proxy = new Proxy(obj, {
    get(target, key) {
      return target[key as keyof typeof obj];
    },
    set(target, key, value) {
      target[key as keyof typeof obj] = value;
      return true;
    },
  });

  return proxy as Ref<T>;
};

export const reactive = <T extends ReactiveObject<any>>(
  obj: T
): ReactiveProxy<T> => {
  const proxy = new Proxy(obj, {
    get(target, key) {
      return target[key as keyof T];
    },
    set(target, key, value) {
      target[key as keyof T] = value;
      return true;
    },
  });

  return proxy as ReactiveProxy<T>;
};
