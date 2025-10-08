export type JournalType = {
  id: number;
  title: string;
  date: Date;
  tags: string[];
  markdown: string;
};

export type RawJournalType = Omit<JournalType, "id">;

export type JournalPageParams = {
  params: Promise<{
    id: string;
  }>;
};
