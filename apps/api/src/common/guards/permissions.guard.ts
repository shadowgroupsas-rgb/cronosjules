import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermissions) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.role) return false;

    // Super admin bypass
    if (user.role.slug === 'super_admin') return true;

    // Check if role has all required permissions
    // This logic assumes user.role.permissions is array of strings
    const userPermissions = user.role.permissions || [];

    // Check if user has ALL required permissions (strict) or ANY (lenient). Usually strict for one decorator, multiple decorators is strict.
    return requiredPermissions.every((permission) => userPermissions.includes(permission));
  }
}
