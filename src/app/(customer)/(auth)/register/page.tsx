import { SectionContainer } from '@/components/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RegisterForm } from '@/features/auth/components';

const RegisterPage = () => {
  return (
    <SectionContainer centered>
      <Card className='w-[250px] md:w-[350px] lg:w-[400px]'>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </SectionContainer>
  );
};

export default RegisterPage;
