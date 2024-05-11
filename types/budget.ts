interface BudgetInterface {
  amounts?: {
    [key: string]: number;
  };
  goal: number;
  id: number;
  title: string;
}
