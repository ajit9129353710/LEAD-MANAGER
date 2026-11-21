import { Edit2, Trash2, Search, Users, Filter } from "lucide-react";

function LeadTable({
leads,
search,
setSearch,
status,
setStatus,
onEdit,
onDelete,
}) {
return (
<section className="leads-section" id="leads">
<div className="section-header">
<div>
<span className="section-label">CUSTOMER MANAGEMENT</span>
<h2>All Leads</h2>
<p>Manage, monitor and grow your potential customers.</p>
</div>

    <div className="leads-count">
      <Users size={17} />
      <span>{leads.length} Leads</span>
    </div>
  </div>

  <div className="table-toolbar">
    <div className="search-box">
      <Search size={19} />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name, email or company..."
      />
    </div>

    <div className="filter-wrapper">
      <Filter size={17} />
      <select
        className="filter-select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Lost">Lost</option>
      </select>
    </div>
  </div>

  <div className="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>CONTACT</th>
          <th>COMPANY</th>
          <th>PHONE</th>
          <th>SOURCE</th>
          <th>STATUS</th>
          <th>ACTIONS</th>
        </tr>
      </thead>

      <tbody>
        {leads.length > 0 ? (
          leads.map((lead) => (
            <tr key={lead._id}>
              <td>
                <div className="contact-cell">
                  <div className="contact-avatar">
                    {lead.name?.charAt(0).toUpperCase() || "?"}
                  </div>

                  <div className="contact-info">
                    <strong>{lead.name}</strong>
                    <span>{lead.email}</span>
                  </div>
                </div>
              </td>

              <td>
                <span className="company-name">
                  {lead.company || "—"}
                </span>
              </td>

              <td>{lead.phone || "—"}</td>

              <td>
                <span className="source-text">
                  {lead.source || "—"}
                </span>
              </td>

              <td>
                <span
                  className={`status-badge ${(lead.status || "new").toLowerCase()}`}
                >
                  <span className="status-dot"></span>
                  {lead.status}
                </span>
              </td>

              <td>
                <div className="action-buttons">
                  <button
                    className="edit-button"
                    onClick={() => onEdit(lead)}
                    title="Edit Lead"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => onDelete(lead)}
                    title="Delete Lead"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">
              <div className="empty-state">
                <div className="empty-icon">
                  <Users size={32} />
                </div>
                <h3>No leads found</h3>
                <p>
                  Try changing your search or add a new lead.
                </p>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  <div className="table-footer">
    Showing <strong>{leads.length}</strong> leads
  </div>
</section>

);
}

export default LeadTable;