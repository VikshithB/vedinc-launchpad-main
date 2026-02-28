"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignedPdfUrl = void 0;
const supabase_1 = require("../lib/supabase");
const getSignedPdfUrl = async (publicUrl, expiresInSeconds = 300) => {
    const marker = "/storage/v1/object/public/pdf-courses/";
    if (!publicUrl.includes(marker)) {
        throw new Error("Invalid PDF URL");
    }
    const filePath = publicUrl.split(marker)[1];
    const { data, error } = await supabase_1.supabase.storage
        .from("pdf-courses")
        .createSignedUrl(filePath, expiresInSeconds);
    if (error) {
        throw error;
    }
    return data.signedUrl;
};
exports.getSignedPdfUrl = getSignedPdfUrl;
