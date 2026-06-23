/**
 * Browser module for the Documents page.
 * Upload and document list behaviour is intentionally left for implementation.
 */
import { setCurrentPage } from "../utils/dom.js";
import { initializeStudentAuth } from "../auth/authUi.js";

export const page = Object.freeze({
  id: "documents",
  status: "template-static",
});

setCurrentPage(page.id);
await initializeStudentAuth();

// TODO: Read [data-document-upload-form] and upload the selected file.
// TODO: Validate file size, file type, and selected document type before upload.
// TODO: Load the student's saved documents and render rows from [data-document-row].
// TODO: Wire [data-preview-document] to signed URL preview generation.
// TODO: Wire [data-delete-document] to storage and database deletion.
