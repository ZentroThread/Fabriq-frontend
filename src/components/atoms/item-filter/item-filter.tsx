import { useState, useMemo, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

interface Item {
  id: string;
  code: string;
  title: string;
  description: string;
  category: {
    tenantId: string;
    categoryId: number;
    categoryCode: string;
    categoryName: string;
  };
  status: string;
}

interface ItemSearchFilterProps {
  items: Item[];
  onSearchChange: (query: string) => void;
}

export function ItemSearchFilter({
  items,
  onSearchChange,
}: ItemSearchFilterProps) {
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Get search suggestions based on input
  const suggestions = useMemo(() => {
    if (!searchValue.trim()) return [];

    const query = searchValue.toLowerCase();
    const matches = items
      .filter(
        (item) =>
          item.title?.toLowerCase().includes(query) ||
          item.code?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query)
      )
      .slice(0, 8); // Limit to 8 suggestions

    return matches;
  }, [searchValue, items]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setShowSuggestions(true);
    onSearchChange(value);
  };

  const handleSuggestionClick = (item: Item) => {
    setSearchValue(item.title);
    setShowSuggestions(false);
    onSearchChange(item.title);
  };

  const handleClear = () => {
    setSearchValue("");
    setShowSuggestions(false);
    onSearchChange("");
  };

  // Highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span
              key={i}
              className="bg-yellow-200 dark:bg-yellow-900 font-semibold"
            >
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div className="w-full mr-3 relative" ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-position-text  pointer-events-none" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search by name, code, or description..."
          className="w-full  pl-10 pr-10 h-10 text-position-text  border-position-text border-1 rounded-md bg-main-bg focus:outline-none focus:ring-1 focus:ring-position-text "
        />
        {searchValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Autocomplete Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-light-white border rounded-lg shadow-lg max-h-[400px] overflow-y-auto">
          <div className="py-2">
            {suggestions.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSuggestionClick(item)}
                className="w-full px-4 py-3 text-left hover:bg-accent transition-colors flex items-start gap-3 border-b border-border last:border-b-0"
              >
                <Search className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm mb-1">
                    {highlightMatch(item.title, searchValue)}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
                    <span className="bg-muted px-2 py-0.5 rounded">
                      {highlightMatch(item.code, searchValue)}
                    </span>
                    <span>•</span>
                    <span>{item.category.categoryName}</span>
                  </div>
                  {item.description && (
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {highlightMatch(item.description, searchValue)}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No results message */}
      {showSuggestions && searchValue.trim() && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-popover border rounded-lg shadow-lg">
          <div className="py-8 text-center text-muted-foreground text-sm">
            No items found matching "{searchValue}"
          </div>
        </div>
      )}
    </div>
  );
}
