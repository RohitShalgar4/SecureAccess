import { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';

const Dashboard = ({ user, onNavigate, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, action: null, userId: null, userName: '' });
  const usersPerPage = 10;

  const isAdmin = user?.role === 'admin' || user?.role === 'manager';

  useEffect(() => {
    if (isAdmin) {
      loadUsers();
    }
  }, [currentPage, isAdmin]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAllUsers({
        page: currentPage,
        limit: usersPerPage
      });
      setUsers(response.data.users);
      setTotalPages(response.data.pagination.totalPages);
      setTotalUsers(response.data.pagination.totalUsers);
    } catch (error) {
      setToast({ message: error.message || 'Failed to load users', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = (userId, userName) => {
    setConfirmDialog({
      isOpen: true,
      action: 'activate',
      userId,
      userName,
      title: 'Activate User',
      message: `Are you sure you want to activate ${userName}? They will be able to log in and access the system.`,
      type: 'info'
    });
  };

  const handleDeactivate = (userId, userName) => {
    setConfirmDialog({
      isOpen: true,
      action: 'deactivate',
      userId,
      userName,
      title: 'Deactivate User',
      message: `Are you sure you want to deactivate ${userName}? They will not be able to log in until reactivated.`,
      type: 'danger'
    });
  };

  const confirmAction = async () => {
    const { action, userId, userName } = confirmDialog;
    setConfirmDialog({ isOpen: false, action: null, userId: null, userName: '' });

    try {
      if (action === 'activate') {
        await userAPI.activateUser(userId);
        setToast({ message: `${userName} has been activated successfully`, type: 'success' });
      } else if (action === 'deactivate') {
        await userAPI.deactivateUser(userId);
        setToast({ message: `${userName} has been deactivated successfully`, type: 'success' });
      }
      loadUsers();
    } catch (error) {
      setToast({ message: error.message || 'Action failed', type: 'error' });
    }
  };

  const cancelAction = () => {
    setConfirmDialog({ isOpen: false, action: null, userId: null, userName: '' });
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800'
    };
    return styles[status] || styles.inactive;
  };

  const getRoleBadge = (role) => {
    const styles = {
      admin: 'bg-purple-100 text-purple-800',
      manager: 'bg-blue-100 text-blue-800',
      user: 'bg-gray-100 text-gray-800'
    };
    return styles[role] || styles.user;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type={confirmDialog.type}
        onConfirm={confirmAction}
        onCancel={cancelAction}
        confirmText={confirmDialog.action === 'activate' ? 'Activate' : 'Deactivate'}
      />

      <Navbar user={user} currentPage="dashboard" onNavigate={onNavigate} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome, {user?.fullName}!
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>You have successfully logged in to your account.</p>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Account Information</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Email:</span> {user?.email}</p>
                <p><span className="font-medium">Role:</span> <span className="capitalize">{user?.role}</span></p>
                <p><span className="font-medium">Status:</span> <span className="capitalize">{user?.status}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* User Management Section (Admin/Manager Only) */}
        {isAdmin && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
              <p className="mt-1 text-sm text-gray-600">
                Manage user accounts and permissions
              </p>
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Full Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((u) => (
                          <tr key={u._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {u.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {u.fullName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadge(u.role)}`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(u.status)}`}>
                                {u.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              {u._id !== user?.id && (
                                <>
                                  {u.status === 'active' ? (
                                    <button
                                      onClick={() => handleDeactivate(u._id, u.fullName)}
                                      className="text-red-600 hover:text-red-900 mr-4"
                                    >
                                      Deactivate
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => handleActivate(u._id, u.fullName)}
                                      className="text-green-600 hover:text-green-900 mr-4"
                                    >
                                      Activate
                                    </button>
                                  )}
                                </>
                              )}
                              {u._id === user?.id && (
                                <span className="text-gray-400 text-xs">You</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">{(currentPage - 1) * usersPerPage + 1}</span> to{' '}
                          <span className="font-medium">{Math.min(currentPage * usersPerPage, totalUsers)}</span> of{' '}
                          <span className="font-medium">{totalUsers}</span> users
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                          {[...Array(totalPages)].map((_, index) => (
                            <button
                              key={index + 1}
                              onClick={() => setCurrentPage(index + 1)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === index + 1
                                  ? 'z-10 bg-purple-50 border-purple-500 text-purple-600'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {index + 1}
                            </button>
                          ))}
                          <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span className="sr-only">Next</span>
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
