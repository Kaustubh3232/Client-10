import { supabase } from '../lib/supabase';

/**
 * Gallery Services
 */
export const getGalleryImages = async () => {
    const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
};

export const uploadGalleryImage = async (file, title, category) => {
    if (!file) throw new Error("Please select an image file to upload.");
    const fileExt = file.name.split('.').pop();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const fileName = `${Date.now()}-${cleanName}`;
    const filePath = `gallery/${fileName}`;

    // 1. Upload to Storage
    const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

    if (uploadError) throw uploadError;

    // 2. Get Public URL
    const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath);

    // 3. Save to Database
    const { data, error: dbError } = await supabase
        .from('gallery')
        .insert([{ title, category, url: publicUrl }])
        .select();

    if (dbError) throw dbError;
    return data[0];
};

export const deleteGalleryImage = async (id, filePath) => {
    // 1. Delete from Storage
    if (filePath) {
        const { error: storageError } = await supabase.storage
            .from('assets')
            .remove([filePath]);
        if (storageError) console.error('Storage deletion error:', storageError);
    }

    // 2. Delete from Database
    const { error: dbError } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

    if (dbError) throw dbError;
};

/**
 * Toppers Services
 */
export const getToppers = async () => {
    const { data, error } = await supabase
        .from('toppers')
        .select('*')
        .order('score', { ascending: false });

    if (error) throw error;
    return data;
};

export const uploadTopperImage = async (file) => {
    if (!file) throw new Error("Please select a student photo to upload.");
    const fileExt = file.name.split('.').pop();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const fileName = `${Date.now()}-${cleanName}`;
    const filePath = `toppers/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath);

    return publicUrl;
};

export const addTopper = async (name, score, file) => {
    const publicUrl = await uploadTopperImage(file);

    const { data, error } = await supabase
        .from('toppers')
        .insert([{ name, score, image: publicUrl }])
        .select();

    if (error) throw error;
    return data[0];
};

export const deleteTopper = async (id) => {
    const { error } = await supabase
        .from('toppers')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

/**
 * Notices Services
 */
export const getNotices = async () => {
    const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('date', { ascending: false });

    if (error) throw error;
    return data;
};

export const addNotice = async (title, description, date) => {
    const { data, error } = await supabase
        .from('notices')
        .insert([{ title, description, date }])
        .select();

    if (error) throw error;
    return data[0];
};

export const deleteNotice = async (id) => {
    const { error } = await supabase
        .from('notices')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

/**
 * Links Services
 */
export const getLinks = async () => {
    const { data, error } = await supabase
        .from('quick_links')
        .select('*')
        .order('label', { ascending: true });

    if (error) throw error;
    return data;
};

export const addLink = async (label, url) => {
    const { data, error } = await supabase
        .from('quick_links')
        .insert([{ label, url }])
        .select();

    if (error) throw error;
    return data[0];
};

export const deleteLink = async (id) => {
    const { error } = await supabase
        .from('quick_links')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

/**
 * Media Coverage Services
 */
export const getMediaCoverage = async () => {
    const { data, error } = await supabase
        .from('media_coverage')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
};

export const uploadMediaImage = async (file, title) => {
    if (!file) throw new Error("Please select a media image to upload.");
    const fileExt = file.name.split('.').pop();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const fileName = `${Date.now()}-${cleanName}`;
    const filePath = `media/${fileName}`;

    // 1. Upload to Storage
    const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

    if (uploadError) throw uploadError;

    // 2. Get Public URL
    const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath);

    // 3. Save to Database
    const { data, error: dbError } = await supabase
        .from('media_coverage')
        .insert([{ title, url: publicUrl, storage_path: filePath }])
        .select();

    if (dbError) throw dbError;
    return data[0];
};

export const deleteMediaImage = async (id, filePath) => {
    // 1. Delete from Storage
    if (filePath) {
        const { error: storageError } = await supabase.storage
            .from('assets')
            .remove([filePath]);
        if (storageError) console.error('Storage deletion error:', storageError);
    }

    // 2. Delete from Database
    const { error: dbError } = await supabase
        .from('media_coverage')
        .delete()
        .eq('id', id);

    if (dbError) throw dbError;
};
