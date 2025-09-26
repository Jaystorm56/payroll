import avatarFallback from '../assets/images/Avatar.svg'

// Mock user data
export const mockUser = {
  firstName: 'Ayomide',
  lastName: 'James',
  role: 'Admin',
  avatar: avatarFallback,
}

const sampleEmployees = [
  {
    id: '#TS2387',
    name: 'James Trafford',
    email: 'jamestrafford@meezak.com',
    phone: '08136396354',
    department: 'Development',
    jobTitle: 'Frontend Developer',
    status: 'On Leave',
    avatar: avatarFallback,
  },
  {
    id: '#SF2906',
    name: 'Patrick Drogo',
    email: 'patrickdrogo@meezak.com',
    phone: '09023456789',
    department: 'Human Resource',
    jobTitle: 'Recruitment Specialist',
    status: 'Active',
    avatar: avatarFallback,
  },
  {
    id: '#BG2673',
    name: 'Dan James',
    email: 'danjames@meezak.com',
    phone: '07012345678',
    department: 'Design',
    jobTitle: 'UI/UX Designer',
    status: 'On Leave',
    avatar: avatarFallback,
  },
  {
    id: '#KY2853',
    name: 'Anthony Tailor',
    email: 'anthonytailor@meezak.com',
    phone: '08034257859',
    department: 'Automation',
    jobTitle: 'Testing and AI',
    status: 'Active',
    avatar: avatarFallback,
  },
  {
    id: '#AW2986',
    name: 'James Pickford',
    email: 'jamespickford@meezak.com',
    phone: '09027368573',
    department: 'Research',
    jobTitle: 'Researcher',
    status: 'On Leave',
    avatar: avatarFallback,
  },
  {
    id: '#RT2391',
    name: 'Sarah Johnson',
    email: 'sarahjohnson@meezak.com',
    phone: '08123456789',
    department: 'Development',
    jobTitle: 'Backend Developer',
    status: 'Active',
    avatar: avatarFallback,
  },
  {
    id: '#PL2456',
    name: 'Michael Brown',
    email: 'michaelbrown@meezak.com',
    phone: '07098765432',
    department: 'Design',
    jobTitle: 'Graphic Designer',
    status: 'Active',
    avatar: avatarFallback,
  },
  {
    id: '#QW2678',
    name: 'Emily Davis',
    email: 'emilydavis@meezak.com',
    phone: '08012345678',
    department: 'Human Resource',
    jobTitle: 'HR Manager',
    status: 'On Leave',
    avatar: avatarFallback,
  },
]

// Get unique values for filters
export const getDepartments = () => [...new Set(sampleEmployees.map(emp => emp.department))]
export const getJobTitles = () => [...new Set(sampleEmployees.map(emp => emp.jobTitle))]
export const getStatuses = () => [...new Set(sampleEmployees.map(emp => emp.status))]

export async function fetchEmployees() {
  // Simulate network latency
  await new Promise((res) => setTimeout(res, 300))
  return structuredClone(sampleEmployees)
}

export async function fetchUser() {
  // Simulate network latency
  await new Promise((res) => setTimeout(res, 100))
  return structuredClone(mockUser)
}

export function buildAvatar(src) {
  return src || avatarFallback
}

// Export functions
export function exportEmployees(employees) {
  const csvContent = [
    ['Employee ID', 'Name', 'Email', 'Phone', 'Department', 'Job Title', 'Status'],
    ...employees.map(emp => [
      emp.id,
      emp.name,
      emp.email,
      emp.phone,
      emp.department,
      emp.jobTitle,
      emp.status
    ])
  ].map(row => row.join(',')).join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'employees.csv'
  a.click()
  window.URL.revokeObjectURL(url)
}

// Add new employee
export async function addEmployee(employeeData) {
  const newEmployee = {
    id: `#${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    ...employeeData,
    avatar: avatarFallback,
  }
  sampleEmployees.push(newEmployee)
  return newEmployee
}

// Delete employees
export async function deleteEmployees(employeeIds) {
  const indices = employeeIds.map(id => sampleEmployees.findIndex(emp => emp.id === id))
  indices.sort((a, b) => b - a) // Delete from end to avoid index issues
  indices.forEach(index => {
    if (index !== -1) sampleEmployees.splice(index, 1)
  })
  return true
}