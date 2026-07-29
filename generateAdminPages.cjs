const fs = require('fs');
const path = require('path');

const models = [
  {
    name: 'Program',
    endpoint: 'programs',
    title: 'Programs',
    fields: [
      { key: 'title', label: 'Title', required: true },
      { key: 'gradeRange', label: 'Grade Range', required: true },
      { key: 'iconName', label: 'Icon Name (lucide)', required: true },
      { key: 'description', label: 'Description', required: true },
      { key: 'themeConfig', label: 'Theme Config (JSON)', required: true, isJson: true }
    ]
  },
  {
    name: 'GalleryItem',
    endpoint: 'gallery',
    title: 'Gallery',
    fields: [
      { key: 'imageUrl', label: 'Image URL', required: true },
      { key: 'altText', label: 'Alt Text', required: true },
      { key: 'category', label: 'Category', required: true }
    ]
  },
  {
    name: 'FeeTier',
    endpoint: 'fees',
    title: 'Fees',
    fields: [
      { key: 'tierName', label: 'Tier Name', required: true },
      { key: 'grades', label: 'Grades', required: true },
      { key: 'monthlyFee', label: 'Monthly Fee', required: true, type: 'number' },
      { key: 'annualFee', label: 'Annual Fee', required: true, type: 'number' },
      { key: 'features', label: 'Features (JSON Array)', required: true, isJson: true }
    ]
  },
  {
    name: 'Teacher',
    endpoint: 'teachers',
    title: 'Teachers',
    fields: [
      { key: 'name', label: 'Name', required: true },
      { key: 'title', label: 'Title', required: true },
      { key: 'specialization', label: 'Specialization', required: true },
      { key: 'experience', label: 'Experience', required: true },
      { key: 'bio', label: 'Bio', required: true },
      { key: 'avatarUrl', label: 'Avatar URL' },
      { key: 'iconName', label: 'Icon Name' },
      { key: 'colorTheme', label: 'Color Theme' }
    ]
  },
  {
    name: 'Testimonial',
    endpoint: 'testimonials',
    title: 'Testimonials',
    fields: [
      { key: 'parentName', label: 'Parent Name', required: true },
      { key: 'roleDesc', label: 'Role Description', required: true },
      { key: 'content', label: 'Review Content', required: true },
      { key: 'rating', label: 'Rating (1-5)', required: true, type: 'number' },
      { key: 'imageUrl', label: 'Image URL' }
    ]
  },
  {
    name: 'Faq',
    endpoint: 'faqs',
    title: 'FAQs',
    fields: [
      { key: 'question', label: 'Question', required: true },
      { key: 'answer', label: 'Answer', required: true }
    ]
  },
  {
    name: 'Inquiry',
    endpoint: 'inquiries',
    title: 'Inquiries',
    fields: [
      { key: 'parentName', label: 'Parent Name' },
      { key: 'childName', label: 'Child Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'status', label: 'Status' },
      { key: 'createdAt', label: 'Date', isDate: true }
    ],
    readonly: true
  },
  {
    name: 'Message',
    endpoint: 'contacts',
    title: 'Messages',
    fields: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'subject', label: 'Subject' },
      { key: 'message', label: 'Message' },
      { key: 'status', label: 'Status' },
      { key: 'createdAt', label: 'Date', isDate: true }
    ],
    readonly: true
  }
];

const template = (model) => `import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function ${model.name}sAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/${model.endpoint}', {
        headers: { 'Authorization': \`Bearer \${localStorage.getItem('adminToken')}\` }
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
      await fetch(\`/api/admin/${model.endpoint}/\${id}\`, {
        method: 'DELETE',
        headers: { 'Authorization': \`Bearer \${localStorage.getItem('adminToken')}\` }
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
      const url = isEdit ? \`/api/admin/${model.endpoint}/\${editingItem.id}\` : \`/api/admin/${model.endpoint}\`;
      const method = isEdit ? 'PUT' : 'POST';
      
      // Parse numbers if necessary based on model type
      const payload = { ...formData };
      ${model.fields.filter(f => f.type === 'number').map(f => `
      if (payload.${f.key}) payload.${f.key} = Number(payload.${f.key});
      `).join('')}
      
      // Parse JSON fields
      ${model.fields.filter(f => f.isJson).map(f => `
      if (payload.${f.key} && typeof payload.${f.key} === 'string') {
        try {
          JSON.parse(payload.${f.key});
        } catch(e) {
          payload.${f.key} = JSON.stringify(payload.${f.key}.split(',').map((s: string) => s.trim()));
        }
      } else if (!payload.${f.key}) {
        payload.${f.key} = '[]';
      }
      `).join('')}

      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${localStorage.getItem('adminToken')}\` 
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
        <h2 className="text-xl font-bold text-brand-navy dark:text-white">Manage ${model.title}</h2>
        ${!model.readonly ? `
        <button onClick={() => handleOpenModal()} className="bg-brand-indigo text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-opacity-90 transition-colors">
          <Plus className="w-5 h-5" /> Add ${model.name}
        </button>
        ` : ''}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-brand-navy/50 text-brand-slate">
            <tr>
              ${model.fields.slice(0, 4).map(f => `<th className="px-6 py-4 font-bold">${f.label}</th>`).join('\n              ')}
              <th className="px-6 py-4 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-t border-slate-100 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-brand-navy/50 transition-colors">
                ${model.fields.slice(0, 4).map(f => `
                <td className="px-6 py-4 text-brand-navy dark:text-white max-w-[200px] truncate">
                  ${f.isDate ? `{new Date(item.${f.key}).toLocaleDateString()}` : `{item.${f.key}}`}
                </td>`).join('')}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    ${!model.readonly ? `
                    <button onClick={() => handleOpenModal(item)} className="p-2 text-brand-indigo hover:bg-brand-indigo/10 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    ` : ''}
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={${Math.min(model.fields.length, 4) + 1}} className="px-6 py-8 text-center text-brand-slate">No records found.</td>
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
                {editingItem ? 'Edit ${model.name}' : 'Add ${model.name}'}
              </h3>
              <button onClick={handleCloseModal} className="text-brand-slate hover:text-brand-navy dark:hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              ${model.fields.map(f => `
              <div>
                <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">${f.label}</label>
                ${f.key === 'content' || f.key === 'answer' || f.key === 'description' || f.key === 'bio' || f.key === 'message' ? `
                <textarea 
                  value={formData.${f.key} || ''} 
                  onChange={e => setFormData({...formData, ${f.key}: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-indigo outline-none dark:text-white"
                  rows={3}
                  ${f.required ? 'required' : ''}
                />
                ` : `
                <input 
                  type="${f.type || 'text'}" 
                  value={formData.${f.key} || ''} 
                  onChange={e => setFormData({...formData, ${f.key}: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-indigo outline-none dark:text-white"
                  ${f.required ? 'required' : ''}
                />
                `}
              </div>
              `).join('')}
              
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
`;

models.forEach(model => {
  const file = path.join(process.cwd(), 'src/pages/admin', model.name + 'sAdmin.tsx');
  fs.writeFileSync(file, template(model));
  console.log('Created', file);
});
