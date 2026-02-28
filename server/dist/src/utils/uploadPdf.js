"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPdfToSupabase = void 0;
const supabase_1 = require("../lib/supabase");
const uploadPdfToSupabase = async (file) => {
    const fileName = `pdfs/${Date.now()}-${file.originalname}`;
    const { error } = await supabase_1.supabase.storage
        .from("pdf-courses")
        .upload(fileName, file.buffer, {
        contentType: "application/pdf",
    });
    if (error) {
        throw error;
    }
    const { data } = supabase_1.supabase.storage
        .from("pdf-courses")
        .getPublicUrl(fileName);
    return data.publicUrl;
};
exports.uploadPdfToSupabase = uploadPdfToSupabase;
