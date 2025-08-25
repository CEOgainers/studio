import { OriginalityCheckerClient } from './components/originality-checker-client';

export default function OriginalityCheckerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium font-headline">AI Document Originality Checker</h1>
        <p className="text-sm text-muted-foreground">
          Upload your document to check its originality score and receive AI-powered feedback.
        </p>
      </div>
      <OriginalityCheckerClient />
    </div>
  );
}
