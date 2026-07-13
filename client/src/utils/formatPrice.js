export function formatPrice(value) {
  return `Rs. ${Number(value ?? 0).toLocaleString('en-US')}`;
}