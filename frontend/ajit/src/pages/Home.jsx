import { useCallback, useEffect, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import LeadForm from "../components/LeadForm";
import LeadTable from "../components/LeadTable";
import DeleteModal from "../components/DeleteModal";
import {
  getLeads,
  getStats,
  createLead,
  updateLead,
  deleteLead,
} from "../services/leadService";

const initialStats = {
  total: 0,
  new: 0,
  contacted: 0,
  qualified: 0,
  lost: 0,
};

function Home() {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(initialStats);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [deletingLead, setDeletingLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [leadData, statsData] = await Promise.all([
        getLeads(),
        getStats(),
      ]);

      setLeads(Array.isArray(leadData) ? leadData : leadData.leads || []);

      const data = statsData || {};

      setStats({
        total: data.total ?? data.totalLeads ?? 0,
        new: data.new ?? data.newLeads ?? 0,
        contacted: data.contacted ?? data.contactedLeads ?? 0,
        qualified: data.qualified ?? data.qualifiedLeads ?? 0,
        lost: data.lost ?? data.lostLeads ?? 0,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load leads. Please check your backend server."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = async (formData) => {
    if (editingLead) {
      await updateLead(editingLead._id, formData);
    } else {
      await createLead(formData);
    }

    setShowForm(false);
    setEditingLead(null);
    await loadData();
  };

  const handleEdit = (lead) => {
    setEditingLead(lead);
    setShowForm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteLead(deletingLead._id);
      setDeletingLead(null);
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete lead.");
      setDeletingLead(null);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = `${lead.name} ${lead.email} ${lead.company || ""}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus = !status || lead.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <header className="top-header">
          <div>
            <p className="breadcrumb">Workspace / Dashboard</p>
            <h1>Dashboard</h1>
            <p className="page-subtitle">
              Welcome back! Here's what's happening with your leads.
            </p>
          </div>

          <button className="primary-button" onClick={() => {
            setEditingLead(null);
            setShowForm(true);
          }}>
            <Plus size={19} />
            Add New Lead
          </button>
        </header>

        <section className="dashboard-section" id="dashboard">
          <div className="section-title">
            <div>
              <h2>Overview</h2>
              <p>Here's your lead performance at a glance.</p>
            </div>

            <button className="refresh-button" onClick={loadData}>
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          <Dashboard stats={stats} />
        </section>

        {error && <div className="error-banner">{error}</div>}

        {loading ? (
          <div className="loading-state">Loading your leads...</div>
        ) : (
          <LeadTable
            leads={filteredLeads}
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            onEdit={handleEdit}
            onDelete={setDeletingLead}
          />
        )}
      </main>

      {showForm && (
        <LeadForm
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingLead(null);
          }}
          editingLead={editingLead}
        />
      )}

      {deletingLead && (
        <DeleteModal
          lead={deletingLead}
          onCancel={() => setDeletingLead(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default Home;