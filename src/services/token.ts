import { autoInjectable } from 'tsyringe';
import speakeasy from '@levminer/speakeasy';
import jwt, { Secret, SignOptions, JwtPayload } from 'jsonwebtoken';

@autoInjectable()
class TokenService {
  sign(payload: any, secret?: Secret | null, options?: SignOptions) {
    return jwt.sign(payload, secret || process.env.JWT_SECRET as string, options || { expiresIn: '1d' });
  }

  verify(token: string, secret?: Secret): Promise<JwtPayload> { 
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret || process.env.JWT_SECRET as string, (err, res) => { 
        if (err) return reject(err);
        return resolve(res as JwtPayload);
      });
    });
  }

  gen2FaSecret() {
    const secret = speakeasy.generateSecret();
    return {
      secret: secret.base32,
      otpauthUrl: speakeasy.otpauthURL({
        secret: secret.ascii,
        label: process.env.TWOFA_LABEL as string,
        algorithm: "sha1",
      })
    };
  }

  verify2Fa(token: string, secret: string): boolean { 
    return speakeasy.totp.verify({
      secret, token,
      encoding: "base32"
    });
  }
}

export default TokenService;