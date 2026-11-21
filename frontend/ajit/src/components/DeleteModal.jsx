import { AlertTriangle } from "lucide-react";

function DeleteModal({ lead, onCancel, onConfirm }) {
  if (!lead) return null;

  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <div className="warning-icon">
          <AlertTriangle size={27} />
        </div>

        <h2>Delete Lead?</h2>

        <p>
          Are you sure you want to delete <strong>{lead.name}</strong>? This
          action cannot be undone.
        </p>

        <div className="form-actions">
          <button className="secondary-button" onClick={onCancel}>
            Cancel
          </button>

          <button className="danger-button" onClick={onConfirm}>
            Delete Lead
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;