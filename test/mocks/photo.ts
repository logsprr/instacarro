import { IPhoto } from '@app/interfaces';
import { Types } from 'mongoose';
import { defaultId } from './default';

export const mockPhotoData: IPhoto = {
  external: [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSHTYl9lWSVthJe3JeOl-0gHMS0FqIBq_gLw&s',
  ],
  internal: ['https://p2.trrsf.com/image/fget/cf/940/0/images.terra.com/2021/09/13/tcross.png'],
  engine: [
    'https://quatrorodas.abril.com.br/wp-content/uploads/2019/03/motor-vw-t-cross.jpg?quality=70&strip=info',
  ],
  details: [],
  user: new Types.ObjectId(defaultId),
  car: new Types.ObjectId(defaultId),
};
