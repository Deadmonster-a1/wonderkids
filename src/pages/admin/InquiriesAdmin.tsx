import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Download } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function InquiriesAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('AdmissionInquiry').select('*');
      if (error) throw error;
      setItems(data || []);
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
      const { error } = await supabase.from('AdmissionInquiry').delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };
  const handleExport = async () => {
    try {
      const res = await fetch('/api/admin/admissions/export', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (!res.ok) { alert('Export failed'); return; }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'admission-inquiries.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert('Export failed');
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
      const payload = { ...formData };
      
      let error;
      if (isEdit) {
        const { error: updateError } = await supabase.from('AdmissionInquiry').update(payload).eq('id', editingItem.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase.from('AdmissionInquiry').insert([payload]);
        error = insertError;
      }
      
      if (!error) {
        handleCloseModal();
        fetchData();
      } else {
        alert('Failed to save: ' + error.message);
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
        <h2 className="text-xl font-bold text-brand-navy dark:text-white">Manage Inquiries</h2>

        <button onClick={handleExport} className="bg-brand-indigo text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-opacity-90 transition-colors">
          <Download className="w-5 h-5" /> Export to Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-brand-navy/50 text-brand-slate">
            <tr>
              <th className="px-6 py-4 font-bold">Parent Name</th>
              <th className="px-6 py-4 font-bold">Student Name</th>
              <th className="px-6 py-4 font-bold">Email</th>
              <th className="px-6 py-4 font-bold">Phone</th>
              <th className="px-6 py-4 font-bold">Grade</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-t border-slate-100 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-brand-navy/50 transition-colors">
                
                <td className="px-6 py-4 text-brand-navy dark:text-white max-w-[200px] truncate">
                  {item.parentName}
                </td>
                <td className="px-6 py-4 text-brand-navy dark:text-white max-w-[200px] truncate">
                  {item.studentName}
                </td>
                <td className="px-6 py-4 text-brand-navy dark:text-white max-w-[200px] truncate">
                  {item.email}
                </td>
                <td className="px-6 py-4 text-brand-navy dark:text-white max-w-[200px] truncate">
                  {item.phone}
                </td>
                <td className="px-6 py-4 text-brand-navy dark:text-white max-w-[200px] truncate">
                  {item.gradeApplying}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    item.status === 'NEW' ? 'bg-blue-100 text-blue-800' :
                    item.status === 'CONTACTED' ? 'bg-yellow-100 text-yellow-800' :
                    item.status === 'ENROLLED' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleOpenModal(item)} className="p-2 text-brand-slate hover:text-brand-indigo hover:bg-slate-50 dark:hover:bg-brand-indigo/10 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-brand-slate">No records found.</td>
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
                {editingItem ? 'Edit Inquiry' : 'Add Inquiry'}
              </h3>
              <button onClick={handleCloseModal} className="text-brand-slate hover:text-brand-navy dark:hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {editingItem ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Student Name</label>
                      <div className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-brand-slate dark:text-slate-300">{formData.studentName}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Parent Name</label>
                      <div className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-brand-slate dark:text-slate-300">{formData.parentName}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Email</label>
                      <div className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-brand-slate dark:text-slate-300">{formData.email}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Phone</label>
                      <div className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-brand-slate dark:text-slate-300">{formData.phone}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Grade Applying</label>
                      <div className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-brand-slate dark:text-slate-300">{formData.gradeApplying}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Submitted</label>
                      <div className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-brand-slate dark:text-slate-300">
                        {formData.createdAt ? new Date(formData.createdAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Message</label>
                    <div className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-brand-slate dark:text-slate-300 min-h-[60px] whitespace-pre-wrap">{formData.message || 'No message provided'}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Status</label>
                    <select
                      value={formData.status || 'NEW'}
                      onChange={e => setFormData({...formData, status: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-indigo outline-none dark:text-white"
                    >
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="ENROLLED">Enrolled</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Admin Notes</label>
                    <textarea 
                      value={formData.adminNotes || ''} 
                      onChange={e => setFormData({...formData, adminNotes: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-indigo outline-none dark:text-white h-24 resize-none"
                      placeholder="Add notes about this inquiry..."
                    />
                  </div>
                </>
              ) : (
                <div className="text-center text-brand-slate py-8">Inquiries can only be created from the public website.</div>
              )}

              <div className="flex justify-end pt-4 gap-2 sticky bottom-0 bg-white dark:bg-brand-navy py-4 border-t border-slate-100 dark:border-white/10 mt-6">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-brand-slate hover:text-brand-navy dark:hover:text-white font-bold transition-colors">
                  Cancel
                </button>
                {editingItem && (
                  <button type="submit" disabled={saving} className="bg-brand-indigo text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 disabled:opacity-50 transition-colors flex items-center">
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
