function ClientCard({ client, onEdit, onDelete }) {
  return (
    <div className="client-card">
      <div className="client-card-top">
        <h3>{client.name}</h3>
        <span
          className={`client-status ${
            client.status === "Ativo" ? "status-active" : "status-inactive"
          }`}
        >
          {client.status}
        </span>
      </div>

      <div className="client-info">
        <p>
          <strong>Empresa:</strong> {client.company || "-"}
        </p>
        <p>
          <strong>E-mail:</strong> {client.email || "-"}
        </p>
        <p>
          <strong>Telefone:</strong> {client.phone || "-"}
        </p>
        <p>
          <strong>Cidade:</strong> {client.city || "-"}
        </p>
      </div>

      <div className="client-actions">
        <button
          type="button"
          className="edit-button"
          onClick={() => onEdit(client)}
        >
          Editar
        </button>

        <button
          type="button"
          className="delete-button"
          onClick={() => onDelete(client.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default ClientCard;