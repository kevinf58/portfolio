export type DocumentIdentifierParams = {
  params: Promise<{ type: string; id: string }>;
};

export type DocumentCollectionParams = {
  params: Promise<{ type: string }>;
};
