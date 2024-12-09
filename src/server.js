import { PrismaClient } from "@prisma/client";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(cors());
//! HOME PAGE

app.get("/", async (req, res) => {
    res.send("REST API")
})
//! POST API
app.post("/api/items", async (req, res) => {
    try {
        const { nama_item, jenis_item, stok, status, tanggal } = req.body;
        const item = await prisma.item.create({
            data: {nama_item, jenis_item, stok, status, tanggal}
        })
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//! GET API 
app.get("/api/items", async (req, res) => {
    try {
        const items = await prisma.item.findMany();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//! READ BY ID
app.get("/api/items/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const item = await prisma.item.findUnique({ where: { id: parseInt(id) } });
      if (!item) return res.status(404).json({ error: "Item not found" });
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

//! UPDATE ITEM
app.put("/api/items/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { nama_item, jenis_item, stok, status, tanggal } = req.body;
      const item = await prisma.item.update({
        where: { id: parseInt(id) },
        data: { nama_item, jenis_item, stok, status, tanggal: new Date(tanggal) },
      });
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

//! DELETE ITEM
app.delete("/api/items/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.item.delete({ where: { id: parseInt(id) } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

//! Jalankan Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});