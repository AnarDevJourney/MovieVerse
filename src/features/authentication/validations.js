// Username validation
export function validateUsername(username) {
  // Regular expression to check if the username consists of only letters, numbers, underscores, and dashes,
  // and has a length between 3 and 16 characters.
  const regex = /^[a-zA-Z0-9_-]{3,16}$/;

  // Test the username against the regular expression
  return regex.test(username);
}

// Email validation
export function validateEmail(email) {
  // Regular expression for basic email validation
  // - ^[^\s@]+: starts with one or more characters that are not whitespace or '@'
  // - @: followed by an '@' symbol
  // - [^\s@]+: followed by one or more characters that are not whitespace or '@'
  // - \.: followed by a literal '.' symbol
  // - [^\s@]+: followed by one or more characters that are not whitespace or '@'
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regular expression
  return regex.test(email);
}

//Password validation
export function validatePassword(password) {
  // Regular expression for password validation:
  // - At least 8 characters
  // - At least one uppercase letter
  // - At least one lowercase letter
  // - At least one digit
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  // Test the password against the regular expression
  return regex.test(password);
}
