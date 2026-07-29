const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, 'src', 'pages', 'admin');
const files = fs.readdirSync(adminDir).filter(f => f.endsWith('Admin.tsx'));

const tableMapping = {
  'AnnouncementsAdmin.tsx': 'Announcement',
  'FaqsAdmin.tsx': 'Faq',
  'FeeTiersAdmin.tsx': 'FeeTier',
  'GalleryItemsAdmin.tsx': 'GalleryItem',
  'InquiriesAdmin.tsx': 'AdmissionInquiry',
  'MessagesAdmin.tsx': 'ContactSubmission',
  'ProgramsAdmin.tsx': 'Program',
  'SettingsAdmin.tsx': 'SiteSetting',
  'TeachersAdmin.tsx': 'Teacher',
  'TestimonialsAdmin.tsx': 'Testimonial',
};

for (const file of files) {
  const table = tableMapping[file];
  if (!table) continue;
  
  const filePath = path.join(adminDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Add supabase import if not present
  if (!content.includes('import { supabase } from')) {
    // find last import
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfLastImport = content.indexOf('\n', lastImportIndex);
    content = content.slice(0, endOfLastImport + 1) + "import { supabase } from '../../lib/supabase';\n" + content.slice(endOfLastImport + 1);
  }

  // Replace fetchData
  content = content.replace(/const fetchData = async \(\) => {[\s\S]*?};\s*\n/m, `const fetchData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('${table}').select('*');
      if (error) throw error;
      setItems(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
`);

  // Replace handleDelete
  content = content.replace(/const handleDelete = async \(id: string\) => {[\s\S]*?};\s*\n/m, `const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const { error } = await supabase.from('${table}').delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };
`);

  // Replace handleSave
  content = content.replace(/const handleSave = async \(e: React\.FormEvent\) => {[\s\S]*?finally {\s*setSaving\(false\);\s*}\s*};/m, `const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit = !!editingItem;
      const payload = { ...formData };
      
      let error;
      if (isEdit) {
        const { error: updateError } = await supabase.from('${table}').update(payload).eq('id', editingItem.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase.from('${table}').insert([payload]);
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
  };`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + file);
}
