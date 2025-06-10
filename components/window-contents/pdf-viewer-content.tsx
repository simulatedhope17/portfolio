interface PdfViewerContentProps {
  windowId: string;
  filePath: string;
}

export default function PdfViewerContent({ windowId, filePath }: PdfViewerContentProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <iframe src={filePath} className="w-full h-full border-none"></iframe>
    </div>
  );
} 