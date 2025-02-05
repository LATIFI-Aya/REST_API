const express = require('express');//pour la creaction de siteweb
const bodyPaser = require('body-parser');//annalyser le corps de requete forma json
const User = require('./models/User');
const dotenv = require('dotenv'); 
dotenv.config(); // This loads the variables from .env
// Install and set up Mongoose
const mongoose = require('mongoose');

const app = express(); //une instance de l'application json 
const port = 3001;// le port de quelle le server sera ecoutra

// Middleware
app.use(express.json()); // to parse JSON bodies
const uri='mongodb+srv://ayalatifi6:ayalatifi6@cluster0.0nwq2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// Connect to MongoDB
mongoose.connect(uri)
 .then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

app.use(bodyPaser.json());

//la resources taches
let tasks =[
    { id: 1, name: 'aya', email: 'aya@gmail.com', age: 22, description: 'Faire qlq chose '},
    { id: 2, name: 'salma', email: 'salma@gmail.com', age: 23, description: 'Apprendre qlq chose'}
]

//demarer le port
app.listen(port, ()=> {
    console.log(`Serveur écoutant sur le port ${port}`);
});

app.get('/tasks', (req, res)=>{
    const taskReferences = tasks.map(task => `/task/${task.id}`);//map permettre parcourir une liste et faire une actions pricise pour chaque elements de la liste 
    res.json(taskReferences);
});

//details d'une taches {URI: /task/id}
app.get('/task/:id', (req, res)=>{
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId); //find pour rechercher la taches courespondance id dans la liste des taches

    //verifier
    if(task){
        res.json(task); //si trouver renvoier la tache au forma json
    } else{ //si aucune taches n'a été trouver 
        res.status(404).json({error: 'Tache non trouvée'});// RENVOIYER UNE REPONSE AVEC LE STATUS 404 NOT FOUND 
        }
});

//Ajouter une tache  {URI: /tasks}
app.post('/tasks', (req, res)=> {
    const newTask = {
        id: tasks.length + 1, //Permettre de recuperer la taille de tableau (incrementer de 1)
        description: req.body.description // que l'ulisateur a renter 
    };
    tasks.push(newTask);
    res.status(201).json({ message: 'Tache ajoutée avec succès', tasks: newTask});
})

//modification d'une tache
app.put('/task/:id', (req, res)=> {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    if(task) {
        task.description = req.body.description;
        res.json({ message: 'Tache mise à jour avec succès', task });
    } else{
        res.status(404).json({error: 'Tache on trouvée'})
    }
})

//Suppression d'une tache (delete) 
app.delete('/task/:id', (req, res)=> {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id !== taskId); //filter pour crrer une nouvelle tache celle avec id specifique 
    res.json({ message: 'Tache supprimée avec succès'})
}); 




