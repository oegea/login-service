import IEmailUtils from '../interfaces/IEmailUtils';

class EmailUtils implements IEmailUtils {
  // Regular expression to check if an e-mail is valid
  private VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  /**
  * Checks if an e-mail has a valid format
  * @param email E-mail to check
  */
  isValidEmail(email: string) {
    return (email.match(this.VALID_EMAIL_REGEX) !== null);
  }
}

export default EmailUtils;
