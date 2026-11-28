export function adminEmailMatches(input: string, expected: string) {
  return input.trim().toLowerCase() === expected.trim().toLowerCase();
}
export const allowedImageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
export const maxImageSize = 5 * 1024 * 1024;
export function validImageUpload(type: string, size: number) {
  return allowedImageTypes.includes(type) && size > 0 && size <= maxImageSize;
}
