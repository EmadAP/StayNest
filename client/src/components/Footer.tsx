import React from "react";
import { Github, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-muted-foreground">
        {/* Branding */}
        <div>
          <h2 className="text-lg font-bold text-foreground">
            Stay<span className="text-green-500">Nest</span>
          </h2>

          <div className="flex space-x-3 mt-6 text-xl">
            <a
              className="p-2 rounded-full hover:bg-slate-200"
              href="#"
              aria-label="Instagram"
            >
              <Instagram />
            </a>
            <a
              className="p-2 rounded-full hover:bg-slate-200"
              href="#"
              aria-label="Twitter"
            >
              <Twitter />
            </a>
            <a
              className="p-2 rounded-full hover:bg-slate-200"
              href="https://github.com/"
              target="_blank"
              aria-label="GitHub"
            >
              <Github />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-semibold text-foreground mb-2">Explore</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/browse">Browse Listings</Link>
            </li>
            <li>
              <Link href="/browse?propertyType=room">Rooms</Link>
            </li>
            <li>
              <Link href="/browse?propertyType=apartment">Apartments</Link>
            </li>
            <li>
              <Link href="/browse?propertyType=house">Houses</Link>
            </li>
          </ul>
        </div>

        {/* Host */}
        <div>
          <h3 className="font-semibold text-foreground mb-2">Host</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/nestYourHouse">Nest your House</Link>
            </li>
            <li>
              <Link href="/createNest">Create Your Nest</Link>
            </li>
            <li>
              <Link href="/host-faq">Host FAQ</Link>
            </li>
          </ul>
        </div>

        {/* About & Legal */}
        <div>
          <h3 className="font-semibold text-foreground mb-2">About</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/about">About StayNest</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t py-4 text-xs text-center text-muted-foreground">
        <p>
          © {new Date().getFullYear()} StayNest. All rights reserved. Built with
          ❤️ by Hated.
        </p>
      </div>
    </footer>
  );
}
