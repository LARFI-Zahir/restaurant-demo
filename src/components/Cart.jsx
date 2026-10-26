import { useState } from "react";
import { fees } from "../data";
import { computeOrderTotals } from "../pricing";

export default function Cart({ cart, onRemove, onCheckout }) {
  const [showServiceFeeInfo, setShowServiceFeeInfo] = useState(false);
  const { subtotal, deliveryFee, serviceFee, tax, total } = computeOrderTotals(cart);

  return (
    <aside className="cart">
      <h2>Your Order</h2>

      {cart.length === 0 ? (
        <p className="cart-empty">No items yet.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <span className="cart-item-emoji">{item.emoji}</span>
              <div className="cart-item-details">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-qty">x{item.quantity}</span>
              </div>
              <span className="cart-item-price">€{(item.price * item.quantity).toFixed(2)}</span>
              <button className="remove-btn" onClick={() => onRemove(item.id)}>✕</button>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <div className="cart-totals">
          <div className="cart-totals-row">
            <span>Subtotal</span>
            <span>€{subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-totals-row">
            <span>Delivery fee</span>
            <span>€{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="cart-totals-row">
            <span className="cart-totals-label-with-info">
              Service fee
              <button
                type="button"
                className="info-btn"
                aria-label="What is the service fee?"
                onClick={() => setShowServiceFeeInfo((v) => !v)}
              >
                ⓘ
              </button>
            </span>
            <span>€{serviceFee.toFixed(2)}</span>
          </div>
          {showServiceFeeInfo && (
            <p className="service-fee-info">{fees.serviceFeeDescription}</p>
          )}
          <div className="cart-totals-row">
            <span>Tax</span>
            <span>€{tax.toFixed(2)}</span>
          </div>
          <div className="cart-totals-row total">
            <span>Total</span>
            <span>€{total.toFixed(2)}</span>
          </div>
        </div>
      )}

      <button
        className="checkout-btn"
        disabled={cart.length === 0}
        onClick={onCheckout}
      >
        Place Order
      </button>
    </aside>
  );
}
