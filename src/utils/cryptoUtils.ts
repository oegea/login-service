// Core dependencies
import crypto from 'crypto';

// Interfaces
import ICryptoUtils from '../interfaces/ICryptoUtils';

/* eslint class-methods-use-this: 0 */
class CryptoUtils implements ICryptoUtils {
  private DEFAULT_SALT_SIZE = 128;

  private DEFAULT_ITERATIONS = 1000;

  private DEFAULT_KEYLEN = 64;

  private HASH_ALGORITHM = 'sha512';

  /**
   * Generates salt to hash a password
   * @param size Length of the salt
   * @returns Generated salt
   */
  public generateSalt(size: number = this.DEFAULT_SALT_SIZE) {
    return crypto.randomBytes(size).toString('base64');
  }

  /**
   * Hashes a password using the specified salt
   * @param password Password to hash
   * @param salt Salt to apply before hashing
   * @returns Generated hash
   */
  public generatePasswordHash(password: string, salt: string) {
    const promise = new Promise<string>((resolve, reject) => {
      crypto.pbkdf2(
        password,
        salt,
        this.DEFAULT_ITERATIONS,
        this.DEFAULT_KEYLEN,
        this.HASH_ALGORITHM,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.toString('hex'));
          }
        },
      );
    });
    return promise;
  }

  /**
   * Generates a random number between the minimum and maximum specified
   * @param min Minimum number
   * @param max Maximum number
   * @returns Random number
   */
  generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default CryptoUtils;
