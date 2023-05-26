export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function capitalizeFirstLetterRemoveUnderline(string: string) {
  const temp = string.charAt(0).toUpperCase() + string.slice(1);
  return temp.replaceAll('_', ' ');
}
