import { useState } from "react";
import { Twitter } from "lucide-react";

const quotes = [
  { text: "There are no traffic jams along the extra mile.", author: "Roger Staubach" },
  { text: "If you can dream it, you can achieve it.", author: "Zig Ziglar" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
];

const colors = ["#16a085", "#f39c12", "#e74c3c", "#3498db", "#9b59b6"];

const Index = () => {
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const [quote, setQuote] = useState(getRandomQuote());
  const [color, setColor] = useState(getRandomColor());

  const handleNewQuote = () => {
    setQuote(getRandomQuote());
    setColor(getRandomColor());
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${quote.text}" - ${quote.author}`
  )}`;

  const tumblrUrl = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${encodeURIComponent(
    quote.author
  )}&content=${encodeURIComponent(quote.text)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center transition-all duration-700 ease-in-out"
      style={{ backgroundColor: color }}
    >
      <div
        id="quote-box"
        className="bg-white rounded-lg shadow-xl p-12 max-w-2xl w-full mx-4 transition-all duration-700 ease-in-out"
      >
        <div className="mb-8">
          <div
            id="text"
            className="text-3xl font-serif mb-4 transition-all duration-700 ease-in-out flex items-start gap-2"
            style={{ color }}
          >
            <span className="text-4xl leading-none">"</span>
            <span>{quote.text}</span>
          </div>
          <div
            id="author"
            className="text-right text-lg transition-all duration-700 ease-in-out"
            style={{ color }}
          >
            - {quote.author}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <a
              id="tweet-quote"
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded transition-all duration-700 ease-in-out hover:opacity-80"
              style={{ backgroundColor: color }}
              aria-label="Tweet this quote"
            >
              <Twitter className="w-5 h-5 text-white" />
            </a>
            <a
              href={tumblrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded transition-all duration-700 ease-in-out hover:opacity-80"
              style={{ backgroundColor: color }}
              aria-label="Share on Tumblr"
            >
              <span className="text-white font-bold text-lg">t</span>
            </a>
          </div>

          <button
            id="new-quote"
            onClick={handleNewQuote}
            className="px-6 py-2 rounded text-white font-medium transition-all duration-700 ease-in-out hover:opacity-80"
            style={{ backgroundColor: color }}
          >
            New quote
          </button>
        </div>
      </div>

      <div className="mt-8 text-white text-sm">by hezag</div>
    </div>
  );
};

export default Index;
