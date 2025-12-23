export type DocumentIdentifierParams = {
  params: Promise<{ type: string; id: string }>;
};

export type DocumentCollectionParams = {
  params: Promise<{ type: string }>;
};

export type ApiResponse<T> = {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
};
