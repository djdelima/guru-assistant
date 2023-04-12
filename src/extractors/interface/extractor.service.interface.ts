export interface IExtractorService {
  type: 'codeBlock' | 'declaration' | 'importExport';
  extract(content: string): string[];
}
