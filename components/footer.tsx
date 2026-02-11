import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-emerald-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-orbitron text-2xl font-bold text-white mb-4 tracking-wider">
              ARBITR<span className="text-emerald-400">AGE</span>
            </h2>
            <p className="text-gray-400 mb-6 max-w-md text-sm leading-relaxed">
              Delivering data-driven economic insights and market intelligence to help you navigate
              the complexities of global finance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors duration-200">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors duration-200">
                <Github size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors duration-200">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors duration-200">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-orbitron text-white font-semibold mb-4 text-sm tracking-wide">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors duration-200 text-sm">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors duration-200 text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-emerald-500/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-xs">&copy; 2026 Arbitrage. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-emerald-400 text-xs transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-400 text-xs transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
