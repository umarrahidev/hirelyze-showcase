import { Link } from 'react-router-dom';
import { Sparkles, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'About', href: '#about' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact', href: '#contact' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
    social: [
      { name: 'Twitter', href: '#', icon: Twitter },
      { name: 'GitHub', href: '#', icon: Github },
      { name: 'LinkedIn', href: '#', icon: Linkedin },
      { name: 'Email', href: 'mailto:contact@hirelyze.ai', icon: Mail },
    ],
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // <footer className="bg-muted/30 border-t border-border">
    //   <div className="container mx-auto px-4 pt-12 pb-8">
    //     <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    //       {/* Logo and Description */}
    //       <div className="col-span-1 md:col-span-2">
    //         <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
    //           <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
    //             <Sparkles className="w-5 h-5 text-white" />
    //           </div>
    //           <span className="gradient-primary bg-clip-text text-transparent">Hirelyze</span>
    //         </Link>
    //         <p className="text-muted-foreground mb-6 max-w-md">
    //           AI-powered resume analysis platform that evaluates your resume for strengths, 
    //           weaknesses, and improvement opportunities. Analyze to get hired.
    //         </p>
    //         <div className="flex items-center gap-4">
    //           {footerLinks.social.map((social) => (
    //             <a
    //               key={social.name}
    //               href={social.href}
    //               className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
    //               aria-label={social.name}
    //             >
    //               <social.icon className="w-5 h-5" />
    //             </a>
    //           ))}
    //         </div>
    //       </div>

    //       {/* Product Links */}
    //       <div>
    //         <h3 className="font-semibold text-foreground mb-4">Product</h3>
    //         <ul className="space-y-3">
    //           {footerLinks.product.map((link) => (
    //             <li key={link.name}>
    //               {link.href.startsWith('#') ? (
    //                 <button
    //                   onClick={() => scrollToSection(link.href)}
    //                   className="text-muted-foreground hover:text-primary transition-colors text-left"
    //                 >
    //                   {link.name}
    //                 </button>
    //               ) : (
    //                 <Link
    //                   to={link.href}
    //                   className="text-muted-foreground hover:text-primary transition-colors"
    //                 >
    //                   {link.name}
    //                 </Link>
    //               )}
    //             </li>
    //           ))}
    //         </ul>
    //       </div>

    //       {/* Support Links */}
    //       <div>
    //         <h3 className="font-semibold text-foreground mb-4">Support</h3>
    //         <ul className="space-y-3">
    //           {footerLinks.support.map((link) => (
    //             <li key={link.name}>
    //               {link.href.startsWith('#') && link.href !== '#contact' ? (
    //                 <button
    //                   onClick={() => scrollToSection(link.href)}
    //                   className="text-muted-foreground hover:text-primary transition-colors text-left"
    //                 >
    //                   {link.name}
    //                 </button>
    //               ) : (
    //                 <a
    //                   href={link.href}
    //                   className="text-muted-foreground hover:text-primary transition-colors"
    //                 >
    //                   {link.name}
    //                 </a>
    //               )}
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     </div>

    //     {/* Bottom Section */}
    //     <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
    //       <p className="text-muted-foreground text-sm">
    //         © {currentYear} Hirelyze AI. All rights reserved.
    //       </p>
    //       <p className="text-muted-foreground text-sm mt-2 md:mt-0">
    //         Built with ❤️ for career success
    //       </p>
    //     </div>
    //   </div>
    // </footer>
   <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 pb-4">
        <div className="mt-6 flex justify-center">
          <p className="text-muted-foreground text-sm">
           Created by <a href="https://linkedin.com/in/umarrahi2004" target="_blank" className="font-semibold">Umar Rahi</a>.
          Built with ❤️ for career success
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;