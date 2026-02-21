import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // Return user without password
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role?.slug,
      permissions: user.role?.permissions,
    };

    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.refreshSecret'),
      expiresIn: this.configService.get('jwt.refreshExpiresIn'),
    });

    return {
      access_token: token,
      refresh_token: refreshToken,
      user,
    };
  }

  async refresh(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('jwt.refreshSecret'),
      });
      // In a real app, verify if refresh token is revoked or check user status again
      const user = await this.usersService.findOne(payload.email);
      if (!user) throw new UnauthorizedException();

      const newPayload = {
        sub: user.id,
        email: user.email,
        role: user.role?.slug,
        permissions: user.role?.permissions,
      };

      return {
        access_token: this.jwtService.sign(newPayload),
        // Optionally rotate refresh token
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(user: User) {
    // Invalidate refresh token logic if stored in DB
    return { success: true };
  }
}
