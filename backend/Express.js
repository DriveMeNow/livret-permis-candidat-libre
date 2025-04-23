const cors = require('cors');
app.use(cors({
  origin: "https://drivemenow.netlify.app",
  credentials: true
}));
