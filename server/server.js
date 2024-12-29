// import express from 'express'
// import cors from 'cors'
// import admin from 'firebase-admin'
// import fs from 'fs'
// import { createRequire } from 'module'
// const require = createRequire(import.meta.url)
// import * as dotenv from 'dotenv'
// dotenv.config()

// const serviceAccountPath = require.resolve('./serviceAccountKey.json')
// const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath))

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// })

// const app = express()
// app.use(express.json())
// app.use(cors({ origin: 'http://localhost:3000' }))

// app.post('/generateCustomToken', async (req, res) => {
//   console.log('Запрос на /generateCustomToken получен') // Добавлено

//   try {
//     const uid = req.body.uid
//     console.log('Полученный UID:', uid) // Добавлено

//     if (!uid) {
//       return res.status(400).send({ error: 'UID is required' })
//     }
//     const customToken = await admin.auth().createCustomToken(uid)
//     res.send({ token: customToken })
//   } catch (error) {
//     console.error('Error generating custom token:', error)
//     res.status(500).send({ error: 'Failed to generate custom token' })
//   }
// })

// const PORT = Number(process.env.PORT) || 3000
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`)
// })
