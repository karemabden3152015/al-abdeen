"use client";

import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { AppLocale } from "@/lib/i18n";

type Message = {
  role: "assistant" | "user";
  text: string;
};

const copy = {
  en: {
    title: "Al-Abdeen Assistant",
    subtitle: "Orders, sellers, affiliates, and support",
    open: "Open chat assistant",
    close: "Close chat",
    input: "Write your question...",
    send: "Send",
    greeting: "Welcome to Al-Abdeen. I can help you track orders, understand seller registration, affiliate links, or contact WhatsApp support.",
    quick: [
      ["Track my order", "Orders are currently confirmed manually. Open your account page to review order status: Pending, Confirmed, Processing, Shipped, Delivered, Cancelled, Returned, or Refunded."],
      ["Become a seller", "You can apply from the Sell page. There are no launch subscription fees, product upload is free, and commission is charged only when a sale happens."],
      ["Affiliate program", "Registered users can promote products with referral links and track sales and earnings from the affiliate dashboard."],
      ["WhatsApp support", "For urgent help, use the WhatsApp support button. The current support number is 01124460043."]
    ],
    fallback: "Thanks. I saved the context in this demo chat. For launch, this assistant can be connected to order APIs, WhatsApp Business, or an AI support backend."
  },
  ar: {
    title: "مساعد العابدين",
    subtitle: "الطلبات، البائعون، المسوقون، والدعم",
    open: "فتح مساعد الدردشة",
    close: "إغلاق الدردشة",
    input: "اكتب سؤالك...",
    send: "إرسال",
    greeting: "مرحباً بك في العابدين. أقدر أساعدك في تتبع الطلبات، تسجيل البائعين، روابط المسوقين، أو التواصل مع دعم واتساب.",
    quick: [
      ["تتبع طلبي", "يتم تأكيد الطلبات حالياً يدوياً. افتح صفحة حسابك لمتابعة حالة الطلب: قيد الانتظار، مؤكد، قيد التجهيز، تم الشحن، تم التسليم، ملغي، مرتجع، أو مسترد."],
      ["أصبح بائعاً", "يمكنك التقديم من صفحة البيع. لا توجد رسوم اشتراك عند الإطلاق، ورفع المنتجات مجاني، والعمولة تُحسب فقط عند البيع."],
      ["برنامج المسوقين", "أي مستخدم مسجل يمكنه الترويج للمنتجات بروابط إحالة ومتابعة المبيعات والأرباح من لوحة المسوق."],
      ["دعم واتساب", "للمساعدة السريعة استخدم زر دعم واتساب. رقم الدعم الحالي هو 01124460043."]
    ],
    fallback: "تمام. تم حفظ السؤال داخل محادثة العرض. عند الإطلاق يمكن ربط هذا المساعد بواجهات الطلبات أو واتساب بيزنس أو نظام دعم ذكي."
  }
};

export function ChatBot({ locale }: { locale: AppLocale }) {
  const t = copy[locale];
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: t.greeting }]);
  const quickReplies = useMemo(() => t.quick, [t.quick]);

  function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const matched = quickReplies.find(([label]) => label === trimmed);
    setMessages((items) => [
      ...items,
      { role: "user", text: trimmed },
      { role: "assistant", text: matched?.[1] ?? t.fallback }
    ]);
    setInput("");
    setOpen(true);
  }

  return (
    <div className="fixed bottom-20 z-50 ltr:right-5 rtl:left-5">
      {open ? (
        <section className="w-[min(92vw,380px)] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
          <header className="flex items-center justify-between bg-midnight px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-gold text-ink">
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-bold">{t.title}</h2>
                <p className="text-xs text-white/65">{t.subtitle}</p>
              </div>
            </div>
            <button aria-label={t.close} onClick={() => setOpen(false)} className="focus-ring grid h-9 w-9 place-items-center rounded-md hover:bg-white/10">
              <X className="h-4 w-4" />
            </button>
          </header>
          <div className="max-h-80 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <p className={`max-w-[86%] rounded-lg px-3 py-2 text-sm leading-6 ${message.role === "user" ? "bg-midnight text-white" : "bg-white text-slate-700 shadow-sm"}`}>
                  {message.text}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-slate-100 p-3">
            {quickReplies.map(([label]) => (
              <button key={label} onClick={() => submit(label)} className="focus-ring rounded-md border border-slate-200 px-2 py-2 text-xs font-semibold text-ocean hover:border-gold">
                {label}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2 border-t border-slate-100 p-3"
            onSubmit={(event) => {
              event.preventDefault();
              submit(input);
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t.input}
              className="min-h-11 flex-1 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-gold"
            />
            <button aria-label={t.send} className="focus-ring grid h-11 w-11 place-items-center rounded-md bg-gold text-ink">
              <Send className="h-4 w-4 rtl:rotate-180" />
            </button>
          </form>
        </section>
      ) : (
        <button
          aria-label={t.open}
          onClick={() => setOpen(true)}
          className="focus-ring inline-flex h-12 items-center gap-2 rounded-full bg-midnight px-4 font-bold text-white shadow-soft hover:bg-ocean"
        >
          <MessageCircle className="h-5 w-5 text-gold" />
          <span className="hidden sm:inline">{t.title}</span>
        </button>
      )}
    </div>
  );
}
