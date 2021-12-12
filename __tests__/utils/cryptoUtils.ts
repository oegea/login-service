// Core dependencies
import crypto from 'crypto';

// Utils
import CryptoUtils from '../../src/utils/cryptoUtils';

describe('CryptoUtils class tests', () => {
  let cryptoUtils: CryptoUtils;

  beforeAll(() => {
    cryptoUtils = new CryptoUtils();
  });

  describe('generateSalt method tests', () => {
    it('should successfully generate a salt', () => {
      const salt = cryptoUtils.generateSalt();
      expect(salt).not.toBeUndefined();
      expect(typeof salt).toBe('string');
      expect(salt.length).toBeGreaterThan(0);
    });
  });

  describe('generateRandomNumber method tests', () => {
    it('should generate a number between 1 and 2', () => {
      const randomNumber = cryptoUtils.generateRandomNumber(1, 2);
      expect(randomNumber).not.toBeUndefined();
      expect(typeof randomNumber).toBe('number');
      expect(randomNumber).toBeGreaterThanOrEqual(1);
      expect(randomNumber).toBeLessThanOrEqual(2);
    });

    it('should generate a number between 10 and 100', () => {
      const randomNumber = cryptoUtils.generateRandomNumber(10, 100);
      expect(randomNumber).not.toBeUndefined();
      expect(typeof randomNumber).toBe('number');
      expect(randomNumber).toBeGreaterThanOrEqual(10);
      expect(randomNumber).toBeLessThanOrEqual(100);
    });
  });

  describe('generatePasswordHash method tests', () => {
    it('should successfully hash a password', async () => {
      const PASSWORD = 'TestingPassword';
      const salt = cryptoUtils.generateSalt();
      const passwordHash = await cryptoUtils.generatePasswordHash(PASSWORD, salt);

      expect(passwordHash).not.toBeUndefined();
      expect(typeof passwordHash).toBe('string');
      expect(passwordHash.length).toBeGreaterThan(0);
    });

    it('should successfully compare two hashes with same password and salt', async () => {
      const PASSWORD = 'TestingPassword';
      const salt = cryptoUtils.generateSalt();
      const firstHash = await cryptoUtils.generatePasswordHash(PASSWORD, salt);
      const secondHash = await cryptoUtils.generatePasswordHash(PASSWORD, salt);
      expect(firstHash).toBe(secondHash);
    });

    it('should produce an exception if the hash fails', async () => {
      const spy = jest.spyOn(crypto, 'pbkdf2').mockImplementation((password, salt, iterations, keylen, algorithm, callback) => {
        callback({ message: 'Error', name: 'Test Error' }, null);
      });

      const PASSWORD = 'TestingPassword';
      const salt = cryptoUtils.generateSalt();

      const promiseResult = cryptoUtils.generatePasswordHash(PASSWORD, salt);
      await expect(promiseResult).rejects.not.toBe(undefined);
      await expect(promiseResult).rejects.toHaveProperty('message');
      await expect(promiseResult).rejects.toHaveProperty('name');

      spy.mockReset();
    });
  });
});
