import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

export default function SettingsAdmin() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (res.ok) {
        const data = await res.json();
        const mappedSettings: Record<string, string> = {};
        if (Array.isArray(data.data)) {
          data.data.forEach((s: any) => {
            mappedSettings[s.key] = s.value;
          });
        }
        setSettings(mappedSettings);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
        const payload = Object.entries(settings).map(([key, value]) => ({ key, value }));
        await fetch('/api/admin/settings', {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}` 
          },
          body: JSON.stringify(payload)
        });
      alert('Settings saved successfully!');
    } catch (e) {
      console.error(e);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white dark:bg-brand-navy rounded-2xl shadow-sm border border-slate-100 dark:border-white/10 overflow-hidden max-w-3xl">
      <div className="p-6 border-b border-slate-100 dark:border-white/10">
        <h2 className="text-xl font-bold text-brand-navy dark:text-white">Global Site Settings</h2>
        <p className="text-brand-slate text-sm mt-1">Manage global information displayed across the site.</p>
      </div>
      <form onSubmit={handleSave} className="p-6 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">School Name</label>
            <input 
              type="text" 
              value={settings.schoolName || ''} 
              onChange={e => handleChange('schoolName', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-indigo outline-none dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Contact Email</label>
            <input 
              type="email" 
              value={settings.contactEmail || ''} 
              onChange={e => handleChange('contactEmail', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-indigo outline-none dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Contact Phone</label>
            <input 
              type="text" 
              value={settings.contactPhone || ''} 
              onChange={e => handleChange('contactPhone', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-indigo outline-none dark:text-white"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Address</label>
            <textarea 
              value={settings.address || ''} 
              onChange={e => handleChange('address', e.target.value)}
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-indigo outline-none dark:text-white"
            />
          </div>
          
          <div className="md:col-span-2 mt-4 pt-4 border-t border-slate-100 dark:border-white/10">
            <h3 className="font-bold text-brand-navy dark:text-white mb-4">Social Media Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-brand-slate mb-1">Facebook URL</label>
                <input 
                  type="url" 
                  value={settings.facebookUrl || ''} 
                  onChange={e => handleChange('facebookUrl', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 outline-none dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-brand-slate mb-1">Instagram URL</label>
                <input 
                  type="url" 
                  value={settings.instagramUrl || ''} 
                  onChange={e => handleChange('instagramUrl', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 outline-none dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-brand-slate mb-1">Twitter URL</label>
                <input 
                  type="url" 
                  value={settings.twitterUrl || ''} 
                  onChange={e => handleChange('twitterUrl', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 outline-none dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-brand-slate mb-1">YouTube URL</label>
                <input 
                  type="url" 
                  value={settings.youtubeUrl || ''} 
                  onChange={e => handleChange('youtubeUrl', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 outline-none dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-brand-indigo text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-opacity-90 disabled:opacity-50"
          >
            <Save className="w-5 h-5" /> {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
