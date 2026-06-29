import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function MessagesAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/contacts', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenModal = (item: any = null) => {
    setEditingItem(item);
    setFormData(item || {});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit = !!editingItem;
      const url = isEdit ? `/api/admin/contacts/${editingItem.id}` : `/api/admin/contacts`;
      const method = isEdit ? 'PUT' : 'POST';
      
      // Parse numbers if necessary based on model type
      const payload = { ...formData };
      
      
      // Parse JSON fields
      

      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}` 
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        handleCloseModal();
        fetchData();
      } else {
        alert('Failed to save');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white dark:bg-brand-navy rounded-2xl shadow-sm border border-slate-100 dark:border-white/10 overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-white/10 flex justify-between items-center">
        <h2 className="text-xl font-bold text-brand-navy dark:text-white">Manage Messages</h2>
        
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-brand-navy/50 text-brand-slate">
            <tr>
              <th className="px-6 py-4 font-bold">Name</th>
              <th className="px-6 py-4 font-bold">Email</th>
              <th className="px-6 py-4 font-bold">Subject</th>
              <th className="px-6 py-4 font-bold">Message</th>
              <th className="px-6 py-4 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-t border-slate-100 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-brand-navy/50 transition-colors">
                
                <td className="px-6 py-4 text-brand-navy dark:text-white max-w-[200px] truncate">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-brand-navy dark:text-white max-w-[200px] truncate">
                  {item.email}
                </td>
                <td className="px-6 py-4 text-brand-navy dark:text-white max-w-[200px] truncate">
                  {item.subject}
                </td>
                <td className="px-6 py-4 text-brand-navy dark:text-white max-w-[200px] truncate">
                  {item.message}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-brand-slate">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-brand-navy rounded-2xl w-full max-w-lg shadow-xl border border-slate-100 dark:border-white/10 my-8">
            <div className="p-6 border-b border-slate-100 dark:border-white/10 flex justify-between items-center sticky top-0 bg-white dark:bg-brand-navy rounded-t-2xl z-10">
              <h3 className="text-xl font-bold text-brand-navy dark:text-white">
                {editingItem ? 'Edit Message' : 'Add Message'}
              </h3>
              <button onClick={handleCloseModal} className="text-brand-slate hover:text-brand-navy dark:hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              
              <div>
                <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Name</label>
                
                <input 
                  type="text" 
                  value={formData.name || ''} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-indigo outline-none dark:text-white"
                  
                />
                
              </div>
              
              <div>
                <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Email</label>
                
                <input 
                  type="text" 
                  value={formData.email || ''} 
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-indigo outline-none dark:text-white"
                  
                />
                
              </div>
              
              <div>
                <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Subject</label>
                
                <input 
                  type="text" 
                  value={formData.subject || ''} 
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-indigo outline-none dark:text-white"
                  
                />
                
              </div>
              
              <div>
                <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Message</label>
                
                <textarea 
                  value={formData.message || ''} 
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-indigo outline-none dark:text-white"
                  rows={3}
                  
                />
                
              </div>
              
              <div>
                <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Status</label>
                
                <input 
                  type="text" 
                  value={formData.status || ''} 
                  onChange={e => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-indigo outline-none dark:text-white"
                  
                />
                
              </div>
              
              <div>
                <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Date</label>
                
                <input 
                  type="text" 
                  value={formData.createdAt || ''} 
                  onChange={e => setFormData({...formData, createdAt: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-indigo outline-none dark:text-white"
                  
                />
                
              </div>
              
              
              <div className="flex justify-end pt-4 gap-2 sticky bottom-0 bg-white dark:bg-brand-navy py-4 border-t border-slate-100 dark:border-white/10 mt-6">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-brand-slate hover:text-brand-navy dark:hover:text-white font-bold transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="bg-brand-indigo text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 disabled:opacity-50 transition-colors flex items-center">
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
