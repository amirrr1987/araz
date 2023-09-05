import { ReactiveObject, Reactive, Ref } from "./types";

/**
 * Creates a reactive reference for a value of type `T`. The reference allows you to
 * read and update the value in a way that can be observed and trigger reactions.
 *
 * @param value - The initial value for the reference.
 * @returns A reactive reference for the specified value.
 *
 * @template T - The type of the value.
 */
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

/**
 * Creates a reactive proxy for an object.
 *
 * @template T - The type of the object to make reactive.
 * @param {T} obj - The object to make reactive.
 * @returns {Reactive<T>} - A reactive proxy of the input object.
 */
export const reactive = <T extends ReactiveObject<any>>(
  obj: T
): Reactive<T> => {
  const proxy = new Proxy(obj, {
    get(target, key) {
      return target[key as keyof T];
    },
    set(target, key, value) {
      target[key as keyof T] = value;
      return true;
    },
  });

  return proxy as Reactive<T>;
};
