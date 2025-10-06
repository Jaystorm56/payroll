"use client"

import { useEffect, useMemo, useState, useRef } from "react"
import { Search,MoreHorizontal, Edit, Trash2, Upload } from "lucide-react"
import { UserGroupIcon,AdjustmentsHorizontalIcon} from '@heroicons/react/24/solid';

const payrollHistoryData = []

function StatusBadge({ status }) {
  const isPending = status === "Pending"
  const bg = isPending ? "bg-[#FFF8EB]" : "bg-[#F0FAF0]"
  const dot = isPending ? "bg-[#EEA23E]" : "bg-[#2D8A39]"
  const text = isPending ? "text-[#EEA23E]" : "text-[#2D8A39]"

  return (
    <span className={`inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-[14px] font-[400] ${bg} ${text}`}>
      <span className={`h-2 w-2 rounded-full ${dot}`}></span>
      {status}
    </span>
  )
}

function ActionsDropdown({ item, onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-100 rounded transition-colors"
        title="Actions"
      >
        <MoreHorizontal className="h-4 w-4 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <button
            onClick={() => {
              onEdit(item)
              setIsOpen(false)
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors rounded-t-md"
          >
            <Edit className="h-4 w-4" />
            Edit
          </button>
          <button
            onClick={() => {
              onDelete(item)
              setIsOpen(false)
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-b-md"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

function Pagination({ currentPage, pageCount, onPageChange }) {
  const getPageNumbers = () => {
    const pages = []

    // Always show first page
    pages.push(1)

    if (currentPage <= 3) {
      // Show 1, 2, 3, ..., last
      if (pageCount >= 2) pages.push(2)
      if (pageCount >= 3) pages.push(3)
      if (pageCount > 4 && currentPage <= 2) {
        pages.push("...")
      }
      if (pageCount > 3 && currentPage <= 2) {
        pages.push(pageCount)
      }
    } else if (currentPage >= pageCount - 2) {
      // Show 1, ..., last-2, last-1, last
      if (pageCount > 4) {
        pages.push("...")
      }
      if (pageCount >= 3) pages.push(pageCount - 2)
      if (pageCount >= 2) pages.push(pageCount - 1)
      pages.push(pageCount)
    } else {
      // Show 1, ..., current-1, current, current+1, ..., last
      pages.push("...")
      pages.push(currentPage - 1)
      pages.push(currentPage)
      pages.push(currentPage + 1)
      if (currentPage + 1 < pageCount - 1) {
        pages.push("...")
      }
      pages.push(pageCount)
    }

    // Remove duplicates and ensure proper sequence
    const uniquePages = pages.filter((page, index, array) => page === "..." || array.indexOf(page) === index)

    return uniquePages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 bg-white disabled:opacity-50 hover:bg-gray-50 transition-colors"
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {pageNumbers.map((pageNum, index) =>
        pageNum === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors ${
              pageNum === currentPage
                ? "bg-[#2D8A39] text-white border border-[#2D8A39]"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {pageNum}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 bg-white disabled:opacity-50 hover:bg-gray-50 transition-colors"
        disabled={currentPage === pageCount}
      >
        &gt;
      </button>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
    <UserGroupIcon className="h-6 w-6 text-gray-500" />
       
      <h3 className="text-[16px] font-[500] text-[#5F6D7E] mb-1">No payroll history yet</h3>
      <p className="text-[14px] text-[#9CA3AF]">Start by processing payroll</p>
    </div>
  )
}

export default function PayrollHistory() {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [pageSize, setPageSize] = useState(5)
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [hasData, setHasData] = useState(false)
  const [isFullView, setIsFullView] = useState(false)

  const statuses = ["All Status", "Pending", "Paid"]

  const dataSource = hasData
    ? [
        {
          id: "PR-254834",
          periodFrom: "July 01, 2025",
          periodTo: "July 30, 2025",
          runDate: "August 01, 2025",
          employeesPaid: 8,
          totalNetPay: "#2,000,000",
          status: "Pending",
        },
        {
          id: "PR-254274",
          periodFrom: "August 01, 2025",
          periodTo: "August 30, 2025",
          runDate: "September 01, 2025",
          employeesPaid: 8,
          totalNetPay: "#2,000,000",
          status: "Paid",
        },
        {
          id: "PR-254009",
          periodFrom: "July 01, 2025",
          periodTo: "July 30, 2025",
          runDate: "August 01, 2025",
          employeesPaid: 8,
          totalNetPay: "#2,000,000",
          status: "Paid",
        },
        {
          id: "PR-254486",
          periodFrom: "September 01, 2025",
          periodTo: "September 30, 2025",
          runDate: "October 01, 2025",
          employeesPaid: 8,
          totalNetPay: "#2,000,000",
          status: "Paid",
        },
        {
          id: "PR-252374",
          periodFrom: "July 01, 2025",
          periodTo: "July 30, 2025",
          runDate: "August 01, 2025",
          employeesPaid: 8,
          totalNetPay: "#2,000,000",
          status: "Paid",
        },
      ]
    : payrollHistoryData

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return dataSource.filter((item) => {
      const matchesQuery = q
        ? [item.id, item.status, item.periodFrom, item.periodTo].join(" | ").toLowerCase().includes(q)
        : true
      const matchesStatus = statusFilter === "All Status" || item.status === statusFilter

      return matchesQuery && matchesStatus
    })
  }, [dataSource, query, statusFilter])

  const displayRows = isFullView ? filtered : filtered.slice(0, 5)
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const start = (currentPage - 1) * pageSize
  const rows = isFullView ? filtered.slice(start, start + pageSize) : displayRows

  useEffect(() => {
    setPage(1)
  }, [query, statusFilter, pageSize])

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  const handleEdit = (item) => {
    console.log("Edit item:", item)
    // i will add edit logic here
  }

  const handleDelete = (item) => {
    console.log("Delete item:", item)
    // i will add delete logic here
  }

  if (loading) {
    return (
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-6 py-6 rounded-[8px] bg-white mt-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading payroll history...</div>
        </div>
      </div>
    )
  }

  const isEmpty = dataSource.length === 0

  return (
    <div className="mx-auto w-full px-4 sm:px-6 lg:px-6 py-6 rounded-[8px] bg-white mt-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-[20px] font-[500] text-[#222222] mb-1">Payroll History</h2>
          {isFullView && <p className="text-[14px] text-[#5F6D7E]">Manage your employee payroll history</p>}
        </div>
        {!isEmpty && !isFullView && (
          <button
            onClick={() => setIsFullView(true)}
            className="px-6 py-2.5 bg-[#5F6D7E] text-white text-[14px] font-[500] rounded-md hover:bg-[#4A5568] transition-colors"
          >
            View All
          </button>
        )}
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-[947px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, or others..."
            className="w-full bg-[#F6F8F9] pl-9 pr-4 py-3 text-sm font-[400] placeholder-[#617286] focus:outline-none focus:ring-2 focus:ring-black rounded-md"
          />
        </div>

        <div className="flex gap-3">
          {isFullView && (
            <button className="flex items-center gap-2 px-6 bg-white text-[14px] border border-gray-200 font-[600] text-gray-700 rounded-md hover:bg-gray-50 py-3 transition-colors">
              <Upload className="w-4 h-4" />
              Export
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 bg-white text-[14px] border border-gray-200 font-[600] text-gray-700 rounded-md hover:bg-gray-50 py-3 transition-colors"
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5" />
            Filters
          </button>
        </div>
      </div>

      {isEmpty ? (
        <EmptyState />
      ) : (
        <>
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="text-left text-xs text-gray-500">
                    <th className="px-4 py-3 text-[14px] text-[#5F6D7E] font-[600] whitespace-nowrap">
                      Confirmation ID
                    </th>
                    <th className="px-4 py-3 text-[14px] text-[#5F6D7E] font-[600] whitespace-nowrap">
                      Payroll Period From
                    </th>
                    <th className="px-4 py-3 text-[14px] text-[#5F6D7E] font-[600] whitespace-nowrap">
                      Payroll Period To
                    </th>
                    <th className="px-4 py-3 text-[14px] text-[#5F6D7E] font-[600] whitespace-nowrap">Run Date</th>
                    <th className="px-4 py-3 text-[14px] text-[#5F6D7E] font-[600] whitespace-nowrap">
                      Employees Paid
                    </th>
                    <th className="px-4 py-3 text-[14px] text-[#5F6D7E] font-[600] whitespace-nowrap">Total Net Pay</th>
                    <th className="px-4 py-3 text-[14px] text-[#5F6D7E] font-[600] whitespace-nowrap">Status</th>
                    <th className="px-4 py-3 text-[14px] text-[#5F6D7E] font-[600] whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white text-sm">
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-10 text-center text-gray-500">
                        No payroll records found
                      </td>
                    </tr>
                  ) : (
                    rows.map((item, index) => (
                      <tr key={`${item.id}-${index}`} className="hover:bg-gray-50/60 transition-colors">
                        <td className="px-4 py-4 text-[#272D37] font-[400] text-[14px] whitespace-nowrap">{item.id}</td>
                        <td className="px-4 py-4 text-[#272D37] font-[400] text-[14px] whitespace-nowrap">
                          {item.periodFrom}
                        </td>
                        <td className="px-4 py-4 text-[#272D37] font-[400] text-[14px] whitespace-nowrap">
                          {item.periodTo}
                        </td>
                        <td className="px-4 py-4 text-[#272D37] font-[300] text-[14px] whitespace-nowrap">
                          {item.runDate}
                        </td>
                        <td className="px-4 py-4 text-[#272D37] font-[300] text-[14px] text-center whitespace-nowrap">
                          {item.employeesPaid}
                        </td>
                        <td className="px-4 py-4 text-[#272D37] font-[600] text-[14px] whitespace-nowrap">
                          {item.totalNetPay}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <StatusBadge status={item.status} />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap relative">
                          <ActionsDropdown item={item} onEdit={handleEdit} onDelete={handleDelete} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {isFullView && (
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Show result:</span>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="rounded-md border border-gray-200 bg-white px-2 py-1"
                >
                  <option value={5}>5</option>
                  <option value={8}>8</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>

              <Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={handlePageChange} />
            </div>
          )}
        </>
      )}

      <div className="mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={() => setHasData(!hasData)}
          className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
        >
          {hasData ? "Show Empty State" : "Show Data State"}
        </button>
        <span className="ml-3 text-sm text-gray-500">(Demo toggle)</span>
      </div>
    </div>
  )
}
