const { Band } = require('./models/Band')
const { Musician } = require('./models/Musician')
const { Song } = require("./models/Song")
const {db} = require('./db.js')
console.log (db);
// Define associations here

async function initialize() {
    try {
      // Sync the database
      await db.sync({ force: true });
  
      // Example: Create a new Band
      const createdBand = await Band.create({ name: 'The Rolling Stones', genre: 'Rock' });
      console.log('Created Band:', createdBand);
  
      // Example: Create a new Musician
      const createdMusician = await Musician.create({ name: 'Mick Jagger', instrument: 'Vocals' });
      console.log('Created Musician:', createdMusician);
  
      // Example: Create a new Song
      const createdSong = await Song.create({ title: 'Paint It Black', year: 1966, length: 210 });
      console.log('Created Song:', createdSong);
  
      // You can continue using await here for updates and deletions
  
    } catch (error) {
      console.error('Error initializing the database:', error);
    }
  }
  
  // Call the async function to run the code
  initialize();

module.exports = {
    Band,
    Musician,
    Song
};
