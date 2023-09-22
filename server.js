const express = require('express');
const multer = require('multer');

const app = express();
const port = 3000;

// 1) Exibição de arquivos estáticos
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));


// 2) Upload de arquivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('Arquivo enviado com sucesso!');
});

// 3) Processa dados de um formulário enviados via GET
app.get('/formdata', (req, res) => {
  const data = req.query;
  res.send(data);
});

// 4) Aplicação AJAX
const fs = require('fs');
const path = require('path');

app.get('/data', (req, res) => {
    // Ajuste o caminho conforme onde você colocou o sampleData.json
    const filePath = path.join(__dirname, '/data/sampleData.json'); // ou 'data/sampleData.json' se estiver na subpasta

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }

        res.json(JSON.parse(data));
    });
});



app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
