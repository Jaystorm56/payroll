import { useMemo, useRef, useState } from "react";
import {
  addEmployee,
  getDepartments,
  getJobTitles,
  getStatuses,
} from "../services/employees";
import downArrow from "../assets/icons/down.svg";
import logo from "../assets/images/logo.svg";

function FloatingInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  className = "",
  onFocusField,
}) {
  const hasValue = value && String(value).length > 0;
  return (
    <label className={`relative block ${className}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => onFocusField?.(name)}
        required={required}
        className="peer w-full h-[56px] rounded-md border border-gray-300 px-3 pt-4 focus:outline-none focus:ring-2 focus:ring-black"
      />
      <span
        className={`absolute left-3 text-[14px] font-[400] transition-all duration-150 pointer-events-none ${
          hasValue
            ? "top-1 text-xs text-gray-600"
            : "top-1/2 -translate-y-1/2 text-gray-500 text-[14px] font-[400]"
        }`}
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
    </label>
  );
}

function Dropdown({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  className = "",
  onFocusField,
}) {
  const [open, setOpen] = useState(false);
  const selected = useMemo(() => value || "", [value]);
  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          onFocusField?.(name);
        }}
        className="w-full h-[56px] rounded-md border border-gray-300 px-3 text-left flex items-center justify-between bg-white"
      >
        <div className="relative flex-1">
          <div
            className={`absolute left-0 top-1 text-[14px] text-gray-600 ${
              selected ? "" : "hidden"
            }`}
          >
            {label}
            {required && <span className="text-red-500"> *</span>}
          </div>
          <div className={`${selected ? "pt-4" : ""} text-gray-700`}>
            {selected || (
              <span className="text-gray-500 text-[14px] font-[600]">
                {label}
                {required && <span className="text-red-500"> *</span>}
              </span>
            )}
          </div>
        </div>
        <img
          src={downArrow}
          alt="open"
          className={`h-[6.25px] w-4 ml-2 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-lg p-2">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onFocusField?.(name);
                onChange({ target: { name, value: opt } });
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AddEmployeeForm({ onClose, onEmployeeAdded }) {
  const [formData, setFormData] = useState({
    // Personal
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    homeAddress: "",
    // Employment
    employeeId: "",
    jobTitle: "",
    department: "",
    employmentType: "",
    employmentMode: "",
    status: "Active",
    // Compensation & Payroll
    payRate: "",
    payType: "",
    // Bank
    bankName: "",
    accountNumber: "",
    accountName: "",
    taxId: "",
    // Leave
    vacationDays: "",
    sickDays: "",
  });
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState("personal");
  const contentRef = useRef(null);

  const departments = getDepartments();
  const jobTitles = getJobTitles();
  const statuses = getStatuses();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        jobTitle: formData.jobTitle,
        status: formData.status,
        ...formData,
      };
      await addEmployee(payload);
      onEmployeeAdded?.();
      onClose();
    } catch (error) {
      console.error("Error adding employee:", error);
    } finally {
      setLoading(false);
    }
  };

  const fieldToSection = useMemo(
    () => ({
      // Personal
      title: "personal",
      firstName: "personal",
      middleName: "personal",
      lastName: "personal",
      email: "personal",
      phone: "personal",
      homeAddress: "personal",
      country: "personal",
      state: "personal",
      city: "personal",
      // Employment
      employeeId: "employment",
      jobTitle: "employment",
      department: "employment",
      employmentType: "employment",
      employmentMode: "employment",
      status: "employment",
      // Compensation & Payroll (incl. bank info)
      payRate: "compensation",
      payType: "compensation",
      bankName: "compensation",
      accountNumber: "compensation",
      accountName: "compensation",
      taxId: "compensation",
      // Leave
      vacationDays: "leave",
      sickDays: "leave",
    }),
    []
  );

  const sectionForField = (name) => fieldToSection[name] || "personal";

  const handleFieldFocus = (name) => {
    setActiveStep(sectionForField(name));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setActiveStep(sectionForField(name));
  };

  const scrollTo = (id) => {
    const rootEl = contentRef.current;
    const el = rootEl?.querySelector(`#${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 bg-[#FBFBFB] flex flex-col">
        {/* Header - fixed */}
        <div className="flex items-center justify-between px-6 border-b h-[82px] bg-white">
          <img src={logo} alt="" className="w-[100px] h-[90px] ml-[130px]" />
          <button
            onClick={onClose}
            className="text-[26.48px] pr-[40px] text-[#000000] hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <div className="flex items-center justify-between px-6 border-b h-[108px]">
          <div className="text-[24px] font-[500] w-[360px] pl-[130px]">
            Add New Employee
          </div>
          {/* <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button> */}
        </div>

        {/* Body with right sidebar */}
        <div className="flex-1 overflow-hidden flex items-center justify-center ">
          <div className="h-full grid grid-cols-[1fr_300px] gap-8 px-6">
            {/* Scrollable content */}
            <div
              ref={contentRef}
              className="h-full overflow-y-auto w-[840px]  items-center "
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-8 flex flex-col items-center"
              >
                {/* Personal Information */}
                <section
                  id="personal"
                  className="h-[596px] w-[792px] bg-white px-4 py-8"
                >
                  <h3 className="mb-6 text-[16px] font-[500] text-[#000000]">
                    Personal Information
                  </h3>
                  <div className="flex gap-4 mb-4">
                    <Dropdown
                      label="Title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      onFocusField={handleFieldFocus}
                      required
                      options={["Mr", "Mrs", "Miss", "Ms", "Dr"]}
                      className="w-[240px]"
                    />
                    <FloatingInput
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      onFocusField={handleFieldFocus}
                      required
                      className="w-[536px]"
                    />
                  </div>
                  <div className="flex gap-4 mb-12">
                    <FloatingInput
                      label="Middle Name"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                      onFocusField={handleFieldFocus}
                      className="w-[388px]"
                    />
                    <FloatingInput
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onFocusField={handleFieldFocus}
                      required
                      className="w-[388px]"
                    />
                  </div>
                  <div className="mb-6 text-[16px] font-[500] text-[#000000]">
                    Contact Details
                  </div>
                  <div className="flex gap-4 mb-4">
                    <FloatingInput
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocusField={handleFieldFocus}
                      required
                      className="w-[388px]"
                    />
                    <FloatingInput
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocusField={handleFieldFocus}
                      required
                      className="w-[388px]"
                    />
                  </div>
                  <label className="relative block mb-4 w-[762px]">
                    <textarea
                      name="homeAddress"
                      value={formData.homeAddress}
                      onChange={handleChange}
                      onFocus={() => handleFieldFocus("homeAddress")}
                      required
                      className="peer w-full h-[100px] rounded-md border border-gray-300 px-3 pt-6 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <span className="absolute left-3 top-2 text-[14px] font-[400] text-gray-600">
                      Home Address <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="flex gap-4">
                    <Dropdown
                      label="Country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      onFocusField={handleFieldFocus}
                      required
                      options={["Nigeria", "Ghana", "Kenya"]}
                      className="w-[253px]"
                    />
                    <Dropdown
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      onFocusField={handleFieldFocus}
                      required
                      options={["Lagos", "Abuja", "Kano"]}
                      className="w-[253px]"
                    />
                    <Dropdown
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      onFocusField={handleFieldFocus}
                      required
                      options={["Ikeja", "Lekki", "Yaba"]}
                      className="w-[253px]"
                    />
                  </div>
                </section>

                {/* Employment Details */}
                <section
                  id="employment"
                  className="mt-8 w-[792px] h-[248px] px-4 py-8 bg-white"
                >
                  <h3 className="mb-6 text-[16px] font-[500] text-[#000000]">
                    Employment Details
                  </h3>
                  <div className="gap-4 w-full">
                    <div className="flex mb-8 gap-4">
                      <FloatingInput
                        label="Employee ID"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        onFocusField={handleFieldFocus}
                        required
                        className="w-[253px]"
                      />
                      <Dropdown
                        label="Job Title"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        onFocusField={handleFieldFocus}
                        required
                        options={jobTitles}
                        className="w-[253px]"
                      />
                      <Dropdown
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        onFocusField={handleFieldFocus}
                        required
                        options={departments}
                        className="w-[253px]"
                      />
                    </div>
                    <div className="flex gap-4">
                      <Dropdown
                        label="Employment Type"
                        name="employmentType"
                        value={formData.employmentType}
                        onChange={handleChange}
                        onFocusField={handleFieldFocus}
                        required
                        options={["Full-time", "Part-time", "Contract"]}
                        className="w-[253px]"
                      />
                      <Dropdown
                        label="Employment Mode"
                        name="employmentMode"
                        value={formData.employmentMode}
                        onChange={handleChange}
                        onFocusField={handleFieldFocus}
                        required
                        options={["Remote", "Onsite", "Hybrid"]}
                        className="w-[253px]"
                      />
                      <Dropdown
                        label="Employment Status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        onFocusField={handleFieldFocus}
                        required
                        options={statuses}
                        className="w-[253px]"
                      />
                    </div>
                  </div>
                </section>

                {/* Compensation & Payroll */}
                <section>
                  <section
                    id="compensation"
                    className="mt-8 w-[792px] bg-white px-4 py-8"
                  >
                    <h3 className="mb-6 text-[16px] font-[500] text-[#000000]">
                      Compensation & Payroll
                    </h3>
                    <div className="flex gap-4">
                      <FloatingInput
                        label="Pay Rate"
                        name="payRate"
                        value={formData.payRate}
                        onChange={handleChange}
                        onFocusField={handleFieldFocus}
                        required
                        className="w-[388px]"
                      />
                      <Dropdown
                        label="Pay Type"
                        name="payType"
                        value={formData.payType}
                        onChange={handleChange}
                        onFocusField={handleFieldFocus}
                        required
                        options={["Monthly", "Weekly", "Hourly"]}
                        className="w-[388px]"
                      />
                    </div>
                  </section>

                  {/* Bank Account Information */}
                  <section className="w-[792px] bg-white px-4 py-8">
                    <h3 className="mb-6 text-[16px] font-[500] text-[#000000]">
                      Bank Account Information
                    </h3>
                    <div className="gap-4 ">
                      <div className="mb-8 flex gap-4">
                        <FloatingInput
                          label="Bank Name"
                          name="bankName"
                          value={formData.bankName}
                          onChange={handleChange}
                          onFocusField={handleFieldFocus}
                          required
                          className="w-[388px]"
                        />
                        <FloatingInput
                          label="Account Number"
                          name="accountNumber"
                          value={formData.accountNumber}
                          onChange={handleChange}
                          onFocusField={handleFieldFocus}
                          required
                          className="w-[388px]"
                        />
                      </div>
                      <div className="flex gap-4">
                        <FloatingInput
                          label="Account Name"
                          name="accountName"
                          value={formData.accountName}
                          onChange={handleChange}
                          onFocusField={handleFieldFocus}
                          required
                          className="w-[388px]"
                        />
                        <FloatingInput
                          label="Tax ID/Social Security Number"
                          name="taxId"
                          value={formData.taxId}
                          onChange={handleChange}
                          onFocusField={handleFieldFocus}
                          required
                          className="w-[388px]"
                        />
                      </div>
                    </div>
                  </section>
                </section>

                {/* Leave Information */}
                <section
                  id="leave"
                  className="mt-8 w-[792px] h-[164px] bg-white px-4 py-8"
                >
                  <h3 className="mb-6 text-[16px] font-[500] text-[#000000]">
                    Leave Information
                  </h3>
                  <div className="flex gap-4">
                    <FloatingInput
                      label="Vacation Days"
                      name="vacationDays"
                      type="number"
                      value={formData.vacationDays}
                      onChange={handleChange}
                      onFocusField={handleFieldFocus}
                      required
                      className="w-[388px]"
                    />
                    <FloatingInput
                      label="Sick Days"
                      name="sickDays"
                      type="number"
                      value={formData.sickDays}
                      onChange={handleChange}
                      onFocusField={handleFieldFocus}
                      required
                      className="w-[388px]"
                    />
                  </div>
                </section>

                {/* Spacer to avoid last field hidden behind footer */}
                <div className="h-4" />
              </form>
            </div>

            {/* Right Sidebar - fixed in modal */}
            <aside className="mt-4 w-[376px] ">
              <div className="space-y-3 px-8 py-8 h-[318px] bg-white rounded-[8px]">
                {[
                  { id: "personal", num: 1, label: "Personal Information" },
                  { id: "employment", num: 2, label: "Employment Details" },
                  {
                    id: "compensation",
                    num: 3,
                    label: "Compensation & Payroll",
                  },
                  { id: "leave", num: 4, label: "Leave Information" },
                ].map((s) => {
                  const isActive = activeStep === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => scrollTo(s.id)}
                      className={`w-full h-[56px] rounded-lg border flex items-center gap-3 px-4 ${
                        isActive
                          ? "bg-black text-white"
                          : "bg-[rgba(218,218,218,0.4)] text-black"
                      }`}
                    >
                      <span
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium ${
                          isActive
                            ? "bg-white text-black"
                            : "bg-[rgba(217,217,217,1)] text-black"
                        }`}
                      >
                        {s.num}
                      </span>
                      <span
                        className={`font-medium text-[14px] ${
                          isActive ? "text-white" : "text-black"
                        }`}
                      >
                        {s.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>

        {/* Footer - fixed */}
        <div className="h-[96px] flex items-center justify-end px-16 bg-white">
          <button
            form="" // same page form
            onClick={() => {}}
            disabled={loading}
            className="px-6 py-2 h-[48px] w-[200px] rounded-md bg-black text-white text-[16px] font-[600] hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
}
