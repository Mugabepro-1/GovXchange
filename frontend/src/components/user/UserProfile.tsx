import { useState, useEffect } from 'react';
import { User } from '../../context/AuthContext';
import Card from '../common/Card';
import { MapPin, Briefcase, Award, Edit2 } from 'lucide-react';
import { getProfile, updateProfile } from '../../services/userService';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Input from '../common/Input';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface UserProfileProps {
  user: User | null;
}

interface ProfileFormData {
  name: string;
  address: string;
  jobRole: string;
  qualifications: string[];
}

const UserProfile = ({ user }: UserProfileProps) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProfileFormData>();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const profileData = await getProfile();
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleOpenModal = () => {
    if (profile) {
      reset({
        name: profile.name || '',
        address: profile.address || '',
        jobRole: profile.jobRole || '',
        qualifications: profile.qualifications || []
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      const updatedProfile = await updateProfile(data);
      setProfile(updatedProfile);
      toast.success('Profile updated successfully');
      handleCloseModal();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || !profile) {
    return (
      <Card>
        <div className="text-center py-4">
          <p className="text-gray-500">User information not available</p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className="animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <div className="inline-flex mx-auto items-center justify-center w-20 h-20 rounded-full bg-primary-100 mb-4">
              <span className="text-2xl font-bold text-primary-700">
                {profile.name?.charAt(0).toUpperCase() || profile.email.charAt(0).toUpperCase()}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">{profile.name || profile.email}</h3>
            <span className="inline-block px-3 py-1 mt-2 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
              {profile.role}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={<Edit2 className="h-4 w-4" />}
            onClick={handleOpenModal}
          >
            Edit Profile
          </Button>
        </div>

        {profile.role === 'NORMALUSER' && (
          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-gray-500">Home Location</h4>
                <p className="text-gray-900">{profile.address || 'Not specified'}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Briefcase className="w-5 h-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-gray-500">Current Job Role</h4>
                <p className="text-gray-900">{profile.jobRole || 'Not specified'}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Award className="w-5 h-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-gray-500">Qualifications</h4>
                {profile.qualifications && profile.qualifications.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.qualifications.map((qualification, index) => (
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

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Edit Profile"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant="primary"
              isLoading={isLoading}
              onClick={handleSubmit(onSubmit)}
            >
              Save Changes
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <Input
            id="name"
            label="Full Name"
            placeholder="Enter your full name"
            {...register('name')}
          />
          <Input
            id="address"
            label="Home Location"
            placeholder="Enter your home location"
            {...register('address')}
          />
          <Input
            id="jobRole"
            label="Current Job Role"
            placeholder="Enter your current job role"
            {...register('jobRole')}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Qualifications
            </label>
            <Input
              id="qualifications"
              placeholder="Enter qualifications (comma-separated)"
              {...register('qualifications')}
            />
            <p className="mt-1 text-sm text-gray-500">
              Separate multiple qualifications with commas
            </p>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UserProfile;