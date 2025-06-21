import { AuthLayout } from '@/components/layouts';

const CustomerAuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default CustomerAuthLayout;
