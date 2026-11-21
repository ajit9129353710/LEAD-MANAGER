import { useEffect, useState } from "react";
import { X } from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  source: "Website",
  status: "New",
  notes: "",
};

function LeadForm({ onSubmit, onClose, editingLead }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingLead) {
      setForm({
        name: editingLead.name || "",
        email: editingLead.email || "",
        phone: editingLead.phone || "",
        company: editingLead.company || "",
        source: editingLead.source || "Website",
        status: editingLead.status || "New",
        notes: editingLead.notes || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [editingLead]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Name, email and phone are required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await onSubmit(form);
      setForm(initialForm);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="form-modal">
        <div className="modal-header">
          <div>
            <h2>{editingLead ? "Edit Lead" : "Add New Lead"}</h2>
            <p>Enter the lead information below.</p>
          </div>

          <button className="icon-button" onClick={onClose}>
            <X size={21} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="form-group">
              <label>Company</label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company name"
              />
            </div>

            <div className="form-group">
              <label>Lead Source</label>
              <select name="source" value={form.source} onChange={handleChange}>
                <option>Website</option>
                <option>Referral</option>
                <option>Social Media</option>
                <option>Advertisement</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Lost</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Add additional information..."
                rows="3"
              />
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="primary-button">
              {editingLead ? "Save Changes" : "Create Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeadForm;