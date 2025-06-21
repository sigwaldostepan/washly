import { SectionContainer } from '@/components/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/features/auth/components';

const AdminLoginPage: React.FC = () => {
  return (
    <SectionContainer centered>
      <Card className='w-[250px] md:w-[350px] lg:w-[400px]'>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm forAdmin />
        </CardContent>
      </Card>
    </SectionContainer>
  );
};

export default AdminLoginPage;
