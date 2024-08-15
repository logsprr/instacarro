import { Transform } from 'class-transformer';
import { ObjectId } from 'mongodb';

const valueToObjectId = (value: any) => {
  if (typeof value !== 'string') {
    return undefined;
  }

  return new ObjectId(value);
};

export const ToObjectId = () => {
  const toPlain = Transform(({ value }) => value, {
    toPlainOnly: true,
  });

  const toClass = (target: any, key: string) =>
    Transform(({ obj }) => valueToObjectId(obj[key]), {
      toClassOnly: true,
    })(target, key);

  return (target: any, key: string) => {
    toPlain(target, key);
    toClass(target, key);
  };
};
