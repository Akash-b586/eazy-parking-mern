import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="contact" className="py-12 bg-gray-100 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold tracking-tighter">
              EAZY<span className="text-gray-500">PARKING</span>
            </Link>
            <p className="text-gray-400">The smart way to find and book parking spaces in your city.</p>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-400 hover:text-black dark:hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-black dark:hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10V10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.46 14.34 5.08 14.39 4.69 14.39C4.42 14.39 4.15 14.36 3.89 14.31C4.43 16 6 17.26 7.89 17.29C6.43 18.45 4.58 19.13 2.56 19.13C2.22 19.13 1.88 19.11 1.54 19.07C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-black dark:hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                    fill="currentColor"
                  />
                  <path d="M6 9H2V21H6V9Z" fill="currentColor" />
                  <path
                    d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-black dark:hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 19.4 19.4 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2ZM7.6 4C5.61177 4 4 5.61177 4 7.6V16.4C4 18.3882 5.61177 20 7.6 20H16.4C18.3882 20 20 18.3882 20 16.4V7.6C20 5.61177 18.3882 4 16.4 4H7.6ZM17.25 5.5C17.9404 5.5 18.5 6.05964 18.5 6.75C18.5 7.44036 17.9404 8 17.25 8C16.5596 8 16 7.44036 16 6.75C16 6.05964 16.5596 5.5 17.25 5.5ZM12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-400 hover:text-black dark:hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-black dark:hover:text-white">Careers</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-black dark:hover:text-white">Blog</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-black dark:hover:text-white">Press</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-400 hover:text-black dark:hover:text-white">Help Center</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-black dark:hover:text-white">Partners</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-black dark:hover:text-white">Developers</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-black dark:hover:text-white">Documentation</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">
                123 Parking Avenue<br />
                New York, NY 10001
              </li>
              <li>
                <Link to="mailto:info@eazyparking.com" className="text-gray-400 hover:text-black dark:hover:text-white">
                  info@eazyparking.com
                </Link>
              </li>
              <li>
                <Link to="tel:+1234567890" className="text-gray-400 hover:text-black dark:hover:text-white">
                  +1 (234) 567-890
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} EazyParking. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-sm text-gray-400 hover:text-black dark:hover:text-white">Terms of Service</Link>
            <Link to="#" className="text-sm text-gray-400 hover:text-black dark:hover:text-white">Privacy Policy</Link>
            <Link to="#" className="text-sm text-gray-400 hover:text-black dark:hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}