
import { useState, useEffect } from "react";
import { menuItems } from "@/data/menuItems";
import MenuItemCard from "./MenuItemCard";
import CategoryFilter from "./CategoryFilter";
import DietaryFilter from "./DietaryFilter";
import SearchBar from "./SearchBar";
import { MenuItem } from "@/types/menu";

export default function MenuLayout() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuItems);

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  useEffect(() => {
    let filtered = [...menuItems];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Filter by dietary tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((item) =>
        selectedTags.every((tag) => item.tags.includes(tag))
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    setFilteredItems(filtered);
  }, [selectedCategory, selectedTags, searchQuery]);

  return (
    <div className="w-full space-y-6">
      <div className="space-y-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        
        <CategoryFilter
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
        />
        
        <DietaryFilter
          selectedTags={selectedTags}
          onToggleTag={handleToggleTag}
        />
      </div>

      <div>
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No items found</h3>
            <p className="text-muted-foreground">
              Try changing your filters or search query
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
