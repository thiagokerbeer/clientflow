function ClientForm({ formData, handleChange, handleSubmit, isEditing }) {
  return (
    <section className="panel form-section">
      <div className="section-top">
        <span className="section-tag">Cadastro</span>
        <h2>{isEditing ? "Editar cliente" : "Novo cliente"}</h2>
        <p>
          Preencha os dados principais para iniciar o relacionamento com o
          cliente dentro da plataforma.
        </p>
      </div>

      <form className="client-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome completo"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Telefone"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="company"
          placeholder="Empresa"
          value={formData.company}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="Cidade"
          value={formData.city}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>

        <button type="submit">
          {isEditing ? "Salvar alterações" : "Cadastrar cliente"}
        </button>
      </form>
    </section>
  );
}

export default ClientForm;