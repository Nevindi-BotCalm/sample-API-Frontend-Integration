import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Camera,
 
} from 'lucide-react';
import UserForm from '@/components/UserForm';

export default function Profile() {
  const { user, logout, setUser } = useAuthStore();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(user?.name?.split(' ')[0] || '');
  const [lastName, setLastName] = useState(user?.name?.split(' ')[1] || '');
  const [email, setEmail] = useState(user?.email || '');
  const [username, setUsername] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Florence Shaw',
      email: 'florence@untitledui.com',
      lastActive: 'Mar 4, 2024',
      dateAdded: 'July 4, 2022',
      avatar: 'FS',
    },
    {
      id: 2,
      name: 'Amélie Laurent',
      email: 'amelie@untitledui.com',
      lastActive: 'Mar 4, 2024',
      dateAdded: 'July 4, 2022',
      avatar: 'AL',
    },
    {
      id: 3,
      name: 'Anna Kowalski',
      email: 'anna@untitledui.com',
      lastActive: 'Mar 2, 2024',
      dateAdded: 'July 4, 2022',
      avatar: 'AK',
    },
    {
      id: 4,
      name: 'Candice Wu',
      email: 'candice@untitledui.com',
      lastActive: 'Mar 5, 2024',
      dateAdded: 'July 4, 2022',
      avatar: 'CW',
    },
  ]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        name: `${firstName} ${lastName}`.trim(),
        email,
      });
    }
  };

  const handleAddUser = (userData: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
  }) => {
    const newUser = {
      id: users.length + 1,
      name: `${userData.firstName} ${userData.lastName}`.trim(),
      email: userData.email,
      lastActive: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      dateAdded: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      avatar: `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase(),
    };
    setUsers([...users, newUser]);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="mt-25 ml-16 p-8">
      <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        <div className="space-y-4">
          <div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Profile photo
              </label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                    <User className="h-8 w-8 text-gray-400" />
                  </div>
                  <button
                    title="Change profile photo"
                    className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-50"
                  >
                    <Camera className="h-3 w-3 text-gray-600" />
                  </button>
                </div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  Click to replace
                </button>
              </div>
            </div>
            <br></br>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Amélie"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Laurent"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="amelie@untitledui.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="flex">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                untitledui.com/
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 rounded-r-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="amelie"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
          >
            LOGOUT
          </button>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>

      <UserForm
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onSave={handleAddUser}
        title="Add new user"
      />
    </div>
  );
}
