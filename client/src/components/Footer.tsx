import { Link } from 'wouter';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
//import { FaTiktok } from 'react-icons/fa';

export default function Footer() {
  const scrollToPageTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

  return (
    <footer className="bg-deep-blue text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold">About TAOCIM</h3>
            <p className="text-sm text-gray-300">
              The Anchor of Christ International Ministries is committed to winning souls, building believers, and impacting nations through the Gospel.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about"><a onClick={scrollToPageTop} className="hover:text-gold transition-colors">The Church</a></Link></li>
              <li><Link href="/the-prophet"><a onClick={scrollToPageTop} className="hover:text-gold transition-colors">The Prophet</a></Link></li>
              <li><Link href="/ministries"><a onClick={scrollToPageTop} className="hover:text-gold transition-colors">Ministries</a></Link></li>
              <li><Link href="/events"><a onClick={scrollToPageTop} className="hover:text-gold transition-colors">Events</a></Link></li>
              <li><Link href="/giving"><a onClick={scrollToPageTop} className="hover:text-gold transition-colors">Give</a></Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/sermons"><a onClick={scrollToPageTop} className="hover:text-gold transition-colors">Sermons</a></Link></li>
              <li><Link href="/live-services"><a onClick={scrollToPageTop} className="hover:text-gold transition-colors">Live Services</a></Link></li>
              <li><Link href="/testimonies"><a onClick={scrollToPageTop} className="hover:text-gold transition-colors">Testimonies</a></Link></li>
              <li><Link href="/contact"><a onClick={scrollToPageTop} className="hover:text-gold transition-colors">Contact</a></Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61573850645463" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gold hover:text-yellow-300 transition-colors"><Facebook size={20} /></a>
              <a href="https://www.youtube.com/@taocim_TV7" target="_blank" rel="noopener noreferrer" aria-label="YouTube"  className="text-gold hover:text-yellow-300 transition-colors"><Youtube size={20} /></a>
              <a href="https://www.tiktok.com/@decidechauke0?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" aria-label="Tiktok" className="text-gold hover:text-yellow-300 transition-colors"><Twitter size={20} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer"  aria-label="Instagram" className="text-gold hover:text-yellow-300 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
            <p>&copy; 2012 Anchor of Christ International Ministries. All rights reserved.</p>
            <p>Developer by <a href="https://allen-portfolio-navigator.lovable.app/" className="hover:text-gold transition-colors">Zie</a> & <a href="" className="hover:text-gold transition-colors">McMilan</a></p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
