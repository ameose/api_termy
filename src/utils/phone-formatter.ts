export function formatPhoneNumber(phoneNumber: string): string {
  const digits = phoneNumber.replace(/\D/g, '');
  if (digits.match(/^[78]\d{10}$/)) {
    return `+7(${digits.substring(1, 4)})${digits.substring(
      4,
      7,
    )}-${digits.substring(7, 9)}-${digits.substring(9, 11)}`;
  } else {
    return phoneNumber;
  }
}
