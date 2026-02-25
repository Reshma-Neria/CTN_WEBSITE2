import { motion } from 'motion/react';
import { FileText, Printer, Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router';

export function SubscriptionForm() {
  return (
    <div className="min-h-[60vh] md:min-h-screen py-20 px-4 bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-4">
            Subscription <span className="text-[#a4d65e]">Application Form</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6">
            Complete this form to subscribe to CTN services. After filling out the form, 
            you can print it or save it as PDF and send it back to us.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#a4d65e]" />
              <div className="text-left">
                <p className="font-semibold text-gray-800">Fill Out Form</p>
                <p className="text-sm text-gray-600">Complete all required fields</p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 flex items-center gap-3">
              <Printer className="w-6 h-6 text-[#a4d65e]" />
              <div className="text-left">
                <p className="font-semibold text-gray-800">Print or Save PDF</p>
                <p className="text-sm text-gray-600">Use browser print function</p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 flex items-center gap-3">
              <Download className="w-6 h-6 text-[#a4d65e]" />
              <div className="text-left">
                <p className="font-semibold text-gray-800">Send to Us</p>
                <p className="text-sm text-gray-600">Email or WhatsApp</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Container - Using iframe to preserve all functionality */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-4 bg-[#1e3a5f] text-white flex items-center justify-between">
            <h2 className="text-lg font-semibold">CTN Application Form</h2>
            <a
              href="/digitalform/digital-form.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#a4d65e] hover:bg-[#7fb83d] rounded-lg transition-colors text-sm font-semibold"
            >
              <ExternalLink className="w-4 h-4" />
              Open in New Tab
            </a>
          </div>
          <iframe
            src="/digitalform/digital-form.html"
            className="w-full border-0"
            style={{ minHeight: '2000px', height: 'auto' }}
            title="CTN Subscription Application Form"
            onLoad={(e) => {
              // Adjust iframe height based on content
              const iframe = e.currentTarget;
              try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                if (iframeDoc) {
                  iframe.style.height = iframeDoc.body.scrollHeight + 'px';
                }
              } catch (error) {
                // Cross-origin restrictions may prevent this
                console.log('Cannot access iframe content (expected for security)');
              }
            }}
          />
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-xl font-bold text-[#1e3a5f] mb-4">How to Submit Your Form</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Fill out all required fields in the form above</li>
            <li>Select your preferred package and payment method</li>
            <li>Click on the map to set your location coordinates (or use "Use My Current Location" button)</li>
            <li>Read and accept the Terms and Conditions</li>
            <li>Sign the form digitally (draw or upload signature)</li>
            <li>Click "Print / Save as PDF" button in the form</li>
            <li>Save the PDF or print the form</li>
            <li>Send the completed form to us via:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li><strong>Email:</strong> <a href="mailto:info@ctnmw.net" className="text-[#a4d65e] hover:underline">info@ctnmw.net</a></li>
                <li><strong>WhatsApp:</strong> <a href="https://wa.me/265981187766" className="text-[#a4d65e] hover:underline">+265 981 187 766</a></li>
              </ul>
            </li>
          </ol>
          
          <div className="mt-6 p-4 bg-[#a4d65e]/10 rounded-lg border border-[#a4d65e]/30">
            <p className="text-gray-700">
              <strong>Note:</strong> If you experience any issues viewing the form, click "Open in New Tab" above 
              to open it in a separate window. The form includes all necessary features including map integration, 
              digital signature, and print functionality.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
