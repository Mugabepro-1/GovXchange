import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { AlertCircle, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
      <div className="text-center">
        <div className="inline-flex mx-auto items-center justify-center w-20 h-20 rounded-full bg-error-100 mb-6">
          <AlertCircle className="h-10 w-10 text-error-600" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button icon={<Home className="h-4 w-4" />}>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;