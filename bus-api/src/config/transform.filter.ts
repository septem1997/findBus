import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Response<T> {
  data: T;
}

// @Injectable()
// export class TransformInterceptor<T>
//   implements NestInterceptor<T, Response<T>>
// {
//   intercept(
//     context: ExecutionContext,
//     next: CallHandler<T>,
//   ): Observable<Response<T>> {
//     return next.handle().pipe(
//       map((data) => {
//         if (data.code && data.msg) {
//           return data;
//         } else {
//           return {
//             data,
//             code: 0,
//             msg: '请求成功',
//           };
//         }
//       }),
//     );
//   }
// }