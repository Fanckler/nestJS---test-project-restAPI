import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/entities/user.entity';
import { Model } from "mongoose";
import { JwtService } from '@nestjs/jwt';
import { decode } from 'js-base64';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<User>,
    private readonly jwtService: JwtService
  ) {}

  signIn(password: string, email: string) {
    const payload = { password, email };
    return this.jwtService.sign(payload);
  }

  validate(token: string): boolean {
    try {
      this.jwtService.verify(token, {secret: 'secretKey'})
      return true
    } catch (e) {
      return false
    }
  }

  async validateUser({auth}: any): Promise<any> {
    // ewoJImVtYWlsIjogImpkb2VAZXhhbXBsZS5jb20iLAoJInBhc3MiOiAiYWIxMjM0NUNkIgp9
    const {email, pass} = JSON.parse(decode(auth));
    const user = await this.usersModel.findOne({email: email});
    if (user && user.password === pass) {
      const { password, email: userEmail } = user;

      return this.signIn(password, userEmail)
    }
    return null;
  }
}
