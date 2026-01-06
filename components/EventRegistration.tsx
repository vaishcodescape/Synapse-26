'use client'

import { useState } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/navigation'

// Type definition for the Window object to include Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function EventRegistration({ event, user }: { event: any, user: any }) {
  const router = useRouter()
  const [selectedFeeId, setSelectedFeeId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  // 1. Handle the Payment Flow
  const handlePayment = async () => {
    if (!selectedFeeId) {
      alert('Please select a participation type first.')
      return
    }

    // if (!user) {
    //   router.push('/login')
    //   return
    // }
    const testUser = { 
        id: "05b2d28d-7454-411e-a64f-5a176e00dbdf", 
        email: "neha.singh@gmail.com",
        user_metadata: { full_name: "Neha Singh", phone: "9567891234" }
    }

    setLoading(true)

    try {
      // A. Create Order (Backend)
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        body: JSON.stringify({ 
          event_id: event.event_id,
          fee_id: selectedFeeId, 
          user_id: testUser.id 
        }),
      })

      const orderData = await orderRes.json()

      if (!orderRes.ok) throw new Error(orderData.error || 'Error creating order')

      // B. Configure Razorpay Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Must be in .env.local
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Synapse 2026", // Or your event name
        description: `Registration for ${event.event_name}`,
        order_id: orderData.orderId,
        // C. Success Handler (User paid successfully)
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                event_id: event.event_id,
                fee_id: selectedFeeId,
                user_id: testUser.id
              }),
            })

            const verifyData = await verifyRes.json()

            if (verifyData.success) {
              alert('Registration Successful!')
              router.refresh() // Refresh page to show "Registered" status if you have one
              // Optional: Redirect to a "My Tickets" page
              // router.push('/dashboard/tickets')
            } else {
              alert('Payment verification failed! Please contact support.')
            }
          } catch (err) {
            console.error(err)
            alert('Payment verification failed locally.')
          }
        },
        // D. Prefill User Data (Better UX)
        prefill: {
          name: "Neha Singh", //user.user_metadata?.full_name || '',
          email: "neha.singh@gmail.com",
          contact: "9567891234"
        },
        theme: {
          color: "#3399cc",
        },
      }

      // E. Open the Popup
      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', function (response: any){
        alert(`Payment Failed: ${response.error.description}`)
      })
      rzp.open()

    } catch (error: any) {
      console.error('Payment Error:', error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      {/* 0. Load Razorpay Script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <h3 className="text-xl font-bold mb-4 text-gray-800">Select Participation Type</h3>
      
      {/* 1. Fee Selection List */}
      <div className="space-y-3 mb-6">
        {event.event_fee?.map((item: any) => {
          const fee = item.fee
          // Capitalize first letter of type (solo -> Solo)
          const typeLabel = fee.participation_type.charAt(0).toUpperCase() + fee.participation_type.slice(1)
          
          return (
            <label 
              key={fee.fee_id} 
              className={`flex items-center justify-between p-4 border rounded cursor-pointer transition-all ${
                selectedFeeId === fee.fee_id 
                  ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  name="fee_selection" 
                  value={fee.fee_id}
                  checked={selectedFeeId === fee.fee_id}
                  onChange={() => setSelectedFeeId(fee.fee_id)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="font-medium text-gray-900">
                  {typeLabel} <span className="text-gray-500 text-sm">({fee.min_members} - {fee.max_members} members)</span>
                </span>
              </div>
              <span className="font-bold text-gray-900">₹{fee.price}</span>
            </label>
          )
        })}
      </div>

      {/* 2. Pay Button */}
      <button 
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : 'Proceed to Pay'}
      </button>
      
      {/* DAU Free Notice (Optional - based on your toggle) */}
      {event.is_dau_free && (
         <p className="text-xs text-green-600 mt-2 text-center">
           * Free for verified DAU students (Login with @dau.ac.in email)
           {/* You can add separate logic to bypass payment if user is DAU */}
         </p>
      )}
    </div>
  )
}