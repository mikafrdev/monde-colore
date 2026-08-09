import Link from "next/link";

export default function Footer() {
   return (
      <footer className="flex flex-col gap-4 items-center py-6 border-t border-[#36373c]">
         <div className="flex items-center mx-auto">
            <Link href="/" className="text-[#3c57dd] text-xl">
               Chez Mikaz
            </Link>
         </div>
         <span className="text-xs text-gray-500">@2026 Mikaz</span>
      </footer>
   );
}
