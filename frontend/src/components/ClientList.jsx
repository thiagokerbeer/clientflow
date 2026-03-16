import ClientCard from "./ClientCard";

function ClientList({ clients, totalClients, onEdit, onDelete }) {
  return (
    <section className="panel list-section">
      <div className="list-header">
        <div>
          <span className="section-tag">Base cadastrada</span>
          <h2>Clientes cadastrados</h2>
        </div>
        <span className="badge">{totalClients} clientes</span>
      </div>

      {clients.length === 0 ? (
        <div className="empty-state">Nenhum cliente cadastrado ainda.</div>
      ) : (
        <div className="clients-list">
          {clients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ClientList;