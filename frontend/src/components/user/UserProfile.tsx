import { User } from '../../context/AuthContext';
import Card from '../common/Card';
import { MapPin, Briefcase, Award } from 'lucide-react';

interface UserProfileProps {
  user: User | null;
}

const UserProfile = ({ user }: UserProfileProps) => {
  if (!user) {
    return (
      <Card>
        <div className="text-center py-4">
          <p className="text-gray-500">User information not available</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="animate-slide-up">
      <div className="text-center mb-6">
        <div className="inline-flex mx-auto items-center justify-center w-20 h-20 rounded-full bg-primary-100 mb-4">
          <span className="text-2xl font-bold text-primary-700">
            {user.email.charAt(0).toUpperCase()}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">{user.email}</h3>
        <span className="inline-block px-3 py-1 mt-2 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
          {user.role}
        </span>
      </div>

      {user.role === 'NORMALUSER' && (
        <div className="space-y-4">
          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-gray-500">Home Location</h4>
              <p className="text-gray-900">{user.address || 'Not specified'}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Briefcase className="w-5 h-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-gray-500">Current Job Role</h4>
              <p className="text-gray-900">{user.jobRole || 'Not specified'}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Award className="w-5 h-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-gray-500">Qualifications</h4>
              {user.qualifications && user.qualifications.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.qualifications.map((qualification, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                    >
                      {qualification}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-900">No qualifications specified</p>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default UserProfile;