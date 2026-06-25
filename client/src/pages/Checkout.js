import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { orderAPI } from '../services/api';
import Alert from '../components/Alert';
import { toast } from 'react-toastify';
import QRCode from 'qrcode.react';
import { FiCopy, FiCheck } from 'react-icons/fi';

const Checkout = () => {
  const { gameId, packageId } = useParams();
  const navigate = useNavigate();
  const { user, token } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({});
  const [utrNumber, setUtrNumber] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!utrNumber.trim()) {
      toast.error('Please enter UTR number');
      return;
    }

    try {
      setLoading(true);
      const response = await orderAPI.createOrder({
        gameId,
        packageId,
        quantity,
        orderSources: formData,
        utrNumber
      }, token);

      setOrderData(response.data.order);
      setOrderSuccess(true);
      toast.success('Order created successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(utrNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (orderSuccess && orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-3xl font-bold mb-2 text-green-600">Order Confirmed!</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Your order has been placed successfully</p>

            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mb-6 text-left">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-semibold">Order ID:</span>
                  <span className="text-purple-600">{orderData.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Amount:</span>
                  <span>₹{orderData.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Status:</span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded">{orderData.orderStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">UTR:</span>
                  <span>{orderData.utrNumber}</span>
                </div>
              </div>
            </div>

            <Alert
              type="info"
              title="Next Steps"
              message="Our team will verify your payment and deliver your purchase within a few minutes. You can track your order status in the Orders section."
            />

            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/orders')}
                className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-bold hover:bg-purple-700 transition"
              >
                View Orders
              </button>
              <button
                onClick={() => navigate('/games')}
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg font-bold hover:bg-gray-400 transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Complete Your Purchase</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Payment */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Payment Details</h2>
                
                <div className="mb-4">
                  <label className="block font-semibold mb-2">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">UTR Number *</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      placeholder="Enter UTR from payment"
                      className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700"
                    />
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="bg-gray-300 dark:bg-gray-700 px-3 py-2 rounded-lg"
                    >
                      {copied ? <FiCheck /> : <FiCopy />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Confirm Purchase'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - QR Code */}
          <div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
              <h2 className="text-xl font-bold mb-4">Scan to Pay</h2>
              <div className="bg-white p-4 rounded-lg inline-block">
                <QRCode value={`upi://pay?pa=aspirants@upi&pn=ASPIRANTS&am=500&tn=Game%20TopUp`} size={256} />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                Use Google Pay or any UPI app to scan and pay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
