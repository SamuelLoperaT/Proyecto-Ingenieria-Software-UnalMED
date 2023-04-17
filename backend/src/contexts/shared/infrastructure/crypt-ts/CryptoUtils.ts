import { enc, SHA256 } from 'crypto-js';

export abstract class CryptoUtils {
  static async hash(
    data: { toString(): string },
    encType: 'Utf8' | 'Hex' = 'Hex',
    ...salt: Array<{ toString(): string }>
  ): Promise<string> {
    return SHA256(
      data.toString() + salt.map((e) => e.toString()).join(''),
    ).toString(enc[encType]);
  }
}
