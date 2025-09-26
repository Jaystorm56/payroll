import logo from '../assets/images/logo.svg'
import homeIcon from '../assets/icons/home.svg'
import employeesIcon from '../assets/icons/employe.svg'
import leaveIcon from '../assets/icons/leave.svg'
import payrollIcon from '../assets/icons/calender.svg'
import bellIcon from '../assets/icons/bell.svg'
import settingsIcon from '../assets/icons/settings.svg'
import avatarImg from '../assets/images/Avatar.svg'

const mockUser = {
  name: 'James Ayomide',
  role: 'Admin',
  avatar: avatarImg,
}

const navItems = [
  { id: 'home', label: 'Home', icon: homeIcon },
  { id: 'employees', label: 'Employees', icon: employeesIcon },
  { id: 'leave', label: 'Leave', icon: leaveIcon },
  { id: 'payroll', label: 'Payroll', icon: payrollIcon },
]

function Header({ activeTab = 'home', onNavigate = () => {} }) {
  return (
    <div className="w-full bg-white max-w-8xl mx-auto h-[96px] flex items-center">
      <div className="mx-auto w-[1240px]">
        <div className="h-16 flex items-center justify-between w-full">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-6">
            <img src={logo} alt="Payevet" className="h-[30px] w-[100px]" />
            
          </div>

          <nav className="hidden md:flex items-center gap-3 w-[575px] justify-between">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-1 rounded-full w-[122px] h-[48px] justify-center border text-[16px] font-[400] transition-colors ${
                    activeTab === item.id
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-[#000000] border-[#EAEAEA80] hover:bg-gray-50'
                  }`}
                >
                  <span className="inline-flex h-[24px] w-[24px] items-center justify-center">
                    <img src={item.icon} alt="" className={`h-[19.2px] w-[20.4px] ${activeTab === item.id ? 'invert' : 'brightness-0'}`} />
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

          {/* Right: Icons + User */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('notifications')}
              className={`hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-gray-200 hover:bg-gray-50'
              }`}
            >
              <img src={bellIcon} alt="Notifications" className={`h-5 w-5 ${activeTab === 'notifications' ? 'invert' : 'brightness-0'}`} />
            </button>
            <button
              onClick={() => onNavigate('settings')}
              className={`hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                activeTab === 'settings'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-gray-200 hover:bg-gray-50'
              }`}
            >
              <img src={settingsIcon} alt="Settings" className={`h-5 w-5 ${activeTab === 'settings' ? 'invert' : 'brightness-0'}`} />
            </button>
            <div className="flex items-center gap-3 bg-white px-3 py-1.5">
              <img src={mockUser.avatar} alt={mockUser.name} className="h-8 w-8 rounded-full" />
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium text-gray-900">{mockUser.name}</div>
                <div className="text-[11px] text-gray-500">{mockUser.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
