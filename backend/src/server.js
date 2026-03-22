const express = require("express");
const cors = require("cors");
require("dotenv").config();

const prisma = require("./lib/prisma");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API do ClientFlow rodando" });
});

app.get("/clients", async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(clients);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    res.status(500).json({ error: "Erro ao buscar clientes" });
  }
});

app.post("/clients", async (req, res) => {
  try {
    const { name, email, phone, company, city, status } = req.body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !company?.trim() ||
      !city?.trim()
    ) {
      return res.status(400).json({
        error: "Nome, e-mail, telefone, empresa e cidade são obrigatórios",
      });
    }

    const clientExists = await prisma.client.findUnique({
      where: { email: email.trim() },
    });

    if (clientExists) {
      return res
        .status(400)
        .json({ error: "Já existe um cliente com esse e-mail" });
    }

    const newClient = await prisma.client.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim(),
        city: city.trim(),
        status: status?.toLowerCase() || "ativo",
      },
    });

    res.status(201).json(newClient);
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    res.status(500).json({ error: "Erro ao criar cliente" });
  }
});

app.put("/clients/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, company, city, status } = req.body;

    const client = await prisma.client.findUnique({
      where: { id: Number(id) },
    });

    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !company?.trim() ||
      !city?.trim()
    ) {
      return res.status(400).json({
        error: "Nome, e-mail, telefone, empresa e cidade são obrigatórios",
      });
    }

    if (email.trim() !== client.email) {
      const emailInUse = await prisma.client.findUnique({
        where: { email: email.trim() },
      });

      if (emailInUse) {
        return res
          .status(400)
          .json({ error: "Já existe um cliente com esse e-mail" });
      }
    }

    const updatedClient = await prisma.client.update({
      where: { id: Number(id) },
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim(),
        city: city.trim(),
        status: status?.toLowerCase() || "ativo",
      },
    });

    res.json(updatedClient);
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    res.status(500).json({ error: "Erro ao atualizar cliente" });
  }
});

app.delete("/clients/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const client = await prisma.client.findUnique({
      where: { id: Number(id) },
    });

    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    await prisma.client.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Cliente removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover cliente:", error);
    res.status(500).json({ error: "Erro ao remover cliente" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});