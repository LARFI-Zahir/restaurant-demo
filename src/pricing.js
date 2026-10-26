import { fees } from "./data";

export function computeOrderTotals(cart) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasItems = cart.length > 0;
  const deliveryFee = hasItems ? fees.deliveryFee : 0;
  const serviceFee = hasItems ? fees.serviceFee : 0;
  const tax = subtotal * fees.taxRate;
  const total = subtotal + deliveryFee + serviceFee + tax;

  return { subtotal, deliveryFee, serviceFee, tax, total };
}
