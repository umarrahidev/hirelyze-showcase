// client\src\components\layouts\App\Footer.tsx
import { Link } from 'react-router-dom';
import { Sparkles, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    social: [
      { name: 'Twitter', href: '#', icon: Twitter },
      { name: 'GitHub', href: '#', icon: Github },
      { name: 'LinkedIn', href: '#', icon: Linkedin },
      { name: 'Email', href: 'mailto:contact@hirelyze.ai', icon: Mail },
    ],
  };

  return (
    <footer className="bg-gray-100 border-t border-border">
      <div className="container mx-auto px-4 pt-4 pb-4">
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* <div className="flex items-center gap-4 mb-4 md:mb-0">
            <a href="#" className="text-gray-800 hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-800 hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div> */}

          {/* <p className="text-gray-800 text-sm">
            Created by Umar Rahi
          </p> */}

          <p className="text-gray-800 text-sm mt-2 md:mt-0">
            Built with ❤️ for career success
          </p>

          <div className="flex gap-4 mt-2 md:mt-0 text-xs">
            <Link to="/report-issue" className="text-muted-foreground hover:text-primary transition-colors">
              Report Issue
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/submit-suggestion" className="text-muted-foreground hover:text-primary transition-colors">
              Submit Suggestion
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;