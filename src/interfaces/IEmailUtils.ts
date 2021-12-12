interface IEmailUtils {
    /**
     * Checks if an e-mail has a valid format
     * @param email E-mail to check
     */
    isValidEmail(email: string): boolean;

}
export default IEmailUtils;
