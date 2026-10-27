// Complete apenas quando Maria Clara fornecer o contato profissional.
export const CONTACT = { whatsapp: '', instagram: '', creci: '', email: '' };
export function whatsappLink(message: string): string {
  return CONTACT.whatsapp ? 'https://wa.me/' + CONTACT.whatsapp + '?text=' + encodeURIComponent(message) : '#';
}
