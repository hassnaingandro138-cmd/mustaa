import { useState, useEffect, FormEvent } from 'react';
import {
  X,
  MessageCircle,
  Loader2,
  Minus,
  Plus,
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import { CheckoutItem, WhatsAppOrderPayload } from '../types';
import {
  buildWhatsAppCheckoutUrl,
  formatOrderCurrency,
  formatWhatsAppOrderMessage,
  validateCustomerWhatsApp,
} from '../config/whatsapp';
import { ShowroomImage } from './ShowroomImage';

interface WhatsAppCheckoutModalProps {
  isOpen: boolean;
  item: CheckoutItem | null;
  onClose: () => void;
}

interface FieldErrors {
  customerName?: string;
  customerWhatsApp?: string;
  deliveryAddress?: string;
  city?: string;
  productName?: string;
  quantity?: string;
  unitPrice?: string;
}

export function WhatsAppCheckoutModal({
  isOpen,
  item,
  onClose,
}: WhatsAppCheckoutModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [instructions, setInstructions] = useState('');

  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preparedOrder, setPreparedOrder] = useState<{
    url: string;
    message: string;
  } | null>(null);

  // Dynamically populate product fields whenever the selected item opens
  useEffect(() => {
    if (isOpen && item) {
      setProductName(item.productName);
      setQuantity(Math.max(1, item.quantity || 1));
      setUnitPrice(Math.max(0, item.unitPrice || 0));
      setErrors({});
      setIsSubmitting(false);
      setPreparedOrder(null);
    }
  }, [isOpen, item]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const totalAmount = unitPrice * quantity;

  const validateAll = (): boolean => {
    const nextErrors: FieldErrors = {};

    if (customerName.trim().length < 2) {
      nextErrors.customerName = 'Please enter your full name (at least 2 characters).';
    }

    const phoneValidation = validateCustomerWhatsApp(customerWhatsApp);
    if (!phoneValidation.valid) {
      nextErrors.customerWhatsApp = phoneValidation.error;
    }

    if (deliveryAddress.trim().length < 5) {
      nextErrors.deliveryAddress = 'Please enter your complete delivery address.';
    }

    if (city.trim().length < 2) {
      nextErrors.city = 'Please enter your city.';
    }

    if (!productName.trim()) {
      nextErrors.productName = 'Product name is required.';
    }

    if (!Number.isFinite(quantity) || quantity < 1) {
      nextErrors.quantity = 'Quantity must be at least 1.';
    }

    if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
      nextErrors.unitPrice = 'Product price must be greater than zero.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const launchWhatsAppAnchor = (url: string) => {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setIsSubmitting(true);

    const payload: WhatsAppOrderPayload = {
      customerName,
      customerWhatsApp,
      deliveryAddress,
      city,
      productName,
      quantity,
      unitPrice,
      instructions,
    };

    const whatsappUrl = buildWhatsAppCheckoutUrl(payload);
    const formattedMessage = formatWhatsAppOrderMessage(payload);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setPreparedOrder({
        url: whatsappUrl,
        message: formattedMessage,
      });
      launchWhatsAppAnchor(whatsappUrl);
    }, 350);
  };

  const inputBaseClass = (hasError?: string) =>
    `h-11 w-full rounded-lg border px-3.5 text-base sm:text-sm text-[#0b0f19] bg-white transition-colors focus:outline-none focus:ring-2 ${
      hasError
        ? 'border-[#b90538] focus:border-[#b90538] focus:ring-[#b90538]/20'
        : 'border-[#131b2e]/15 focus:border-[#b90538] focus:ring-[#b90538]/15'
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-checkout-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0b0f19]/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Responsive Modal Container */}
      <div className="relative z-10 flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-xl border border-[#131b2e]/10 bg-white shadow-2xl sm:rounded-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-3 border-b border-[#131b2e]/10 bg-[#0b0f19] px-4 py-3.5 text-white sm:px-6 sm:py-4">
          <div className="min-w-0">
            <p className="text-[11px] font-medium tracking-[0.12em] text-[#ff8da1] uppercase">
              MUSTAFA&apos;S CARS · Direct Order
            </p>
            <h2
              id="whatsapp-checkout-title"
              className="truncate font-display text-lg font-bold sm:text-xl"
            >
              WhatsApp Order Checkout
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout form"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 text-white/80 transition-colors hover:bg-white/10 hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dc2c4f]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
          {/* Dynamic Product Banner */}
          <div className="flex items-center gap-3 rounded-lg border border-[#131b2e]/10 bg-[#faf8ff] p-3 sm:gap-4 sm:p-3.5">
            {item.image && (
              <div className="w-20 shrink-0 overflow-hidden rounded-md bg-[#f2f3ff] sm:w-24">
                <ShowroomImage
                  src={item.image}
                  alt={productName || item.productName}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#131b2e]/60">
                <span>Selected Vehicle</span>
                {item.stockNumber && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">#{item.stockNumber}</span>
                  </>
                )}
              </div>
              <p className="mt-0.5 truncate font-display text-sm font-bold text-[#0b0f19] sm:text-base">
                {productName || item.productName}
              </p>
              <p className="mt-0.5 flex flex-wrap items-baseline gap-x-1 font-mono text-xs font-semibold text-[#b90538] tabular-nums sm:text-sm">
                <span>{formatOrderCurrency(unitPrice)} × {quantity} =</span>
                <span className="text-[#0b0f19]">{formatOrderCurrency(totalAmount)}</span>
              </p>
            </div>
          </div>

          {preparedOrder ? (
            /* Post-Submit Confirmation & Review View */
            <div className="mt-6 space-y-5">
              <div className="rounded-lg border border-[#b90538]/20 bg-[#fdf2f8] p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#b90538] shrink-0" />
                  <div>
                    <h3 className="font-display text-base font-bold text-[#0b0f19]">
                      WhatsApp Order Ready to Send
                    </h3>
                    <p className="mt-1 text-sm text-[#131b2e]/75">
                      Review your formatted order below. If WhatsApp did not open automatically, tap the button below to open it and press Send.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#131b2e]/60 uppercase tracking-wide">
                  Generated WhatsApp Message Preview
                </p>
                <pre className="mt-2 max-h-60 overflow-y-auto whitespace-pre-wrap rounded-lg border border-[#131b2e]/10 bg-[#faf8ff] p-4 font-sans text-xs leading-relaxed text-[#131b2e]">
                  {preparedOrder.message}
                </pre>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setPreparedOrder(null)}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-[#131b2e]/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#0b0f19] transition-colors hover:border-[#131b2e]/35 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4 shrink-0" />
                  <span>Edit Details</span>
                </button>
                <a
                  href={preparedOrder.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#b90538] px-5 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#9e042f]"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  <span>Open WhatsApp to Send Order</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                </a>
              </div>
            </div>
          ) : (
            /* Customer & Order Form */
            <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
              {/* Customer Information */}
              <div>
                <h3 className="font-display text-sm font-bold text-[#0b0f19] uppercase tracking-wide">
                  Customer Information
                </h3>

                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="checkout-full-name"
                      className="block text-xs font-semibold text-[#0b0f19]"
                    >
                      Full Name <span className="text-[#b90538]">*</span>
                    </label>
                    <input
                      id="checkout-full-name"
                      type="text"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (errors.customerName) {
                          setErrors((prev) => ({ ...prev, customerName: undefined }));
                        }
                      }}
                      placeholder="e.g. Mustafa Ahmed"
                      required
                      className={`mt-1.5 ${inputBaseClass(errors.customerName)}`}
                    />
                    {errors.customerName && (
                      <p role="alert" className="mt-1 text-xs font-medium text-[#b90538]">
                        {errors.customerName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-whatsapp"
                      className="block text-xs font-semibold text-[#0b0f19]"
                    >
                      WhatsApp Number <span className="text-[#b90538]">*</span>
                    </label>
                    <input
                      id="checkout-whatsapp"
                      type="tel"
                      inputMode="tel"
                      value={customerWhatsApp}
                      onChange={(e) => {
                        setCustomerWhatsApp(e.target.value);
                        if (errors.customerWhatsApp) {
                          setErrors((prev) => ({
                            ...prev,
                            customerWhatsApp: undefined,
                          }));
                        }
                      }}
                      placeholder="e.g. +92 300 1234567"
                      required
                      className={`mt-1.5 font-mono ${inputBaseClass(
                        errors.customerWhatsApp
                      )}`}
                    />
                    {errors.customerWhatsApp && (
                      <p role="alert" className="mt-1 text-xs font-medium text-[#b90538]">
                        {errors.customerWhatsApp}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="checkout-address"
                      className="block text-xs font-semibold text-[#0b0f19]"
                    >
                      Complete Delivery Address <span className="text-[#b90538]">*</span>
                    </label>
                    <input
                      id="checkout-address"
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => {
                        setDeliveryAddress(e.target.value);
                        if (errors.deliveryAddress) {
                          setErrors((prev) => ({
                            ...prev,
                            deliveryAddress: undefined,
                          }));
                        }
                      }}
                      placeholder="House / Street / Suite / Landmark"
                      required
                      className={`mt-1.5 ${inputBaseClass(errors.deliveryAddress)}`}
                    />
                    {errors.deliveryAddress && (
                      <p role="alert" className="mt-1 text-xs font-medium text-[#b90538]">
                        {errors.deliveryAddress}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-city"
                      className="block text-xs font-semibold text-[#0b0f19]"
                    >
                      City <span className="text-[#b90538]">*</span>
                    </label>
                    <input
                      id="checkout-city"
                      type="text"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        if (errors.city) {
                          setErrors((prev) => ({ ...prev, city: undefined }));
                        }
                      }}
                      placeholder="e.g. Karachi / Dubai / LA"
                      required
                      className={`mt-1.5 ${inputBaseClass(errors.city)}`}
                    />
                    {errors.city && (
                      <p role="alert" className="mt-1 text-xs font-medium text-[#b90538]">
                        {errors.city}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="border-t border-[#131b2e]/10 pt-5">
                <h3 className="font-display text-sm font-bold text-[#0b0f19] uppercase tracking-wide">
                  Order Details
                </h3>

                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-12">
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="checkout-product-name"
                      className="block text-xs font-semibold text-[#0b0f19]"
                    >
                      Product Name <span className="text-[#b90538]">*</span>
                    </label>
                    <input
                      id="checkout-product-name"
                      type="text"
                      value={productName}
                      onChange={(e) => {
                        setProductName(e.target.value);
                        if (errors.productName) {
                          setErrors((prev) => ({ ...prev, productName: undefined }));
                        }
                      }}
                      required
                      className={`mt-1.5 ${inputBaseClass(errors.productName)}`}
                    />
                    {errors.productName && (
                      <p role="alert" className="mt-1 text-xs font-medium text-[#b90538]">
                        {errors.productName}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="checkout-quantity"
                      className="block text-xs font-semibold text-[#0b0f19]"
                    >
                      Quantity <span className="text-[#b90538]">*</span>
                    </label>
                    <div className="mt-1.5 flex h-11 items-center overflow-hidden rounded-lg border border-[#131b2e]/15 bg-white">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        aria-label="Decrease quantity"
                        className="flex h-full w-11 shrink-0 items-center justify-center text-[#131b2e] transition-colors hover:bg-[#fdf2f8] hover:text-[#b90538] cursor-pointer"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <input
                        id="checkout-quantity"
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          setQuantity(Number.isNaN(val) ? 1 : Math.max(1, val));
                        }}
                        required
                        className="h-full w-full min-w-0 text-center font-mono text-base font-semibold text-[#0b0f19] tabular-nums focus:outline-none sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        aria-label="Increase quantity"
                        className="flex h-full w-11 shrink-0 items-center justify-center text-[#131b2e] transition-colors hover:bg-[#fdf2f8] hover:text-[#b90538] cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    {errors.quantity && (
                      <p role="alert" className="mt-1 text-xs font-medium text-[#b90538]">
                        {errors.quantity}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="checkout-unit-price"
                      className="block text-xs font-semibold text-[#0b0f19]"
                    >
                      Unit Price (USD) <span className="text-[#b90538]">*</span>
                    </label>
                    <input
                      id="checkout-unit-price"
                      type="number"
                      min={1}
                      value={unitPrice}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setUnitPrice(Number.isNaN(val) ? 0 : Math.max(0, val));
                        if (errors.unitPrice) {
                          setErrors((prev) => ({ ...prev, unitPrice: undefined }));
                        }
                      }}
                      required
                      className={`mt-1.5 font-mono tabular-nums ${inputBaseClass(
                        errors.unitPrice
                      )}`}
                    />
                    {errors.unitPrice && (
                      <p role="alert" className="mt-1 text-xs font-medium text-[#b90538]">
                        {errors.unitPrice}
                      </p>
                    )}
                  </div>
                </div>

                {/* Live Total Summary Bar */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#131b2e]/10 bg-[#faf8ff] px-4 py-3">
                  <span className="text-xs font-semibold text-[#131b2e]/70 uppercase tracking-wide">
                    Total Order Amount
                  </span>
                  <span className="font-mono text-base font-bold text-[#0b0f19] tabular-nums sm:text-lg">
                    {formatOrderCurrency(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Additional Instructions */}
              <div>
                <label
                  htmlFor="checkout-instructions"
                  className="block text-xs font-semibold text-[#0b0f19]"
                >
                  Additional Instructions{' '}
                  <span className="font-normal text-[#131b2e]/50">(Optional)</span>
                </label>
                <textarea
                  id="checkout-instructions"
                  rows={2}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Preferred delivery window, enclosed transport notes, or trade-in details..."
                  className="mt-1.5 w-full rounded-lg border border-[#131b2e]/15 bg-white p-3 text-base text-[#0b0f19] focus:border-[#b90538] focus:ring-2 focus:ring-[#b90538]/15 focus:outline-none sm:text-sm"
                />
              </div>

              {/* Submit Button */}
              <div className="border-t border-[#131b2e]/10 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#b90538] px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#9e042f] hover:shadow-[0_6px_20px_rgba(185,5,56,0.28)] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Preparing WhatsApp Order...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-4 w-4" />
                      <span>Place Order on WhatsApp</span>
                    </>
                  )}
                </button>
                <p className="mt-2.5 flex items-center justify-center gap-1.5 text-center text-xs text-[#131b2e]/60">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#b90538] shrink-0" />
                  <span>
                    Opens WhatsApp with your pre-filled order so you can review and tap Send.
                  </span>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
