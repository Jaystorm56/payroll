import { useState } from 'react'

export default function EmployeeActionsModal({ employee, onClose, onViewProfile, onEditProfile, onViewPaymentHistory }) {
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(onClose, 150) // Allow animation to complete
  }

  const handleAction = (action) => {
    action(employee)
    handleClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Employee Actions</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => handleAction(onViewProfile)}
            className="w-full text-left px-4 py-3 rounded-md hover:bg-gray-50 border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">👤</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">View Profile</div>
                <div className="text-sm text-gray-500">View employee details</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleAction(onEditProfile)}
            className="w-full text-left px-4 py-3 rounded-md hover:bg-gray-50 border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✏️</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">Edit Profile</div>
                <div className="text-sm text-gray-500">Update employee information</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleAction(onViewPaymentHistory)}
            className="w-full text-left px-4 py-3 rounded-md hover:bg-gray-50 border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-sm">💰</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">View Payment History</div>
                <div className="text-sm text-gray-500">View salary and payment records</div>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
