import { Link } from 'wouter';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
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
              <li><Link href="/about"><a className="hover:text-gold transition-colors">About Us</a></Link></li>
              <li><Link href="/ministries"><a className="hover:text-gold transition-colors">Ministries</a></Link></li>
              <li><Link href="/events"><a className="hover:text-gold transition-colors">Events</a></Link></li>
              <li><Link href="/giving"><a className="hover:text-gold transition-colors">Give</a></Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/sermons"><a className="hover:text-gold transition-colors">Sermons</a></Link></li>
              <li><Link href="/live-services"><a className="hover:text-gold transition-colors">Live Services</a></Link></li>
              <li><Link href="/testimonies"><a className="hover:text-gold transition-colors">Testimonies</a></Link></li>
              <li><Link href="/contact"><a className="hover:text-gold transition-colors">Contact</a></Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-gold transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-white hover:text-gold transition-colors"><Youtube size={20} /></a>
              {/*<a href="#" className="text-white hover:text-gold transition-colors"><Whatsapp size={20} /></a>*/}
              <a href="#" className="text-white hover:text-gold transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-white hover:text-gold transition-colors"><Instagram size={20} /></a> 
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
            <p>&copy; 2024 Anchor of Christ International Ministries. All rights reserved.</p>
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
