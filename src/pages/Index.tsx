import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { SlSocialLinkedin } from "react-icons/sl";

type Quote = {
  text: string;
  author: string;
  tags?: string[];
  dateAdded?: string; // ISO string
};

// quotes removed — app now fetches quotes from the Quotable API

const mapQuotableToQuote = (q: any): Quote => ({
  text: q.content || q.text || "",
  author: q.author || "Unknown",
  tags: Array.isArray(q.tags) ? q.tags : q.tags ? [q.tags] : undefined,
  dateAdded: q.dateModified || q.dateAdded || undefined,
});

const fetchTechQuote = async (): Promise<Quote> => {
  const res = await fetch("https://api.quotable.io/random?tags=technology");
  if (!res.ok) throw new Error("Failed to fetch quote");
  const data = await res.json();
  return mapQuotableToQuote(data);
};

const colors = ["#16a085", "#f39c12", "#e74c3c", "#3498db", "#9b59b6"];

const Index = () => {
  // removed getRandomQuote — quotes are fetched from the API

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const [color, setColor] = useState(getRandomColor());

  const [quote, setQuote] = useState<Quote>({ text: "", author: "" });

  useEffect(() => {
    void handleFetchTechQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchTechQuote = async () => {
    try {
      const q = await fetchTechQuote();
      setQuote(q);
      setColor(getRandomColor());
    } catch (err) {
      // show a simple error message on failure
      setQuote({ text: "Failed to fetch quote.", author: "Unknown" });
    }
  };

  const whatsappUrl = `https://wa.link/jxd15x?text=${encodeURIComponent(
    `"${quote.text}" - ${quote.author}`,
  )}`;

  const linkedinUrl = `https://linkedin.com/in/adebanji-emmanuel?posttype=quote&tags=quotes&caption=${encodeURIComponent(
    quote.author,
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
            <span>{quote.text}<span className="text-4xl leading-none">"</span></span>
            
          </div>
          <div
            id="author"
            className="text-right text-lg transition-all duration-700 ease-in-out"
            style={{ color }}
          >
            - {quote.author}
            {quote.tags && quote.tags.length > 0 && (
              <div className="text-xs mt-1" style={{ color }}>
                Tag: {quote.tags[0]}
              </div>
            )}
            {quote.dateAdded && (
              <div className="text-xs mt-1" style={{ color }}>
                Date Added: {new Date(quote.dateAdded).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <a
              id="tweet-quote"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded transition-all duration-700 ease-in-out hover:opacity-80"
              style={{ backgroundColor: color }}
              aria-label="Tweet this quote"
            >
              <FaWhatsapp className="w-5 h-5 text-white" />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded transition-all duration-700 ease-in-out hover:opacity-80"
              style={{ backgroundColor: color }}
              aria-label="Share on Tumblr"
            >
              <SlSocialLinkedin className="w-5 h-5 text-white" />
            </a>
          </div>

          <div className="flex gap-2">
            <button
              id="fetch-tech-quote"
              onClick={handleFetchTechQuote}
              className="px-4 py-2 rounded text-white font-medium transition-all duration-700 ease-in-out hover:opacity-80"
              style={{ backgroundColor: color }}
            >
              Fetch tech quote
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-white text-sm">by eonsyntax</div>
    </div>
  );
};

export default Index;
