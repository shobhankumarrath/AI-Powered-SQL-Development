export interface sqlResponse {
  success: boolean;
  question: string;
  query: string;
  rows: rowData[];
  count: number;
}
export interface rowData {
  [key: string]: any;
}
export interface HistoryItem {
  id: number;
  question: string;
  sql_query: string;
  created_at: string;
}
export interface PreviewResponse {
  success: boolean;
  question: string;
  query: string;
}

export interface ExecuteResponse {
  success: boolean;
  query: string;
  rows: Record<string, any>[];
}
