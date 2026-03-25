import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
    const navigate = useNavigate();
    const {cartItems: cart} = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + item.donationAmount, 0);
    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: '#0080ff',
            padding: '10px 15px', 
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
            fontSize: 16,
        }}
        onClick={() => navigate('/cart')}>
            🛒 <strong>${totalAmount.toFixed(2)}</strong>
        </div>
    );
}
export default CartSummary;