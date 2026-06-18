"use client";

import { Check, Copy, Facebook, Instagram, MessageCircle, Send, Twitter } from "lucide-react";
import { useState } from "react";

const shareTargets = [
  {
    label: "WhatsApp",
    icon: MessageCircle,
    href: (url: string, title: string) => `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`
  },
  {
    label: "Facebook",
    icon: Facebook,
    href: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  },
  {
    label: "Instagram",
    icon: Instagram,
    href: (url: string, title: string) => `https://www.instagram.com/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
  },
  {
    label: "Telegram",
    icon: Send,
    href: (url: string, title: string) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
  },
  {
    label: "X",
    icon: Twitter,
    href: (url: string, title: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
  }
];

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {shareTargets.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href(url, title)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Share to ${label}`}
          className="focus-ring grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-700 hover:border-gold hover:text-ocean"
          title={label}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy product link"
        className="focus-ring grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-700 hover:border-gold hover:text-ocean"
        title="Copy link"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
