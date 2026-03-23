import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#111111] py-12 text-white/50 text-dmsans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-white/10 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="#home" className="text-xl font-bold text-white flex gap-1 heading-playfair">
            Sammy&apos;s
            <span className="text-[#e8501a]">Grill Cafe</span>
          </Link>
          <div className="flex gap-6 uppercase text-sm tracking-wider">
            <Link href="#home" className="hover:text-white transition-colors">Home</Link>
            <Link href="#menu" className="hover:text-white transition-colors">Menu</Link>
            <Link href="#about" className="hover:text-white transition-colors">About</Link>
            <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Sammy&apos;s Grill Cafe. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
