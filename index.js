const { Band } = require('./models/Band')
const { Musician } = require('./models/Musician')
const { Song } = require("./models/Song")
const {db} = require('./db.js')
console.log (db);
// Define associations here

Band.hasMany(Musician)
Musician.belongsTo(Band)

Song.belongsToMany(Band, {through: "SongBand"});
Band.belongsToMany(Song, {through: "SongBand"});

Musician.hasMany(Song)
Song.belongsTo(Musician)


async function initialize() {
    try {
      // Sync the database
      await db.sync({ force: true });
  
      // Example: Create a new Band
      let createdBand = await Band.create({ name: 'The Rolling Stones', genre: 'Rock' });
       createdBand = await Band.create({ name: 'The Rolling Stones Part 2', genre: 'Metal' });

      console.log('Created Band:', createdBand);
  
      // Example: Create a new Musician
      let createdMusician = await Musician.create({ name: 'Mick Jagger', instrument: 'Vocals' });
      createdMusician = await Musician.create({ name: 'Mick Jagger Part 2', instrument: 'Vocals part 2' });
      console.log('Created Musician:', createdMusician);
  
      // Example: Create a new Song
      let  createdSong = await Song.create({ title: 'Paint It Black', year: 1966, length: 210 });
      createdSong = await Song.create({ title: 'Paint It Black Part 1', year: 1977, length: 230 });
      console.log('Created Song:', createdSong);

      const myBand = await Band.findByPk(1);
      
      let musician = await Musician.findByPk(1);
      let song = await Song.findByPk(1);
      // Correctly adding the musician to the band
      await myBand.addMusician(musician); // Pass the musician instance here
      await musician.addSong(song)
      if (!musician.BandID) {
        musician.BandId = myBand.id; // Manually set the foreign key
        await musician.save(); // Save the changes
    }

    if (!song.MusicianID) {
      song.MusicianId = musician.id; // Manually set the foreign key
      await song.save(); // Save the changes
  }

      // Fetch the updated list of musicians to verify
      const associatedMusicians = await myBand.getMusicians();
      console.log("Associated Musicians:", associatedMusicians);
  
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
