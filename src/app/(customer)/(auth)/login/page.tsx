import { SectionContainer } from '@/components/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/features/auth/components';

export const metadata = {
  title: 'Login - Washly',
};

const LoginPage = () => {
  return (
    <SectionContainer centered>
      <Card className='w-[250px] md:w-[350px] lg:w-[400px]'>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </SectionContainer>
  );
};

export default LoginPage;
