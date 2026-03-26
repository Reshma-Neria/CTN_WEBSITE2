import { motion } from 'motion/react';
import { Mail, Clock, Send, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

export function SubscriptionForm() {
  const formIframeRef = useRef<HTMLIFrameElement>(null);

  const printEmbeddedForm = () => {
    const iframeWindow = formIframeRef.current?.contentWindow;
    if (iframeWindow) {
      const formWindow = iframeWindow as Window & { printForm?: () => void };
      if (typeof formWindow.printForm === 'function') {
        formWindow.printForm();
        return;
      }
      iframeWindow.focus();
      iframeWindow.print();
      return;
    }
    const fallbackTab = window.open('/digitalform/digital-form.html', '_blank', 'noopener,noreferrer');
    fallbackTab?.focus();
  };

  const downloadFormPdf = () => {
    const iframeWindow = formIframeRef.current?.contentWindow;
    if (iframeWindow) {
      const formWindow = iframeWindow as Window & { printForm?: () => void };
      if (typeof formWindow.printForm === 'function') {
        formWindow.printForm();
        return;
      }
    }

    const newTab = window.open('/digitalform/digital-form.html', '_blank', 'noopener,noreferrer');
    if (newTab) {
      newTab.focus();
    }
  };

  return (
    <div className="min-h-[60vh] md:min-h-screen py-20 px-4 bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-[#1e3a5f] mb-4">
            Subscription <span className="text-[#a4d65e]">Application Form</span>
          </h1>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="w-full sm:w-auto bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 flex items-center gap-3">
              <Mail className="w-6 h-6 text-[#a4d65e]" />
              <div className="text-left">
                <p className="font-semibold text-white">Fill Out Form</p>
                <p className="text-sm text-white">Complete all required fields</p>
              </div>
            </div>
            <div className="w-full sm:w-auto bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 flex items-center gap-3">
              <Clock className="w-6 h-6 text-[#a4d65e]" />
              <div className="text-left">
                <p className="font-semibold text-white">Print or Save PDF</p>
                <p className="text-sm text-white">Use browser print function</p>
              </div>
            </div>
            <div className="w-full sm:w-auto bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 flex items-center gap-3">
              <Send className="w-6 h-6 text-[#a4d65e]" />
              <div className="text-left">
                <p className="font-semibold text-white">Send to Us</p>
                <p className="text-sm text-white">Email or WhatsApp</p>
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
          <div className="p-4 bg-[#1e3a5f] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className="text-base sm:text-lg font-semibold">CTN Application Form</h2>
            <a
              href="/digitalform/digital-form.html"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#a4d65e] hover:bg-[#7fb83d] rounded-lg transition-colors text-sm font-semibold"
            >
              <ArrowRight className="w-4 h-4" />
              Open in New Tab
            </a>
          </div>
          <iframe
            ref={formIframeRef}
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
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={printEmbeddedForm}
                className="w-full sm:w-auto sm:min-w-[140px] px-4 py-2 rounded-lg bg-[#1e3a5f] text-sm font-semibold text-white hover:bg-[#18314f] transition-colors"
              >
                Print Form
              </button>
              <button
                type="button"
                onClick={downloadFormPdf}
                className="w-full sm:w-auto sm:min-w-[140px] px-4 py-2 rounded-lg bg-[#a4d65e] text-sm font-semibold text-[#1e3a5f] hover:bg-[#90c049] transition-colors"
              >
                Download PDF
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
