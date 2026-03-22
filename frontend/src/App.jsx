import { useEffect, useState } from "react";
import "./App.css";
import ClientForm from "./components/ClientForm";
import ClientList from "./components/ClientList";

const API_URL = `${import.meta.env.VITE_API_URL}/clients`;

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  city: "",
  status: "Ativo",
};

function mapApiClientToUi(client) {
  return {
    ...client,
    status: client.status?.toLowerCase() === "inativo" ? "Inativo" : "Ativo",
  };
}

function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [clients, setClients] = useState([]);
  const [editingClientId, setEditingClientId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Não foi possível carregar os clientes.");
      }

      const data = await response.json();
      setClients(data.map(mapApiClientToUi));
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar clientes do servidor.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const cleanedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: formData.company.trim(),
      city: formData.city.trim(),
      status: formData.status.toLowerCase(),
    };

    if (
      !cleanedData.name ||
      !cleanedData.email ||
      !cleanedData.phone ||
      !cleanedData.company ||
      !cleanedData.city
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      setError("");

      if (editingClientId) {
        const response = await fetch(`${API_URL}/${editingClientId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cleanedData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erro ao atualizar cliente.");
        }

        setClients((prev) =>
          prev.map((client) =>
            client.id === editingClientId ? mapApiClientToUi(data) : client
          )
        );

        setEditingClientId(null);
        setFormData(initialFormData);
        return;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao cadastrar cliente.");
      }

      setClients((prev) => [mapApiClientToUi(data), ...prev]);
      setFormData(initialFormData);
    } catch (err) {
      console.error("Erro ao salvar cliente:", err);
      alert(err.message || "Erro ao salvar cliente.");
    }
  }

  async function handleDelete(clientId) {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${clientId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao remover cliente.");
      }

      setClients((prev) => prev.filter((client) => client.id !== clientId));

      if (editingClientId === clientId) {
        setEditingClientId(null);
        setFormData(initialFormData);
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Erro ao excluir cliente.");
    }
  }

  function handleEdit(client) {
    setEditingClientId(client.id);
    setFormData({
      name: client.name || "",
      email: client.email || "",
      phone: client.phone || "",
      company: client.company || "",
      city: client.city || "",
      status: client.status?.toLowerCase() === "inativo" ? "Inativo" : "Ativo",
    });
  }

  const totalClients = clients.length;
  const activeClients = clients.filter(
    (client) => client.status === "Ativo"
  ).length;
  const inactiveClients = clients.filter(
    (client) => client.status === "Inativo"
  ).length;

  return (
    <main className="app">
      <div className="page-shell">
        <header className="hero">
          <div className="hero-content">
            <p className="eyebrow">CLIENTFLOW</p>
            <h1>Gestão de clientes com presença de plataforma</h1>
            <p className="subtitle">
              Centralize cadastros, acompanhe status e organize sua operação em
              um painel com visual premium, limpo e profissional.
            </p>

            <div className="hero-actions">
              <button type="button" className="primary-button">
                Cadastrar cliente
              </button>
              <button type="button" className="secondary-button">
                Ver registros
              </button>
            </div>
          </div>
        </header>

        <div className="content-grid">
          <ClientForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isEditing={Boolean(editingClientId)}
          />

          <aside className="side-column">
            <section className="panel stats-panel">
              <span className="section-tag">Visão geral</span>
              <h2>Status rápido</h2>

              <div className="stats-list">
                <div className="stat-box">
                  <strong>{totalClients}</strong>
                  <span>Total de clientes</span>
                </div>
                <div className="stat-box">
                  <strong>{activeClients}</strong>
                  <span>Clientes ativos</span>
                </div>
                <div className="stat-box">
                  <strong>{inactiveClients}</strong>
                  <span>Clientes inativos</span>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {loading && <p className="feedback-message">Carregando clientes...</p>}
        {error && <p className="feedback-message error-message">{error}</p>}

        {!loading && !error && (
          <ClientList
            clients={clients}
            totalClients={totalClients}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </main>
  );
}

export default App;