import { useEffect, useMemo, useState } from 'react'
import { fetchEmployees, buildAvatar } from '../services/employees'
import avatarFallback from '../assets/images/Avatar.svg'
import searchIcon from '../assets/icons/Search.svg'
import filterIcon from '../assets/icons/filter.svg'

function StatusBadge({ status }) {
  const isActive = status === 'Active'
  const bg = isActive ? 'bg-[#DBF5E7]' : 'bg-[#FFEED9]'
  const dot = isActive ? 'bg-[#22C55E]' : 'bg-[#F59E0B]'
  const text = isActive ? 'text-[#119A48]' : 'text-[#B37721]'
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs ${bg} ${text}`}>
      <span className={`h-2 w-2 rounded-full ${dot}`}></span>
      {status}
    </span>
  )
}

export default function EmployeeList() {
  const [loading, setLoading] = useState(true)
  const [employees, setEmployees] = useState([])
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All') // All | Active | On Leave
  const [pageSize, setPageSize] = useState(5)
  const [page, setPage] = useState(1)
  const [openFilter, setOpenFilter] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      const data = await fetchEmployees()
      if (mounted) {
        setEmployees(data)
        setLoading(false)
      }
    })()
    return () => (mounted = false)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return employees.filter((e) => {
      const matchesQuery = q
        ? [e.id, e.name, e.email, e.phone, e.department, e.jobTitle]
            .join(' | ')
            .toLowerCase()
            .includes(q)
        : true
      const matchesStatus = status === 'All' ? true : e.status === status
      return matchesQuery && matchesStatus
    })
  }, [employees, query, status])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const start = (currentPage - 1) * pageSize
  const rows = filtered.slice(start, start + pageSize)

  useEffect(() => {
    // reset to first page when filters change
    setPage(1)
  }, [query, status, pageSize])

  // Ensure we don't exceed available data
  const actualRows = rows.slice(0, pageSize)

  return (
    <div className="mx-auto w-[1250px] px-4 sm:px-6 lg:px-6 py-6 rounded-[8px] bg-white mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[20px] font-semibold text-[#222222]">Employee List</h2>
       
      </div>

      <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <img src={searchIcon} alt="Search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, or others..."
              className="w-[947px] h-[36px] bg-[#F6F8F9] pl-9 pr-4 py-2 text-sm font-[600] placeholder-[#617286] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenFilter((v) => !v)}
              className="inline-flex items-center justify-center gap-2 bg-[#F6F8F9] w-[140px] h-[36px] px-4 py-2 text-sm font-[600] text-[#222222] rounded-md"
              aria-haspopup="listbox"
              aria-expanded={openFilter}
            >
              <img src={filterIcon} alt="Filter" className="h-4 w-4" />
              <span>{status === 'All' ? 'Filters' : status}</span>
            </button>
            {openFilter && (
              <div className="absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
                <button onClick={() => { setStatus('All'); setOpenFilter(false) }} className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50">All</button>
                <button onClick={() => { setStatus('Active'); setOpenFilter(false) }} className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50">Active</button>
                <button onClick={() => { setStatus('On Leave'); setOpenFilter(false) }} className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50">On Leave</button>
              </div>
            )}
          </div>
        </div>

      <div className="overflow-hidden ">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="">
            <tr className="text-left text-xs text-gray-500">
              <th className="px-4 py-3">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
              </th>
              <th className="px-4 py-3 font-medium">Employee ID</th>
              <th className="px-4 py-3 font-medium">Employee's Name</th>
              <th className="px-4 py-3 font-medium">Contact Number</th>
              <th className="px-4 py-3 font-medium">Email Address</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Job Title</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white text-sm">
            {loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-gray-500">
                  Loading employees...
                </td>
              </tr>
            ) : actualRows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-gray-500">
                  No results
                </td>
              </tr>
            ) : (
              actualRows.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50/60">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-4 text-gray-700">{e.id}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={buildAvatar(e.avatar) || avatarFallback}
                        alt={e.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span className="text-gray-900">{e.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-700">{e.phone}</td>
                  <td className="px-4 py-4 text-gray-700">{e.email}</td>
                  <td className="px-4 py-4 text-gray-700">{e.department}</td>
                  <td className="px-4 py-4 text-gray-700">{e.jobTitle}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={e.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Show results:</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="rounded-md border border-gray-200 bg-white px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-md border border-gray-200 bg-white px-2 py-1 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="px-2 text-gray-700">
            {currentPage} / {pageCount}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            className="rounded-md border border-gray-200 bg-white px-2 py-1 disabled:opacity-50"
            disabled={currentPage === pageCount}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

