import { useState } from 'react';

const MerchandiseOrders = () => {
  const [orders] = useState([
    {
      id: 1,
      userName: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
      items: [
        { product: 'Synapse T-Shirt', size: 'L', quantity: 2, price: 500 },
        { product: 'Synapse Cap', size: 'Free Size', quantity: 1, price: 300 },
      ],
      totalAmount: 1300,
      orderDate: '2025-12-10',
      paymentStatus: 'Paid',
    },
    {
      id: 2,
      userName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '9876543211',
      items: [
        { product: 'Synapse Hoodie', size: 'M', quantity: 1, price: 1200 },
      ],
      totalAmount: 1200,
      orderDate: '2025-12-11',
      paymentStatus: 'Pending',
    },
    {
      id: 3,
      userName: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '9876543212',
      items: [
        { product: 'Synapse T-Shirt', size: 'XL', quantity: 3, price: 500 },
        { product: 'Synapse T-Shirt', size: 'M', quantity: 1, price: 500 },
      ],
      totalAmount: 2000,
      orderDate: '2025-12-12',
      paymentStatus: 'Paid',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [productFilter, setProductFilter] = useState('All Products');

  // Get unique products
  const allProducts = [
    'All Products',
    ...new Set(orders.flatMap((order) => order.items.map((item) => item.product))),
  ];

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProduct =
      productFilter === 'All Products' ||
      order.items.some((item) => item.product === productFilter);

    return matchesSearch && matchesProduct;
  });

  // Download CSV
  const downloadCSV = () => {
    const headers = [
      'Order ID',
      'Customer Name',
      'Email',
      'Phone',
      'Product',
      'Size',
      'Quantity',
      'Price per Item',
      'Total Amount',
      'Order Date',
      'Payment Status',
    ];

    const rows = [];
    filteredOrders.forEach((order) => {
      order.items.forEach((item, idx) => {
        rows.push([
          idx === 0 ? order.id : '', // Show order ID only once
          idx === 0 ? order.userName : '',
          idx === 0 ? order.email : '',
          idx === 0 ? order.phone : '',
          item.product,
          item.size,
          item.quantity,
          item.price,
          idx === 0 ? order.totalAmount : '',
          idx === 0 ? order.orderDate : '',
          idx === 0 ? order.paymentStatus : '',
        ]);
      });
    });

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join(
      '\n'
    );

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `merchandise_orders_${new Date().toISOString().split('T')[0]}.csv`
    );
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Merchandise Orders
      </h1>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Orders
            </label>
            <input
              type="text"
              placeholder="Search by customer name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Product
            </label>
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {allProducts.map((product, idx) => (
                <option key={idx} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || productFilter !== 'All Products') && (
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-gray-600">Active filters:</span>
            {searchTerm && (
              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
                Search: "{searchTerm}"
              </span>
            )}
            {productFilter !== 'All Products' && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                Product: {productFilter}
              </span>
            )}
            <button
              onClick={() => {
                setSearchTerm('');
                setProductFilter('All Products');
              }}
              className="text-red-600 hover:text-red-800 ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            All Orders ({filteredOrders.length})
            {productFilter !== 'All Products' && (
              <span className="text-sm text-gray-500 ml-2">
                - "{productFilter}"
              </span>
            )}
          </h2>
          <button
            onClick={downloadCSV}
            disabled={filteredOrders.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span>📥</span>
            Download CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No orders found matching the selected filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {order.userName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {order.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-indigo-600">
                      {order.items.length} item(s)
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ₹{order.totalAmount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.orderDate}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.paymentStatus === 'Paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">Order #{selectedOrder.id}</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Customer Details</h4>
                <p className="text-sm">
                  <strong>Name:</strong> {selectedOrder.userName}
                </p>
                <p className="text-sm">
                  <strong>Email:</strong> {selectedOrder.email}
                </p>
                <p className="text-sm">
                  <strong>Phone:</strong> {selectedOrder.phone}
                </p>
                <p className="text-sm">
                  <strong>Order Date:</strong> {selectedOrder.orderDate}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Items Ordered</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded"
                    >
                      <div>
                        <p className="font-medium text-sm">{item.product}</p>
                        <p className="text-xs text-gray-600">
                          Size: {item.size} | Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-sm">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="text-xl font-bold text-indigo-600">
                    ₹{selectedOrder.totalAmount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Payment Status:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedOrder.paymentStatus === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {selectedOrder.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MerchandiseOrders;
