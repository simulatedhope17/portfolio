import { useWindowManager } from "@/hooks/use-window-manager"
import { FileText, Download, ExternalLink } from "lucide-react"

interface ResumeContentProps {
  windowId: string
}

export default function ResumeContent({ windowId }: ResumeContentProps) {
  const { openWindow, focusWindow } = useWindowManager()

  const handleViewPdf = () => {
    const pdfWindowId = "pdfviewer"
    openWindow(pdfWindowId, "Resume.pdf")
    setTimeout(() => {
      focusWindow(pdfWindowId)
    }, 100)
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-coral-100 rounded-full mb-4">
            <FileText className="w-8 h-8 text-coral-500" />
          </div>
          <p className="text-gray-600 text-lg sm:text-xl">Download my resume to learn more about my experience.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.02]">
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-16 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">PDF</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Akib_Arifeen_Resume.pdf</h3>
                  <p className="text-gray-500 text-sm">Last updated: May 2025</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="../Akib_Arifeen_Resume.pdf" 
                download
                className="inline-flex items-center justify-center gap-2 bg-coral-500 hover:bg-coral-600 text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg"
              >
                <Download className="w-5 h-5" />
                Download
              </a>
              <button 
                onClick={handleViewPdf}
                className="inline-flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg"
              >
                <ExternalLink className="w-5 h-5" />
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
