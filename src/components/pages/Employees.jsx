import { useEffect, useMemo, useState } from "react";
import {
  fetchEmployees,
  fetchUser,
  buildAvatar,
  exportEmployees,
  deleteEmployees,
  getDepartments,
  getJobTitles,
  getStatuses,
} from "../../services/employees";
import avatarFallback from "../../assets/images/Avatar.svg";
import searchIcon from "../../assets/icons/Search.svg";
import plusIcon from "../../assets/icons/plus.svg";
import exportIcon from "../../assets/icons/export.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import AddEmployeeForm from "../AddEmployeeForm";
import EmployeeActionsModal from "../EmployeeActionsModal";

function StatusBadge({ status }) {
  const isActive = status === "Active";
  const bg = isActive ? "bg-[#F0FAF0]" : "bg-[#FFF8EB]";
  const dot = isActive ? "bg-[#2D8A39]" : "bg-[#EEA23E]";
  const text = isActive ? "text-[#2D8A39]" : "text-[#EEA23E]";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[14px] font-[400] ${bg} ${text}`}
    >
      <span className={`h-2 w-2 rounded-full ${dot}`}></span>
      {status}
    </span>
  );
}

export default function Employees() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All Department");
  const [status, setStatus] = useState("All Status");
  const [jobTitle, setJobTitle] = useState("All Title");
  const [employeeType, setEmployeeType] = useState("All Types");
  const [pageSize, setPageSize] = useState(8);
  const [page, setPage] = useState(1);
  const [selectedEmployees, setSelectedEmployees] = useState(new Set());
  const [showAddForm, setShowAddForm] = useState(false);
  const [showActionsModal, setShowActionsModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const departments = ["All Department", ...getDepartments()];
  const statuses = ["All Status", ...getStatuses()];
  const jobTitles = ["All Title", ...getJobTitles()];
  const employeeTypes = ["All Types", "Full-time", "Part-time", "Contract"];

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const [userData, employeeData] = await Promise.all([
        fetchUser(),
        fetchEmployees(),
      ]);
      if (mounted) {
        setUser(userData);
        setEmployees(employeeData);
        setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return employees.filter((e) => {
      const matchesQuery = q
        ? [e.id, e.name, e.email, e.phone, e.department, e.jobTitle]
            .join(" | ")
            .toLowerCase()
            .includes(q)
        : true;
      const matchesDepartment =
        department === "All Department" || e.department === department;
      const matchesStatus = status === "All Status" || e.status === status;
      const matchesJobTitle =
        jobTitle === "All Title" || e.jobTitle === jobTitle;
      // Note: employeeType filtering would need to be added to employee data structure
      const matchesType = employeeType === "All Types"; // For now, all employees match

      return (
        matchesQuery &&
        matchesDepartment &&
        matchesStatus &&
        matchesJobTitle &&
        matchesType
      );
    });
  }, [employees, query, department, status, jobTitle, employeeType]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * pageSize;
  const rows = filtered.slice(start, start + pageSize);

  useEffect(() => {
    setPage(1);
  }, [query, department, status, jobTitle, employeeType, pageSize]);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedEmployees(new Set(rows.map((emp) => emp.id)));
    } else {
      setSelectedEmployees(new Set());
    }
  };

  const handleSelectEmployee = (employeeId, checked) => {
    const newSelected = new Set(selectedEmployees);
    if (checked) {
      newSelected.add(employeeId);
    } else {
      newSelected.delete(employeeId);
    }
    setSelectedEmployees(newSelected);
  };

  const handleExportAll = () => {
    exportEmployees(filtered);
  };

  const handleExportSelected = () => {
    const selected = filtered.filter((emp) => selectedEmployees.has(emp.id));
    exportEmployees(selected);
  };

  const handleDeleteSelected = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedEmployees.size} employee(s)?`
      )
    ) {
      await deleteEmployees([...selectedEmployees]);
      setSelectedEmployees(new Set());
      // Refresh data
      const newData = await fetchEmployees();
      setEmployees(newData);
    }
  };

  const handleClearSelection = () => {
    setSelectedEmployees(new Set());
  };

  const handleEmployeeAdded = async () => {
    const newData = await fetchEmployees();
    setEmployees(newData);
  };

  const handleViewProfile = (employee) => {
    console.log("View profile:", employee);
    //  view profile functionality
  };

  const handleEditProfile = (employee) => {
    console.log("Edit profile:", employee);
    //  edit profile functionality
  };

  const handleViewPaymentHistory = (employee) => {
    console.log("View payment history:", employee);
    //  view payment history functionality
  };

  const openActionsModal = (employee) => {
    setSelectedEmployee(employee);
    setShowActionsModal(true);
  };

  const isAllSelected =
    rows.length > 0 && rows.every((emp) => selectedEmployees.has(emp.id));
  const isSomeSelected = selectedEmployees.size > 0;

  if (loading) {
    return (
      <div className="mx-auto w-[1250px] px-4 sm:px-6 lg:px-6 py-6 rounded-[8px] bg-white mt-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading employees...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto w-[1245px] pt-12  ">
        {/* Welcome Header */}
        <h1 className="text-[32px] md:text-3xl font-[500] text-[#000000]">
          Welcome {user?.firstName} 👋
        </h1>
      </div>
      <div className="mx-auto w-[1250px] px-4 sm:px-6 lg:px-6 py-6 rounded-[8px] bg-white mt-8">
        
        <div className="mb-8 flex items-center justify-between border-b border-[rgba(218,218,218,1)] ">
          {/* Employee List Section */}
          <div className="mb-6">
            <h2 className="text-[20px] font-[500] text-[#222222] mb-1">
              Employee List
            </h2>
            <p className="text-[rgba(34,34,34,0.5)] text-[14px] font-400">
              Manage your team members and their information.
            </p>
          </div>

          <div className="flex gap-3 h-[70px]">
            <button
              onClick={handleExportAll}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-[14px] font-[600] text-gray-700 rounded-md hover:bg-gray-200 w-[120px] h-[40px]"
            >
              <span className="w-[16px] h-[16px] flex items-center justify-center">
                <img src={exportIcon} alt="" className="w-[14px] h-[13px]" />
              </span>
              Export
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white text-[14px] font-[600px] rounded-md hover:bg-gray-800 w-[200px] h-[40px]"
            >
              <span className="w-[20px] h-[20px] flex items-center justify-center">
                <img src={plusIcon} alt="" className="w-[14px] h-[14px]" />
              </span>
              Add New Employee
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <img
              src={searchIcon}
              alt="Search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, or others..."
              className="w-[464px] h-[36px] bg-[#F6F8F9] pl-9 pr-4 py-2 text-sm font-[400] placeholder-[#617286] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="bg-[#F6F8F9] w-[160px] h-[36px] px-4 py-2 text-sm font-[400] text-[#617286] focus:outline-none"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-[#F6F8F9] w-[160px] h-[36px] px-4 py-2 text-[14px] font-[400] text-[#617286] focus:outline-none"
            >
              {statuses.map((stat) => (
                <option key={stat} value={stat}>
                  {stat}
                </option>
              ))}
            </select>
            <select
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="bg-[#F6F8F9] w-[160px] h-[36px] px-4 py-2 text-[14px] font-[400] text-[#617286] focus:outline-none"
            >
              {jobTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
            <select
              value={employeeType}
              onChange={(e) => setEmployeeType(e.target.value)}
              className="bg-[#F6F8F9] w-[160px] h-[36px] px-4 py-2 text-[14px] font-[400] text-[#617286] focus:outline-none"
            >
              {employeeTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Items Actions */}
        {isSomeSelected && (
          <div className="bg-[#F6F8F9] border border-blue-200 rounded-md p-3 mb-4 flex items-center justify-between h-[72px]">
            <div className="flex items-center gap-4">
              <span className="text-[#617286] text-[14px] font-[600] flex items-center justify-center bg-[#FFFFFF] w-[88px] h-[29px] rounded-[8px]">
                {selectedEmployees.size} selected
              </span>
              <button
                onClick={handleClearSelection}
                className="text-[#617286] text-[14px] font-[600] w-[88px] h-[29px] flex items-center gap-1"
              >
                <span>✕</span>
                Clear
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleExportSelected}
                className="flex items-center justify-center gap-2 px-3 py-1 bg-[#F6F8F9] border-[0.5px] border-[rgba(95,109,126,0.5)] text-[14px] font-[500] text-[#222222] rounded w-[156px] h-[40px]"
              >
                <span>
                  <img src={exportIcon} alt="" className="w-[14px] h-[13px]" />
                </span>
                Export Selected
              </button>
              <button
                onClick={handleDeleteSelected}
                className="flex items-center justify-center gap-2 px-3 py-1 bg-[rgba(255,0,0,0.05)] text-[14px] font-[500] text-[rgba(255,0,0,1)] border-[0.5px] border-[rgba(255,0,0,0.5)] rounded hover:bg-red-200 w-[97px] h-[40px]"
              >
                <span>
                  <img src={deleteIcon} alt="" />
                </span>
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-hidden ">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="">
              <tr className="text-left text-xs text-gray-500">
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                    checked={isAllSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
                <th className="px-4 py-3 text-[14px] text-[#5F6D7E] font-[800]">
                  Employee ID
                </th>
                <th className="px-4 py-3 text-[14px] text-[#5F6D7E] font-[800]">
                  Employee's Name
                </th>
                <th className="px-4 py-3 text-[14px] text-[#5F6D7E] font-[800]">
                  Contact Number
                </th>
                <th className=" py-3 text-[14px] text-[#5F6D7E] font-[800]">
                  Department
                </th>
                <th className=" py-3 text-[14px] text-[#5F6D7E] font-[800]">
                  Job Title
                </th>
                <th className="px-4 py-3 text-[14px] text-[#5F6D7E] font-[800]">
                  Status
                </th>
                <th className="px-4 py-3 text-[14px] text-[#5F6D7E] font-[800]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-sm">
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-10 text-center text-gray-500"
                  >
                    No results
                  </td>
                </tr>
              ) : (
                rows.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50/60 ">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300"
                        checked={selectedEmployees.has(e.id)}
                        onChange={(event) =>
                          handleSelectEmployee(e.id, event.target.checked)
                        }
                      />
                    </td>
                    <td className="px-4 py-4 text-[#272D37] font-[400] text-[14px]">
                      {e.id}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={buildAvatar(e.avatar) || avatarFallback}
                          alt={e.name}
                          className="h-[32px] w-[32px] rounded-full object-cover"
                        />
                        <span className="text-[#272D37] text-[14px] font-[600]">
                          {e.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[#272D37] font-[400] text-[14px]">
                      {e.phone}
                    </td>
                    <td className="text-[#272D37] text-[14px] font-[600]">
                      {e.department}
                    </td>
                    <td className="text-[#272D37] text-[14px] font-[600]">
                      {e.jobTitle}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={e.status} />
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => openActionsModal(e)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ⋯
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
          <div className="flex items-center gap-1 text-sm">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-md border border-gray-200 bg-white px-2 py-1 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <span className="px-2 text-gray-700">{currentPage}</span>
            {currentPage < pageCount && (
              <>
                <span className="px-1 text-gray-400">2</span>
                <span className="px-1 text-gray-400">...</span>
                <span className="px-1 text-gray-400">{pageCount - 1}</span>
                <span className="px-1 text-gray-400">{pageCount}</span>
              </>
            )}
            <button
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              className="rounded-md border border-gray-200 bg-white px-2 py-1 disabled:opacity-50"
              disabled={currentPage === pageCount}
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Modals */}
        {showAddForm && (
          <AddEmployeeForm
            onClose={() => setShowAddForm(false)}
            onEmployeeAdded={handleEmployeeAdded}
          />
        )}

        {showActionsModal && selectedEmployee && (
          <EmployeeActionsModal
            employee={selectedEmployee}
            onClose={() => {
              setShowActionsModal(false);
              setSelectedEmployee(null);
            }}
            onViewProfile={handleViewProfile}
            onEditProfile={handleEditProfile}
            onViewPaymentHistory={handleViewPaymentHistory}
          />
        )}
      </div>
    </>
  );
}
