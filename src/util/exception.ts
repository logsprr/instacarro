import { NotFoundException } from '@nestjs/common';

export async function findOrThrow<I, T>(
  id: I,
  fn: (id: I) => PromiseLike<T>,
  errFn = (): Error => new NotFoundException(`No item found with resource ${id}`),
): Promise<T> {
  const result = await fn(id);

  if (!result) {
    throw errFn();
  }

  return result;
}
