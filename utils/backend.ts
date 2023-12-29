// utils/backend.ts
const singleton = Symbol.for("singleton");

export function useService<T>(
  ctor: (new () => T) & {
    [singleton]?: T;
  }
): T {
  if (!ctor[singleton]) {
    ctor[singleton] = new ctor();
  }

  return ctor[singleton];
}
