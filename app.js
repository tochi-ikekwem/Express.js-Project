const express = require('express');  
const app = express();  
const PORT = process.env.PORT || 3000;  

// Middleware to serve static files  
app.use(express.static('public'));  

// Set EJS as the template engine  
app.set('view engine', 'ejs');  

// Middleware to check working hours  
const checkWorkingHours = (req, res, next) => {  
    const now = new Date();  
    const day = now.getDay(); // 0 (Sun) to 6 (Sat)  
    const hour = now.getHours(); // 0 to 23  
    // Check if it's Monday to Friday and between 9 AM to 5 PM  
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {  
        next(); // Proceed to the next middleware or route handler  
    } else {  
        res.send("Sorry, our service is only available during working hours (Monday to Friday, 9 AM to 5 PM).");  
    }  
};  

// Apply the middleware to all routes  
app.use(checkWorkingHours);  

// Routes  
app.get('/', (req, res) => {  
    res.render('home');  
});  

app.get('/services', (req, res) => {  
    res.render('services');  
});  

app.get('/contact', (req, res) => {  
    res.render('contact');  
});  

// Start the server  
app.listen(PORT, () => {  
    console.log(`Server is running on http://localhost:${PORT}`);  
});