import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import TextArea from '../components/common/TextArea';
import Card from '../components/common/Card';
import { UserPlus } from 'lucide-react';

interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
  role: 'NORMALUSER' | 'ADMIN';
  address?: string;
  jobRole?: string;
  qualifications?: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  role: yup
    .string()
    .oneOf(['NORMALUSER', 'ADMIN'], 'Invalid role')
    .required('Role is required'),
  address: yup.string().when('role', {
    is: 'NORMALUSER',
    then: (schema) => schema.required('Address is required for normal users'),
  }),
  jobRole: yup.string().when('role', {
    is: 'NORMALUSER',
    then: (schema) => schema.required('Job role is required for normal users'),
  }),
  qualifications: yup.string().when('role', {
    is: 'NORMALUSER',
    then: (schema) => schema.required('Qualifications are required for normal users'),
  }),
});

const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      role: 'NORMALUSER',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterFormInputs) => {
    setIsLoading(true);
    try {
      // Format qualifications as an array
      const userData = {
        ...data,
        qualifications: data.qualifications ? data.qualifications.split(',').map(q => q.trim()) : undefined,
      };
      
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = userData;
      
      await registerUser(registerData);
      navigate('/login');
    } catch (error) {
      // Error handling is done in the AuthContext
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 animate-fade-in">
      <Card className="overflow-hidden">
        <div className="px-8 py-6">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <UserPlus className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
            <p className="text-gray-600 mt-2">Join the Job Swap platform</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="your@email.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register('password')}
            />

            <Input
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <Select
              id="role"
              label="Role"
              options={[
                { value: 'NORMALUSER', label: 'Normal User' },
                { value: 'ADMIN', label: 'Administrator' },
              ]}
              error={errors.role?.message}
              {...register('role')}
            />

            {selectedRole === 'NORMALUSER' && (
              <>
                <Input
                  id="address"
                  label="Home Location"
                  placeholder="e.g., New York, NY"
                  error={errors.address?.message}
                  {...register('address')}
                />

                <Input
                  id="jobRole"
                  label="Current Job Role"
                  placeholder="e.g., Software Engineer"
                  error={errors.jobRole?.message}
                  {...register('jobRole')}
                />

                <TextArea
                  id="qualifications"
                  label="Qualifications (comma-separated)"
                  placeholder="e.g., JavaScript, React, Node.js"
                  rows={3}
                  error={errors.qualifications?.message}
                  {...register('qualifications')}
                />
              </>
            )}

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              className="mt-6"
            >
              Register
            </Button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;