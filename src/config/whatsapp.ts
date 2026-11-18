import { WhatsAppOrderPayload } from '../types';

/**
 * Single source of truth for the business WhatsApp number.
 * Enter digits only with country code (no '+', spaces, dashes, or parentheses).
 * Example: '923001234567' or '13105550192'
 */
export const BUSINESS_WHATSAPP_NUMBER = '923001234567';

/**
 * Strips all non-numeric characters so wa.me URLs never contain spaces or special chars.
 */
export function sanitizeWhatsAppNumber(raw: string): string {
  return raw.replace(/\D/g, '');
}

/**
 * Validates customer WhatsApp number (must contain 10 to 15 digits).
 */
export function validateCustomerWhatsApp(raw: string): {
  valid: boolean;
  sanitized: string;
  error?: string;
} {
  const trimmed = raw.trim();
  if (!trimmed) {
    return {
      valid: false,
      sanitized: '',
      error: 'Please enter your WhatsApp number.',
    };
  }

  // Allow digits, optional leading +, spaces, dashes, or parentheses during input
  if (!/^[+\d\s()-]+$/.test(trimmed)) {
    return {
      valid: false,
      sanitized: '',
      error: 'WhatsApp number may only include digits, +, spaces, or dashes.',
    };
  }

  const sanitized = sanitizeWhatsAppNumber(trimmed);
  if (sanitized.length < 10 || sanitized.length > 15) {
    return {
      valid: false,
      sanitized,
      error: 'Enter a valid WhatsApp number with country code (10–15 digits).',
    };
  }

  return { valid: true, sanitized };
}

export function formatOrderCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Generates the formatted WhatsApp order message matching the required structure.
 */
export function formatWhatsAppOrderMessage(order: WhatsAppOrderPayload): string {
  const totalAmount = order.unitPrice * order.quantity;
  const instructions = order.instructions.trim()
    ? order.instructions.trim()
    : 'None';

  return [
    'Hello! I want to place an order.',
    '',
    '*Customer Information:*',
    `- Name: ${order.customerName.trim()}`,
    `- WhatsApp: ${order.customerWhatsApp.trim()}`,
    `- Address: ${order.deliveryAddress.trim()}`,
    `- City: ${order.city.trim()}`,
    '',
    '*Order Details:*',
    `- Product: ${order.productName.trim()}`,
    `- Quantity: ${order.quantity}`,
    `- Unit Price: ${formatOrderCurrency(order.unitPrice)}`,
    `- Total Amount: ${formatOrderCurrency(totalAmount)}`,
    '',
    `Additional Instructions: ${instructions}`,
    '',
    'Please confirm my order. Thank you!',
  ].join('\n');
}

/**
 * Builds an official Click-to-Chat URL: https://wa.me/923XXXXXXXXX?text=ENCODED_MESSAGE
 */
export function buildWhatsAppCheckoutUrl(order: WhatsAppOrderPayload): string {
  const businessNumber = sanitizeWhatsAppNumber(BUSINESS_WHATSAPP_NUMBER);
  const message = formatWhatsAppOrderMessage(order);
  return `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;
}
