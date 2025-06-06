// guards/admin.guard.ts
import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
  } from '@nestjs/common';
  
  @Injectable()
  export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      if (user.admin) {
        return true;
      }
  
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }