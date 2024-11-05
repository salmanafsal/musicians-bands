const { db } = require('./db.js');
const { Band, Musician, Song } = require('./index.js')

describe('Band, Musician, and Song Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await db.sync({ force: true });
    })

    test('Can create a new Band', async () => {
        const band = await Band.create({ name: 'The Rolling Stones', genre: 'Rock' });
        expect(band.name).toBe('The Rolling Stones');
        expect(band.genre).toBe('Rock');
      });
    
      test('Can create a new Musician', async () => {
        const musician = await Musician.create({ name: 'Keith Richards', instrument: 'Guitar' });
        expect(musician.name).toBe('Keith Richards');
        expect(musician.instrument).toBe('Guitar');
      });
    
      test('Can create a new Song', async () => {
        const song = await Song.create({ title: 'Paint It Black', year: 1966, length: 210 });
        expect(song.title).toBe('Paint It Black');
        expect(song.year).toBe(1966);
        expect(song.length).toBe(210);
      });
    
      test('Can update a Band instance', async () => {
        const band = await Band.create({ name: 'The Beatles', genre: 'Pop' });
        await band.update({ name: 'The Fab Four' });
        expect(band.name).toBe('The Fab Four');
      });
    
      test('Can update a Musician instance', async () => {
        const musician = await Musician.create({ name: 'John Lennon', instrument: 'Vocals' });
        await musician.update({ instrument: 'Guitar' });
        expect(musician.instrument).toBe('Guitar');
      });
    
      test('Can update a Song instance', async () => {
        const song = await Song.create({ title: 'Hey Jude', year: 1968, length: 431 });
        await song.update({ length: 420 });
        expect(song.length).toBe(420);
      });
    
      test('Can delete a Band instance', async () => {
        const band = await Band.create({ name: 'Nirvana', genre: 'Grunge' });
        await band.destroy();
        const foundBand = await Band.findByPk(band.id);
        expect(foundBand).toBeNull();
      });
    
      test('Can delete a Musician instance', async () => {
        const musician = await Musician.create({ name: 'Kurt Cobain', instrument: 'Guitar' });
        await musician.destroy();
        const foundMusician = await Musician.findByPk(musician.id);
        expect(foundMusician).toBeNull();
      });
    
      test('Can delete a Song instance', async () => {
        const song = await Song.create({ title: 'Smells Like Teen Spirit', year: 1991, length: 301 });
        await song.destroy();
        const foundSong = await Song.findByPk(song.id);
        expect(foundSong).toBeNull();
      });
   
})