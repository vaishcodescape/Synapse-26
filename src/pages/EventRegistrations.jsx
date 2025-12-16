import { useState } from 'react';

const EventRegistrations = () => {
  const [registrations] = useState([
    {
      id: 1,
      userName: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
      college: 'ABC College',
      event: 'Hackathon 2025',
      category: 'Technical',
      participationType: 'Solo',
      teamSize: 1,
      registrationDate: '2025-12-10',
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      amount: 200,
      transactionId: 'TXN123456789',
    },
    {
      id: 2,
      userName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '9876543211',
      college: 'XYZ University',
      event: 'Dance Battle',
      category: 'Cultural',
      participationType: 'Duet',
      teamSize: 2,
      registrationDate: '2025-12-11',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid',
      amount: 250,
      transactionId: 'TXN987654321',
    },
    {
      id: 3,
      userName: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '9876543212',
      college: 'DEF Institute',
      event: 'Hackathon 2025',
      category: 'Technical',
      participationType: 'Group',
      teamSize: 5,
      registrationDate: '2025-12-12',
      paymentMethod: 'Debit Card',
      paymentStatus: 'Pending',
      amount: 500,
      transactionId: 'TXN456789123',
    },
    {
      id: 4,
      userName: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '9876543213',
      college: 'GHI College',
      event: 'Coding Competition',
      category: 'Technical',
      participationType: 'Solo',
      teamSize: 1,
      registrationDate: '2025-12-13',
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      amount: 150,
      transactionId: 'TXN789456123',
    },
    {
      id: 5,
      userName: 'Tom Brown',
      email: 'tom@example.com',
      phone: '9876543214',
      college: 'JKL University',
      event: 'Dance Battle',
      category: 'Cultural',
      participationType: 'Group',
      teamSize: 6,
      registrationDate: '2025-12-14',
      paymentMethod: 'Net Banking',
      paymentStatus: 'Paid',
      amount: 720,
      transactionId: 'TXN321654987',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [eventFilter, setEventFilter] = useState('All Events');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('All Methods');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('All Status');
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  // Gateway charges configuration
  const [gatewayCharges, setGatewayCharges] = useState({
    UPI: 2,
    'Credit Card': 3,
    'Debit Card': 2.5,
    'Net Banking': 2,
  });

  const [isGatewaySettingsOpen, setIsGatewaySettingsOpen] = useState(false);

  // Get unique values for filters
  const allEvents = ['All Events', ...new Set(registrations.map((r) => r.event))];
  const allPaymentMethods = [
    'All Methods',
    ...new Set(registrations.map((r) => r.paymentMethod)),
  ];
  const allPaymentStatus = ['All Status', 'Paid', 'Pending', 'Failed'];

  // Filter registrations
  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch =
      reg.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.transactionId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEvent = eventFilter === 'All Events' || reg.event === eventFilter;
    const matchesPaymentMethod =
      paymentMethodFilter === 'All Methods' ||
      reg.paymentMethod === paymentMethodFilter;
    const matchesPaymentStatus =
      paymentStatusFilter === 'All Status' ||
      reg.paymentStatus === paymentStatusFilter;

    return (
      matchesSearch &&
      matchesEvent &&
      matchesPaymentMethod &&
      matchesPaymentStatus
    );
  });

  // Calculate gateway charges for a registration
  const calculateGatewayCharge = (amount, method) => {
    const chargePercentage = gatewayCharges[method] || 0;
    return (amount * chargePercentage) / 100;
  };

  // Calculate statistics
  const paidRegistrations = filteredRegistrations.filter(
    (r) => r.paymentStatus === 'Paid'
  );

  const totalGrossRevenue = paidRegistrations.reduce((sum, r) => sum + r.amount, 0);

  const totalGatewayCharges = paidRegistrations.reduce(
    (sum, r) => sum + calculateGatewayCharge(r.amount, r.paymentMethod),
    0
  );

  const totalNetRevenue = totalGrossRevenue - totalGatewayCharges;

  const paidCount = paidRegistrations.length;
  const pendingCount = filteredRegistrations.filter(
    (r) => r.paymentStatus === 'Pending'
  ).length;

  // Download CSV
  const downloadCSV = () => {
    const headers = [
      'Registration ID',
      'Name',
      'Email',
      'Phone',
      'College',
      'Event',
      'Category',
      'Participation Type',
      'Team Size',
      'Registration Date',
      'Payment Method',
      'Payment Status',
      'Amount (₹)',
      'Gateway Charge %',
      'Gateway Charge (₹)',
      'Net Amount (₹)',
      'Transaction ID',
    ];

    const rows = filteredRegistrations.map((reg) => {
      const gatewayCharge =
        reg.paymentStatus === 'Paid'
          ? calculateGatewayCharge(reg.amount, reg.paymentMethod)
          : 0;
      const netAmount =
        reg.paymentStatus === 'Paid' ? reg.amount - gatewayCharge : reg.amount;

      return [
        reg.id,
        reg.userName,
        reg.email,
        reg.phone,
        reg.college,
        reg.event,
        reg.category,
        reg.participationType,
        reg.teamSize,
        reg.registrationDate,
        reg.paymentMethod,
        reg.paymentStatus,
        reg.amount,
        gatewayCharges[reg.paymentMethod] || 0,
        gatewayCharge.toFixed(2),
        netAmount.toFixed(2),
        reg.transactionId,
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `event_registrations_${eventFilter.replace(/\s+/g, '_')}_${
        new Date().toISOString().split('T')[0]
      }.csv`
    );
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('');
    setEventFilter('All Events');
    setPaymentMethodFilter('All Methods');
    setPaymentStatusFilter('All Status');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Event Registrations
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Registrations</p>
              <p className="text-3xl font-bold text-indigo-600">
                {filteredRegistrations.length}
              </p>
            </div>
            <div className="text-4xl">📝</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Paid</p>
              <p className="text-3xl font-bold text-green-600">{paidCount}</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Gross Revenue</p>
              <p className="text-2xl font-bold text-blue-600">
                ₹{totalGrossRevenue.toFixed(2)}
              </p>
            </div>
            <div className="text-4xl">💵</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Gateway Charges</p>
              <p className="text-2xl font-bold text-red-600">
                -₹{totalGatewayCharges.toFixed(2)}
              </p>
            </div>
            <div className="text-4xl">💳</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-2 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold">Net Revenue</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{totalNetRevenue.toFixed(2)}
              </p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>
      </div>

      {/* Gateway Settings Button */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setIsGatewaySettingsOpen(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <span>⚙️</span>
          Gateway Charges Settings
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Registrations
            </label>
            <input
              type="text"
              placeholder="Search by name, email, college, or transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Event Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Event
            </label>
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {allEvents.map((event, idx) => (
                <option key={idx} value={event}>
                  {event}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Method Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              value={paymentMethodFilter}
              onChange={(e) => setPaymentMethodFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {allPaymentMethods.map((method, idx) => (
                <option key={idx} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Payment Status Filter */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Status
            </label>
            <select
              value={paymentStatusFilter}
              onChange={(e) => setPaymentStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {allPaymentStatus.map((status, idx) => (
                <option key={idx} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm ||
          eventFilter !== 'All Events' ||
          paymentMethodFilter !== 'All Methods' ||
          paymentStatusFilter !== 'All Status') && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-gray-600">Active filters:</span>
            {searchTerm && (
              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
                Search: "{searchTerm}"
              </span>
            )}
            {eventFilter !== 'All Events' && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                Event: {eventFilter}
              </span>
            )}
            {paymentMethodFilter !== 'All Methods' && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                Method: {paymentMethodFilter}
              </span>
            )}
            {paymentStatusFilter !== 'All Status' && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                Status: {paymentStatusFilter}
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-red-600 hover:text-red-800 ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            All Registrations ({filteredRegistrations.length})
          </h2>
          <button
            onClick={downloadCSV}
            disabled={filteredRegistrations.length === 0}
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
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Participation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Gross Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Gateway Charge
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Net Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td
                    colSpan="10"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No registrations found matching the selected filters.
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((reg) => {
                  const gatewayCharge =
                    reg.paymentStatus === 'Paid'
                      ? calculateGatewayCharge(reg.amount, reg.paymentMethod)
                      : 0;
                  const netAmount =
                    reg.paymentStatus === 'Paid'
                      ? reg.amount - gatewayCharge
                      : reg.amount;

                  return (
                    <tr key={reg.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        #{reg.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div>
                          <p className="font-medium">{reg.userName}</p>
                          <p className="text-xs text-gray-500">{reg.college}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div>
                          <p className="font-medium">{reg.event}</p>
                          <p className="text-xs text-gray-500">{reg.category}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {reg.participationType} ({reg.teamSize})
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {reg.paymentMethod}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        ₹{reg.amount}
                      </td>
                      <td className="px-6 py-4 text-sm text-red-600">
                        {reg.paymentStatus === 'Paid' ? (
                          <>
                            -₹{gatewayCharge.toFixed(2)}
                            <span className="text-xs text-gray-500 block">
                              ({gatewayCharges[reg.paymentMethod]}%)
                            </span>
                          </>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-green-600">
                        {reg.paymentStatus === 'Paid'
                          ? `₹${netAmount.toFixed(2)}`
                          : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            reg.paymentStatus === 'Paid'
                              ? 'bg-green-100 text-green-800'
                              : reg.paymentStatus === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {reg.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => setSelectedRegistration(reg)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gateway Settings Modal */}
      {isGatewaySettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">Gateway Charges Settings</h3>
              <button
                onClick={() => setIsGatewaySettingsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Set the gateway charges percentage for each payment method. These
              will be deducted from the gross revenue.
            </p>

            <div className="space-y-4">
              {Object.keys(gatewayCharges).map((method) => (
                <div key={method}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {method}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={gatewayCharges[method]}
                      onChange={(e) =>
                        setGatewayCharges({
                          ...gatewayCharges,
                          [method]: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="text-gray-600">%</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsGatewaySettingsOpen(false)}
              className="w-full mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Registration Details Modal */}
      {selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">
                Registration Details #{selectedRegistration.id}
              </h3>
              <button
                onClick={() => setSelectedRegistration(null)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Participant Info */}
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Participant Information
                </h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Name:</strong> {selectedRegistration.userName}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedRegistration.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedRegistration.phone}
                  </p>
                  <p>
                    <strong>College:</strong> {selectedRegistration.college}
                  </p>
                </div>
              </div>

              {/* Event Info */}
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Event Information
                </h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Event:</strong> {selectedRegistration.event}
                  </p>
                  <p>
                    <strong>Category:</strong> {selectedRegistration.category}
                  </p>
                  <p>
                    <strong>Participation Type:</strong>{' '}
                    {selectedRegistration.participationType}
                  </p>
                  <p>
                    <strong>Team Size:</strong> {selectedRegistration.teamSize}{' '}
                    {selectedRegistration.teamSize === 1 ? 'person' : 'people'}
                  </p>
                  <p>
                    <strong>Registration Date:</strong>{' '}
                    {selectedRegistration.registrationDate}
                  </p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Payment Information
                </h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Payment Method:</strong>{' '}
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {selectedRegistration.paymentMethod}
                    </span>
                  </p>
                  <p>
                    <strong>Payment Status:</strong>{' '}
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        selectedRegistration.paymentStatus === 'Paid'
                          ? 'bg-green-100 text-green-800'
                          : selectedRegistration.paymentStatus === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {selectedRegistration.paymentStatus}
                    </span>
                  </p>
                  <p>
                    <strong>Transaction ID:</strong>{' '}
                    {selectedRegistration.transactionId}
                  </p>
                </div>
              </div>

              {/* Financial Breakdown */}
              {selectedRegistration.paymentStatus === 'Paid' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Financial Breakdown
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Gross Amount:</span>
                      <span className="font-semibold">
                        ₹{selectedRegistration.amount}
                      </span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>
                        Gateway Charge (
                        {gatewayCharges[selectedRegistration.paymentMethod]}%):
                      </span>
                      <span className="font-semibold">
                        -₹
                        {calculateGatewayCharge(
                          selectedRegistration.amount,
                          selectedRegistration.paymentMethod
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-green-600 border-t pt-2">
                      <span>Net Amount Received:</span>
                      <span>
                        ₹
                        {(
                          selectedRegistration.amount -
                          calculateGatewayCharge(
                            selectedRegistration.amount,
                            selectedRegistration.paymentMethod
                          )
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedRegistration(null)}
              className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventRegistrations;


// import { useState } from 'react';

// const EventRegistrations = () => {
//   const [registrations] = useState([
//     {
//       id: 1,
//       userName: 'John Doe',
//       email: 'john@example.com',
//       phone: '9876543210',
//       college: 'ABC College',
//       event: 'Hackathon 2025',
//       category: 'Technical',
//       participationType: 'Solo',
//       teamSize: 1,
//       registrationDate: '2025-12-10',
//       paymentMethod: 'UPI',
//       paymentStatus: 'Paid',
//       amount: 200,
//       transactionId: 'TXN123456789',
//     },
//     {
//       id: 2,
//       userName: 'Jane Smith',
//       email: 'jane@example.com',
//       phone: '9876543211',
//       college: 'XYZ University',
//       event: 'Dance Battle',
//       category: 'Cultural',
//       participationType: 'Duet',
//       teamSize: 2,
//       registrationDate: '2025-12-11',
//       paymentMethod: 'Credit Card',
//       paymentStatus: 'Paid',
//       amount: 250,
//       transactionId: 'TXN987654321',
//     },
//     {
//       id: 3,
//       userName: 'Mike Johnson',
//       email: 'mike@example.com',
//       phone: '9876543212',
//       college: 'DEF Institute',
//       event: 'Hackathon 2025',
//       category: 'Technical',
//       participationType: 'Group',
//       teamSize: 5,
//       registrationDate: '2025-12-12',
//       paymentMethod: 'Debit Card',
//       paymentStatus: 'Pending',
//       amount: 500,
//       transactionId: 'TXN456789123',
//     },
//     {
//       id: 4,
//       userName: 'Sarah Williams',
//       email: 'sarah@example.com',
//       phone: '9876543213',
//       college: 'GHI College',
//       event: 'Coding Competition',
//       category: 'Technical',
//       participationType: 'Solo',
//       teamSize: 1,
//       registrationDate: '2025-12-13',
//       paymentMethod: 'UPI',
//       paymentStatus: 'Paid',
//       amount: 150,
//       transactionId: 'TXN789456123',
//     },
//     {
//       id: 5,
//       userName: 'Tom Brown',
//       email: 'tom@example.com',
//       phone: '9876543214',
//       college: 'JKL University',
//       event: 'Dance Battle',
//       category: 'Cultural',
//       participationType: 'Group',
//       teamSize: 6,
//       registrationDate: '2025-12-14',
//       paymentMethod: 'Net Banking',
//       paymentStatus: 'Paid',
//       amount: 720,
//       transactionId: 'TXN321654987',
//     },
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [eventFilter, setEventFilter] = useState('All Events');
//   const [paymentMethodFilter, setPaymentMethodFilter] = useState('All Methods');
//   const [paymentStatusFilter, setPaymentStatusFilter] = useState('All Status');
//   const [selectedRegistration, setSelectedRegistration] = useState(null);

//   // Get unique values for filters
//   const allEvents = ['All Events', ...new Set(registrations.map((r) => r.event))];
//   const allPaymentMethods = [
//     'All Methods',
//     ...new Set(registrations.map((r) => r.paymentMethod)),
//   ];
//   const allPaymentStatus = ['All Status', 'Paid', 'Pending', 'Failed'];

//   // Filter registrations
//   const filteredRegistrations = registrations.filter((reg) => {
//     const matchesSearch =
//       reg.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       reg.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       reg.transactionId.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesEvent = eventFilter === 'All Events' || reg.event === eventFilter;
//     const matchesPaymentMethod =
//       paymentMethodFilter === 'All Methods' ||
//       reg.paymentMethod === paymentMethodFilter;
//     const matchesPaymentStatus =
//       paymentStatusFilter === 'All Status' ||
//       reg.paymentStatus === paymentStatusFilter;

//     return (
//       matchesSearch &&
//       matchesEvent &&
//       matchesPaymentMethod &&
//       matchesPaymentStatus
//     );
//   });

//   // Calculate statistics
//   const totalRevenue = filteredRegistrations
//     .filter((r) => r.paymentStatus === 'Paid')
//     .reduce((sum, r) => sum + r.amount, 0);

//   const paidCount = filteredRegistrations.filter(
//     (r) => r.paymentStatus === 'Paid'
//   ).length;

//   const pendingCount = filteredRegistrations.filter(
//     (r) => r.paymentStatus === 'Pending'
//   ).length;

//   // Download CSV
//   const downloadCSV = () => {
//     const headers = [
//       'Registration ID',
//       'Name',
//       'Email',
//       'Phone',
//       'College',
//       'Event',
//       'Category',
//       'Participation Type',
//       'Team Size',
//       'Registration Date',
//       'Payment Method',
//       'Payment Status',
//       'Amount (₹)',
//       'Transaction ID',
//     ];

//     const rows = filteredRegistrations.map((reg) => [
//       reg.id,
//       reg.userName,
//       reg.email,
//       reg.phone,
//       reg.college,
//       reg.event,
//       reg.category,
//       reg.participationType,
//       reg.teamSize,
//       reg.registrationDate,
//       reg.paymentMethod,
//       reg.paymentStatus,
//       reg.amount,
//       reg.transactionId,
//     ]);

//     const csvContent = [
//       headers.join(','),
//       ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
//     ].join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);

//     link.setAttribute('href', url);
//     link.setAttribute(
//       'download',
//       `event_registrations_${eventFilter.replace(/\s+/g, '_')}_${
//         new Date().toISOString().split('T')[0]
//       }.csv`
//     );
//     link.style.visibility = 'hidden';

//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     setSearchTerm('');
//     setEventFilter('All Events');
//     setPaymentMethodFilter('All Methods');
//     setPaymentStatusFilter('All Status');
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">
//         Event Registrations
//       </h1>

//       {/* Statistics Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">Total Registrations</p>
//               <p className="text-3xl font-bold text-indigo-600">
//                 {filteredRegistrations.length}
//               </p>
//             </div>
//             <div className="text-4xl">📝</div>
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">Paid</p>
//               <p className="text-3xl font-bold text-green-600">{paidCount}</p>
//             </div>
//             <div className="text-4xl">✅</div>
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">Pending</p>
//               <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
//             </div>
//             <div className="text-4xl">⏳</div>
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">Total Revenue</p>
//               <p className="text-3xl font-bold text-purple-600">₹{totalRevenue}</p>
//             </div>
//             <div className="text-4xl">💰</div>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="bg-white rounded-lg shadow p-6 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//           {/* Search */}
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Search Registrations
//             </label>
//             <input
//               type="text"
//               placeholder="Search by name, email, college, or transaction ID..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           {/* Event Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Filter by Event
//             </label>
//             <select
//               value={eventFilter}
//               onChange={(e) => setEventFilter(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//             >
//               {allEvents.map((event, idx) => (
//                 <option key={idx} value={event}>
//                   {event}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Payment Method Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Payment Method
//             </label>
//             <select
//               value={paymentMethodFilter}
//               onChange={(e) => setPaymentMethodFilter(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//             >
//               {allPaymentMethods.map((method, idx) => (
//                 <option key={idx} value={method}>
//                   {method}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Payment Status Filter */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Payment Status
//             </label>
//             <select
//               value={paymentStatusFilter}
//               onChange={(e) => setPaymentStatusFilter(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//             >
//               {allPaymentStatus.map((status, idx) => (
//                 <option key={idx} value={status}>
//                   {status}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Active Filters Display */}
//         {(searchTerm ||
//           eventFilter !== 'All Events' ||
//           paymentMethodFilter !== 'All Methods' ||
//           paymentStatusFilter !== 'All Status') && (
//           <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
//             <span className="text-gray-600">Active filters:</span>
//             {searchTerm && (
//               <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
//                 Search: "{searchTerm}"
//               </span>
//             )}
//             {eventFilter !== 'All Events' && (
//               <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
//                 Event: {eventFilter}
//               </span>
//             )}
//             {paymentMethodFilter !== 'All Methods' && (
//               <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
//                 Method: {paymentMethodFilter}
//               </span>
//             )}
//             {paymentStatusFilter !== 'All Status' && (
//               <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
//                 Status: {paymentStatusFilter}
//               </span>
//             )}
//             <button
//               onClick={clearAllFilters}
//               className="text-red-600 hover:text-red-800 ml-2"
//             >
//               Clear all
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Registrations Table */}
//       <div className="bg-white rounded-lg shadow">
//         <div className="p-6 border-b flex justify-between items-center">
//           <h2 className="text-xl font-semibold">
//             All Registrations ({filteredRegistrations.length})
//           </h2>
//           <button
//             onClick={downloadCSV}
//             disabled={filteredRegistrations.length === 0}
//             className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
//           >
//             <span>📥</span>
//             Download CSV
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Event
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Participation
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Team Size
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Payment Method
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredRegistrations.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="10"
//                     className="px-6 py-8 text-center text-gray-500"
//                   >
//                     No registrations found matching the selected filters.
//                   </td>
//                 </tr>
//               ) : (
//                 filteredRegistrations.map((reg) => (
//                   <tr key={reg.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                       #{reg.id}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       <div>
//                         <p className="font-medium">{reg.userName}</p>
//                         <p className="text-xs text-gray-500">{reg.college}</p>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       <div>
//                         <p className="font-medium">{reg.event}</p>
//                         <p className="text-xs text-gray-500">{reg.category}</p>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-700">
//                       {reg.participationType}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-700">
//                       {reg.teamSize}
//                     </td>
//                     <td className="px-6 py-4 text-sm">
//                       <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
//                         {reg.paymentMethod}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm font-semibold text-gray-900">
//                       ₹{reg.amount}
//                     </td>
//                     <td className="px-6 py-4 text-sm">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           reg.paymentStatus === 'Paid'
//                             ? 'bg-green-100 text-green-800'
//                             : reg.paymentStatus === 'Pending'
//                             ? 'bg-yellow-100 text-yellow-800'
//                             : 'bg-red-100 text-red-800'
//                         }`}
//                       >
//                         {reg.paymentStatus}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {reg.registrationDate}
//                     </td>
//                     <td className="px-6 py-4 text-sm">
//                       <button
//                         onClick={() => setSelectedRegistration(reg)}
//                         className="text-indigo-600 hover:text-indigo-800"
//                       >
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Registration Details Modal */}
//       {selectedRegistration && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-start mb-4">
//               <h3 className="text-xl font-semibold">
//                 Registration Details #{selectedRegistration.id}
//               </h3>
//               <button
//                 onClick={() => setSelectedRegistration(null)}
//                 className="text-gray-500 hover:text-gray-700 text-xl"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="space-y-4">
//               {/* Participant Info */}
//               <div className="border-b pb-4">
//                 <h4 className="font-semibold text-gray-700 mb-2">
//                   Participant Information
//                 </h4>
//                 <div className="space-y-1 text-sm">
//                   <p>
//                     <strong>Name:</strong> {selectedRegistration.userName}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {selectedRegistration.email}
//                   </p>
//                   <p>
//                     <strong>Phone:</strong> {selectedRegistration.phone}
//                   </p>
//                   <p>
//                     <strong>College:</strong> {selectedRegistration.college}
//                   </p>
//                 </div>
//               </div>

//               {/* Event Info */}
//               <div className="border-b pb-4">
//                 <h4 className="font-semibold text-gray-700 mb-2">
//                   Event Information
//                 </h4>
//                 <div className="space-y-1 text-sm">
//                   <p>
//                     <strong>Event:</strong> {selectedRegistration.event}
//                   </p>
//                   <p>
//                     <strong>Category:</strong> {selectedRegistration.category}
//                   </p>
//                   <p>
//                     <strong>Participation Type:</strong>{' '}
//                     {selectedRegistration.participationType}
//                   </p>
//                   <p>
//                     <strong>Team Size:</strong> {selectedRegistration.teamSize}{' '}
//                     {selectedRegistration.teamSize === 1 ? 'person' : 'people'}
//                   </p>
//                   <p>
//                     <strong>Registration Date:</strong>{' '}
//                     {selectedRegistration.registrationDate}
//                   </p>
//                 </div>
//               </div>

//               {/* Payment Info */}
//               <div className="border-b pb-4">
//                 <h4 className="font-semibold text-gray-700 mb-2">
//                   Payment Information
//                 </h4>
//                 <div className="space-y-1 text-sm">
//                   <p>
//                     <strong>Payment Method:</strong>{' '}
//                     <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
//                       {selectedRegistration.paymentMethod}
//                     </span>
//                   </p>
//                   <p>
//                     <strong>Payment Status:</strong>{' '}
//                     <span
//                       className={`px-2 py-1 rounded text-xs font-medium ${
//                         selectedRegistration.paymentStatus === 'Paid'
//                           ? 'bg-green-100 text-green-800'
//                           : selectedRegistration.paymentStatus === 'Pending'
//                           ? 'bg-yellow-100 text-yellow-800'
//                           : 'bg-red-100 text-red-800'
//                       }`}
//                     >
//                       {selectedRegistration.paymentStatus}
//                     </span>
//                   </p>
//                   <p>
//                     <strong>Transaction ID:</strong>{' '}
//                     {selectedRegistration.transactionId}
//                   </p>
//                   <p className="text-lg font-bold text-indigo-600 mt-2">
//                     <strong>Amount Paid:</strong> ₹{selectedRegistration.amount}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={() => setSelectedRegistration(null)}
//               className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventRegistrations;
