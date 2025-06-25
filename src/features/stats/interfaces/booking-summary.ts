export interface BookingSummary {
  dailySummary: {
    dailyRevenue: number;
    dailyDifference: number;
  };
  monthlySummary: {
    monthlyRevenue: number;
    monthlyDifference: number;
  };
  totalVehicleWashed: number;
}
