interface ICryptoUtils {
    /**
     * Generates salt to hash a password
     * @param size Length of the salt
     * @returns Generated salt
     */
     generateSalt(size?: number): string;

    /**
     * Hashes a password using the specified salt
     * @param password Password to hash
     * @param salt Salt to apply before hashing
     * @returns Generated hash
     */
    generatePasswordHash(password: string, salt: string): Promise<string>;
}

export default ICryptoUtils;
