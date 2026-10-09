import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Mic,
  MicOff,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { sendChatMessage } from "../../services/chatService.js";
import "./ChatBot.css";

/* ── Constants ────────────────────────────────────────────────────────────── */

const GREETING = `Hi! I am Mani's Portfolio AI 👋

I can help you learn about his skills, projects, experience, and more.

You can type your question or use voice input.

What would you like to know?`;

const SUGGESTIONS = [
  "Tell me about Manikandan",
  "What are his technical skills?",
  "Tell me about his projects",
  "What is MockVoice AI Interview Coach?",
  "Tell me about his internship",
  "Tell me about his education",
  "What technologies does he use?",
  "How can I contact him?",
];

/* ── Helpers ──────────────────────────────────────────────────────────────── */

function useAutoResizeTextarea(ref, value) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 100) + "px";
  }, [value, ref]);
}

/**
 * Lightweight inline renderer.
 * Converts the AI plain-text response into clean JSX.
 * Handles: **bold**, bullet lines (- / • / * at line start), numbered lists,
 * and paragraph breaks — without any external library.
 */
function renderMarkdown(text) {
  if (!text) return null;

  // Split into lines, then group into paragraphs / list blocks
  const lines = text.split("\n");
  const elements = [];
  let listBuffer = [];
  let keyCounter = 0;

  const flushList = () => {
    if (listBuffer.length === 0) return;
    elements.push(
      <ul key={`ul-${keyCounter++}`} className="chatbot-list">
        {listBuffer.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();

    // Skip horizontal rules
    if (/^[-_*]{3,}$/.test(trimmed)) continue;

    // Detect bullet line: starts with -, *, •, or number.
    const bulletMatch = trimmed.match(/^(?:[-*•]|\d+[.)]) +(.+)$/);
    if (bulletMatch) {
      listBuffer.push(bulletMatch[1]);
      continue;
    }

    // Non-bullet line — flush any pending list first
    flushList();

    // Strip leading Markdown headings (### / ## / #)
    const headingStripped = trimmed.replace(/^#{1,6}\s+/, "");

    if (headingStripped === "") {
      // Blank line — paragraph break (only if not first element)
      if (elements.length > 0) {
        elements.push(<div key={`br-${keyCounter++}`} className="chatbot-para-break" />);
      }
    } else {
      elements.push(
        <p key={`p-${keyCounter++}`} className="chatbot-para">
          {renderInline(headingStripped)}
        </p>
      );
    }
  }

  flushList();
  return elements;
}

/** Handles **bold** inline within a line of text */
function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

/* ── Typing Indicator ─────────────────────────────────────────────────────── */
const TypingIndicator = () => (
  <div className="chatbot-typing" aria-label="Assistant is typing">
    <div className="chatbot-typing-dot" />
    <div className="chatbot-typing-dot" />
    <div className="chatbot-typing-dot" />
  </div>
);

/* ── Message Bubble ───────────────────────────────────────────────────────── */
const MessageBubble = ({ message }) => (
  <motion.div
    className={`chatbot-message chatbot-message--${message.role}`}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
  >
    <div className={`chatbot-bubble chatbot-bubble--${message.role}`}>
      {message.role === "assistant"
        ? renderMarkdown(message.content)
        : message.content}
    </div>
  </motion.div>
);

/* ── Main ChatBot Component ───────────────────────────────────────────────── */
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: GREETING },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const panelRef = useRef(null);
  const isNearBottomRef = useRef(true);
  const prevMessagesCountRef = useRef(messages.length);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);

  useAutoResizeTextarea(textareaRef, inputValue);

  /* ── Track User Scroll Position ─────────────────────────────────────────── */
  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const threshold = 80;
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    isNearBottomRef.current = distanceFromBottom <= threshold;
  }, []);


  /* ── Check Voice Support ────────────────────────────────────────────────── */
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    setVoiceSupported(!!SpeechRecognition);
  }, []);

  /* ── Auto-scroll ─────────────────────────────────────────────────────────── */
  // Only auto-scroll when:
  //   a) a new message was added (user sent or AI replied)
  //   b) the typing indicator appears AND the user is already near the bottom
  // Never force-scroll while user is reading old messages.
  useEffect(() => {
    const isNewMessage = messages.length > prevMessagesCountRef.current;
    prevMessagesCountRef.current = messages.length;

    if (isNewMessage && isNearBottomRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else if (isLoading && isNearBottomRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages, isLoading]);

  /* ── Focus input on open ────────────────────────────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        textareaRef.current?.focus();
        messagesEndRef.current?.scrollIntoView({ behavior: "auto", block: "nearest" });
      }, 300);
    }
  }, [isOpen]);

  /* ── Send Message ───────────────────────────────────────────────────────── */
  const handleSend = useCallback(
    async (textOverride) => {
      const text = (textOverride ?? inputValue).trim();
      if (!text || isLoading) return;

      const userMessage = { role: "user", content: text };
      const updatedMessages = [...messages, userMessage];

      isNearBottomRef.current = true;
      setMessages(updatedMessages);
      setInputValue("");
      setError(null);
      setIsLoading(true);
      setShowSuggestions(false);

      try {
        // Only send user/assistant messages to the backend (exclude greeting)
        const historyToSend = updatedMessages.filter(
          (m) => m.role === "user" || m.role === "assistant"
        );
        const reply = await sendChatMessage(historyToSend);
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      } catch (err) {
        setError(err.message || "Sorry, I couldn't process that right now. Please try again.");
      } finally {
        setIsLoading(false);
        setTimeout(() => textareaRef.current?.focus(), 50);
      }
    },
    [inputValue, isLoading, messages]
  );

  /* ── Keyboard Handler ────────────────────────────────────────────────────── */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  /* ── Voice Input ─────────────────────────────────────────────────────────── */
  const toggleVoice = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Voice input isn't supported in this browser. You can still type your question.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      setVoiceStatus("");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognitionRef.current = recognition;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceStatus("Listening... speak now");
        setError(null);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((r) => r[0].transcript)
          .join("");
        setInputValue(transcript);
        if (event.results[event.results.length - 1].isFinal) {
          setVoiceStatus("Transcript ready — click Send to submit");
        }
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        setVoiceStatus("");
        if (event.error === "not-allowed") {
          setError("Microphone access was denied. Please allow microphone access in your browser settings.");
        } else if (event.error === "no-speech") {
          setError("No speech detected. Please try again.");
        } else {
          setError("Voice recognition encountered an error. Please try typing instead.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        if (voiceStatus === "Listening... speak now") {
          setVoiceStatus("");
        }
      };

      recognition.start();
    } catch {
      setError("Could not start voice recognition. Please try typing instead.");
      setIsListening(false);
    }
  }, [isListening, voiceStatus]);

  /* ── Cleanup on unmount ──────────────────────────────────────────────────── */
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  /* ── Render ──────────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── Floating Trigger ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <div className="chatbot-trigger" aria-label="Open AI Assistant">
            <motion.button
              className="chatbot-float-card"
              onClick={() => setIsOpen(true)}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Open Mani's AI Portfolio Assistant"
            >
              <div className="chatbot-avatar" aria-hidden="true">
                <Bot size={20} color="#ffffff" />
              </div>
              <div className="chatbot-float-text">
                <div className="chatbot-float-title">Ask Mani's AI</div>
                <div className="chatbot-float-sub">Get instant answers about his portfolio</div>
              </div>
              <ChevronRight size={14} className="chatbot-chevron" aria-hidden="true" />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* ── Chat Panel ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            className="chatbot-panel chat-panel"
            data-lenis-prevent="true"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            role="dialog"
            aria-label="Mani's Portfolio AI Chat"
            aria-modal="true"
          >
            {/* ── Header ─────────────────────────────────────────────────── */}
            <div className="chatbot-header chat-header">
              <div className="chatbot-header-left">
                <div className="chatbot-header-avatar" aria-hidden="true">
                  <Sparkles size={18} color="#ffffff" />
                </div>
                <div>
                  <div className="chatbot-header-name">Mani's Portfolio AI</div>
                  <div className="chatbot-header-sub">Your personal portfolio assistant</div>
                </div>
              </div>
              <button
                className="chatbot-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat panel"
              >
                <X size={15} />
              </button>
            </div>

            {/* ── Messages ───────────────────────────────────────────────── */}
            <div
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="chatbot-messages chat-messages"
              data-lenis-prevent="true"
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
            >
              {messages.map((msg, idx) => (
                <MessageBubble key={idx} message={msg} />
              ))}

              {/* ── Quick Suggestions ───────────────────────────────────────── */}
              <AnimatePresence>
                {showSuggestions && !isLoading && (
                  <motion.div
                    className="chatbot-suggestions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    aria-label="Quick question suggestions"
                  >
                    {SUGGESTIONS.map((q) => (
                      <button
                        key={q}
                        className="chatbot-suggestion-btn"
                        onClick={() => handleSend(q)}
                        disabled={isLoading}
                        aria-label={`Ask: ${q}`}
                      >
                        {q}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <TypingIndicator />
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Error ──────────────────────────────────────────────────── */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="chatbot-error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  role="alert"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Voice Status ────────────────────────────────────────────── */}
            <AnimatePresence>
              {voiceStatus && (
                <motion.div
                  className="chatbot-voice-status"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  aria-live="polite"
                >
                  {voiceStatus}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Input Area ─────────────────────────────────────────────── */}
            <div className="chatbot-input-area chat-input">
              <div
                className={`chatbot-input-row${isListening ? " chatbot-input-row--listening" : ""}`}
              >
                <textarea
                  ref={textareaRef}
                  className="chatbot-textarea"
                  placeholder={
                    isListening
                      ? "Listening..."
                      : "Type your message or speak..."
                  }
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setError(null);
                  }}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  rows={1}
                  aria-label="Chat message input"
                  aria-multiline="true"
                />

                {/* Microphone button */}
                <button
                  className={`chatbot-input-btn chatbot-mic-btn${isListening ? " chatbot-mic-btn--active" : ""}`}
                  onClick={toggleVoice}
                  disabled={isLoading}
                  aria-label={isListening ? "Stop voice input" : voiceSupported ? "Start voice input" : "Voice input not supported"}
                  title={voiceSupported ? (isListening ? "Stop listening" : "Start voice input") : "Voice not supported in this browser"}
                >
                  {isListening ? <MicOff size={15} /> : <Mic size={15} />}
                </button>

                {/* Send button */}
                <button
                  className="chatbot-input-btn chatbot-send-btn"
                  onClick={() => handleSend()}
                  disabled={isLoading || !inputValue.trim()}
                  aria-label="Send message"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;