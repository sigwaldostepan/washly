import { AuthLayout } from '@/components/layouts';

const AdminLoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default AdminLoginLayout;
