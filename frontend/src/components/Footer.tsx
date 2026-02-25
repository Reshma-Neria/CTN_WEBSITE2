import { Link } from 'react-router';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-[#1e3a5f]/50 backdrop-blur-md border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-white font-bold text-xl">CTN</span>
            </div>
            <p className="text-white text-base md:text-lg">
              Connecting Malawi with 4G and Broadband Network. CTN, Tiyeni pamodzi!!
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/share/1D8BsSSktN/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#a4d65e] transition-colors"
                aria-label="Visit CTN on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/convergedmalawi?igsh=Njl1MzVkNnUxemVt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#a4d65e] transition-colors"
                aria-label="Visit CTN on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/converged-technology-networks/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#a4d65e] transition-colors"
                aria-label="Visit CTN on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white hover:text-[#a4d65e] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-[#a4d65e] transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-white hover:text-[#a4d65e] transition-colors text-sm">
                  Packages
                </Link>
              </li>
              <li>
                <Link to="/business" className="text-white hover:text-[#a4d65e] transition-colors text-sm">
                  Business Solutions
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-white hover:text-[#a4d65e] transition-colors text-sm">
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:text-[#a4d65e] transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-white text-sm">Broadband Internet</li>
              <li className="text-white text-sm">Cloud Services</li>
              <li className="text-white text-sm">Network Maintenance</li>
              <li className="text-white text-sm">Virtual Private Servers</li>
              <li className="text-white text-sm">24/7 Support</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-white text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#a4d65e]" />
                <span>Lilongwe Area 47 Sector 1, Malawi</span>
              </li>
              <li className="flex items-center space-x-2 text-white text-sm">
                <Phone className="w-4 h-4 flex-shrink-0 text-[#a4d65e]" />
                <span>+265 981 187 766</span>
              </li>
              <li className="flex items-center space-x-2 text-white text-sm">
                <Mail className="w-4 h-4 flex-shrink-0 text-[#a4d65e]" />
                <span>info@ctn.mw</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white text-sm">
          <p>&copy; {new Date().getFullYear()} CTN - Converged Technology Networks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
