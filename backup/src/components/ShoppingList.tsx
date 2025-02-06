import React, { useState } from 'react';
import { ShoppingCart, Plus, Check, Trash2, Filter, Download } from 'lucide-react';

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  checked: boolean;
}

interface GroceryCategory {
  name: string;
  icon: string;
  color: string;
}

const categories: GroceryCategory[] = [
  { name: 'Produce', icon: '🥬', color: 'bg-green-50 text-green-700' },
  { name: 'Proteins', icon: '🫘', color: 'bg-orange-50 text-orange-700' },
  { name: 'Dairy & Alternatives', icon: '🥛', color: 'bg-blue-50 text-blue-700' },
  { name: 'Pantry', icon: '🥫', color: 'bg-yellow-50 text-yellow-700' },
  { name: 'Spices', icon: '🌶️', color: 'bg-red-50 text-red-700' },
  { name: 'Other', icon: '🛒', color: 'bg-gray-50 text-gray-700' }
];

function ShoppingList() {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [filterCategory, setFilterCategory] = useState('All');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    const item: GroceryItem = {
      id: Date.now().toString(),
      name: newItem.trim(),
      category: selectedCategory,
      quantity: newQuantity.trim(),
      checked: false
    };

    setItems([...items, item]);
    setNewItem('');
    setNewQuantity('');
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const clearCheckedItems = () => {
    setItems(items.filter(item => !item.checked));
  };

  const downloadList = () => {
    const text = items
      .sort((a, b) => a.category.localeCompare(b.category))
      .reduce((acc, item) => {
        return acc + `${item.category}: ${item.name} (${item.quantity})\n`;
      }, 'Shopping List:\n\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shopping-list.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredItems = filterCategory === 'All' 
    ? items 
    : items.filter(item => item.category === filterCategory);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold gradient-text">Shopping List</h2>
        <div className="flex space-x-4">
          <button
            onClick={clearCheckedItems}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Checked
          </button>
          <button
            onClick={downloadList}
            className="inline-flex items-center px-3 py-2 border border-primary-600 rounded-md text-sm font-medium text-primary-600 hover:bg-primary-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Download List
          </button>
        </div>
      </div>

      <form onSubmit={handleAddItem} className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add item..."
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div className="w-32">
          <input
            type="text"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            placeholder="Quantity"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div className="w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            {categories.map(category => (
              <option key={category.name} value={category.name}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </button>
      </form>

      <div className="flex items-center space-x-4 py-2">
        <Filter className="h-5 w-5 text-gray-400" />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="rounded-md border-gray-300 text-sm focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="All">All Categories</option>
          {categories.map(category => (
            <option key={category.name} value={category.name}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {filteredItems.map(item => {
            const category = categories.find(c => c.name === item.category);
            return (
              <li key={item.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`flex items-center justify-center w-6 h-6 rounded-full border ${
                        item.checked 
                          ? 'bg-primary-500 border-primary-500' 
                          : 'border-gray-300 hover:border-primary-500'
                      }`}
                    >
                      {item.checked && <Check className="h-4 w-4 text-white" />}
                    </button>
                    <span className={`text-sm ${category?.color} px-2 py-1 rounded-md`}>
                      {category?.icon}
                    </span>
                    <span className={item.checked ? 'line-through text-gray-400' : ''}>
                      {item.name}
                    </span>
                    {item.quantity && (
                      <span className="text-sm text-gray-500">
                        ({item.quantity})
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            );
          })}
          {filteredItems.length === 0 && (
            <li className="p-8 text-center text-gray-500">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>Your shopping list is empty</p>
              <p className="text-sm">Add items using the form above</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ShoppingList;