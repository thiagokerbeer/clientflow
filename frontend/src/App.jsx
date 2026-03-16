import { useEffect, useState } from "react";
import "./App.css";
import ClientForm from "./components/ClientForm";
import ClientList from "./components/ClientList";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  city: "",
  status: "Ativo",
};

function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [clients, setClients] = useState(() => {
    const savedClients = localStorage.getItem("clientflow_clients");
    return savedClients ? JSON.parse(savedClients) : [];
  });
  const [editingClientId, setEditingClientId] = useState(null);

  useEffect(() => {
    localStorage.setItem("clientflow_clients", JSON.stringify(clients));
  }, [clients]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.company.trim() ||
      !formData.city.trim()
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    if (editingClientId) {
      setClients((prev) =>
        prev.map((client) =>
          client.id === editingClientId
            ? { ...client, ...formData }
            : client
        )
      );

      setEditingClientId(null);
      setFormData(initialFormData);
      return;
    }

    const newClient = {
      id: Date.now(),
      ...formData,
    };

    setClients((prev) => [newClient, ...prev]);
    setFormData(initialFormData);
  }

  function handleDelete(clientId) {
    setClients((prev) => prev.filter((client) => client.id !== clientId));

    if (editingClientId === clientId) {
      setEditingClientId(null);
      setFormData(initialFormData);
    }
  }

  function handleEdit(client) {
    setEditingClientId(client.id);
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      company: client.company,
      city: client.city,
      status: client.status,
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

        <ClientList
          clients={clients}
          totalClients={totalClients}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </main>
  );
}

export default App;