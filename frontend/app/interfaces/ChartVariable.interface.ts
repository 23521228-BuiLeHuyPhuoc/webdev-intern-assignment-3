export interface ChartVariable {
  message: string;
  data: {
    name: string;
    categories: string[];
    series: {
      name: string;
      data: number[];
    }[];
  } | null;
}
