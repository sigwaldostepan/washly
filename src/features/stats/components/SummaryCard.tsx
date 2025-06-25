import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toRupiah } from '@/utils/to-rupiah';

interface SummaryCardProps {
  amount: number;
  className?: string;
  difference?: number;
  format: 'currency' | 'number';
  title: string;
}

export const SummaryCard = ({ className, title, amount, difference, format }: SummaryCardProps) => {
  const isSurplus = difference ? difference > 0 : false;

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className='font-semibold'>{title}</CardTitle>
        <CardContent className='mt-2 px-0'>
          <p className='text-2xl font-bold'>{format === 'currency' ? toRupiah(amount) : amount}</p>
          {difference && (
            <p className={cn('text-sm', isSurplus ? 'text-green-600' : 'text-destructive')}>
              {isSurplus ? '+' : '-'}
              {format === 'currency' ? toRupiah(difference) : difference}
            </p>
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
};
