import { useMemo, useRef } from "react";
import { Search, X } from "lucide-react";
import { useItemFilterStore } from "@/store/item-filter-store";

interface Item {
  id: string | number;
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
  const {
    searchValue,
    showSuggestions,
    setSearchValue,
    setShowSuggestions,
    clearSearch,
  } = useItemFilterStore();

  const listboxRef = useRef<HTMLDivElement>(null);

  // Get search suggestions based on input
  const suggestions = useMemo(() => {
    if (!searchValue.trim()) return [];

    const query = searchValue.toLowerCase();
    const queryRegex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );

    return items
      .filter(
        (item) =>
          item.title?.toLowerCase().includes(query) ||
          item.code?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query)
      )
      .slice(0, 8)
      .map((item) => ({ ...item, _queryRegex: queryRegex }));
  }, [searchValue, items]);

  const handleBlur = (e: React.FocusEvent) => {
    // If the new focus is NOT inside this component's container, close suggestions
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowSuggestions(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearchChange(value);
  };

  const handleSuggestionClick = (title: string) => {
    setSearchValue(title);
    setShowSuggestions(false);
    onSearchChange(title);
  };

  const handleClear = () => {
    clearSearch();
    onSearchChange("");
  };

  // Highlight matching text using the precompiled regex stored on the mapped suggestion
  const highlightMatch = (text: string, regex: RegExp | undefined) => {
    if (!regex || !text) return text;

    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
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
    <div className="w-full mr-3 relative" onBlur={handleBlur} tabIndex={-1}>
      {/* Search Input */}
      <div
        className="relative"
        role="combobox"
        aria-expanded={showSuggestions}
        aria-owns="search-suggestions"
        aria-haspopup="listbox"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-position-text pointer-events-none" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          aria-autocomplete="list"
          aria-controls="search-suggestions"
          placeholder="Search by name, code, or description..."
          className="w-full pl-10 pr-10 h-10 text-position-text border-position-text border rounded-md bg-main-bg focus:outline-none focus:ring-1 focus:ring-position-text"
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
        <div
          id="search-suggestions"
          role="listbox"
          ref={listboxRef}
          className="absolute z-50 w-full mt-2 bg-light-white border rounded-lg shadow-lg max-h-100 overflow-y-auto"
        >
          <div className="py-2">
            {suggestions.map((item) => (
              <button
                key={item.id}
                role="option"
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevents losing focus before click fires
                  handleSuggestionClick(item.title);
                }}
                className="w-full px-4 py-3 text-left transition-colors flex items-start gap-3 border-b border-border hover:bg-accent last:border-b-0"
              >
                <Search className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm mb-1">
                    {highlightMatch(item.title, item._queryRegex)}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
                    <span className="bg-muted px-2 py-0.5 rounded">
                      {highlightMatch(item.code, item._queryRegex)}
                    </span>
                    <span>•</span>
                    <span>{item.category.categoryName}</span>
                  </div>
                  {item.description && (
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {highlightMatch(item.description, item._queryRegex)}
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
