import { useState } from 'react';
import { User } from '../../context/AuthContext';
import Card from '../common/Card';
import { Search, UserCog, Users } from 'lucide-react';

interface UserManagementProps {
  users: User[];
}

const UserManagement = ({ users }: UserManagementProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'NORMALUSER' | 'ADMIN'>('ALL');

  const filteredUsers = users.filter(
    (user) =>
      (filter === 'ALL' || user.role === filter) &&
      (user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.jobRole && user.jobRole.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.address && user.address.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const normalUsers = users.filter(user => user.role === 'NORMALUSER');
  const adminUsers = users.filter(user => user.role === 'ADMIN');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
          <div className="flex items-center">
            <div className="mr-4 bg-primary-500 rounded-lg p-3">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">All Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-secondary-50 to-secondary-100 border-secondary-200">
          <div className="flex items-center">
            <div className="mr-4 bg-secondary-500 rounded-lg p-3">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Normal Users</p>
              <p className="text-2xl font-bold text-gray-900">{normalUsers.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-accent-50 to-accent-100 border-accent-200">
          <div className="flex items-center">
            <div className="mr-4 bg-accent-500 rounded-lg p-3">
              <UserCog className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Administrators</p>
              <p className="text-2xl font-bold text-gray-900">{adminUsers.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="relative md:flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by email, job role or location..."
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-md ${
                filter === 'ALL'
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setFilter('ALL')}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                filter === 'NORMALUSER'
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setFilter('NORMALUSER')}
            >
              Normal Users
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                filter === 'ADMIN'
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setFilter('ADMIN')}
            >
              Admins
            </button>
          </div>
        </div>

        {filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Job Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Location
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-md font-medium text-primary-700">
                            {user.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.email}</div>
                          <div className="text-sm text-gray-500">ID: {user.id.substring(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.role === 'ADMIN'
                            ? 'bg-accent-100 text-accent-800'
                            : 'bg-primary-100 text-primary-800'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.jobRole || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.address || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-10 text-center">
            <div className="inline-flex mx-auto items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No users found matching your search criteria</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default UserManagement;