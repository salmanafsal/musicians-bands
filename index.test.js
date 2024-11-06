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

      test('Test Band Association with Musicians', async () => {
        const myBand = await Band.findByPk(1);
        
        const musicians = await myBand.getMusicians();
        
        expect(musicians.length).toBeGreaterThan(0);

      });
      
      test('Test Musician Association with Song', async () => {
        const myMusician = await Musician.findByPk(1);
        
        const mysong = await myMusician.getSongs();
        
        expect(mysong.length).toBeGreaterThan(0);

      });


      test("Add multiple songs to a band and verify association", async () => {
        // Step 1: Create a Band
        const band = await Band.create({ name: "The Beatles", genre: "Rock" });

        // Step 2: Create Songs
        const song1 = await Song.create({ title: "Hey Jude",year: "1997", length: 420 });
        const song2 = await Song.create({ title: "Let It Be", year: "1998", length: 240 });

        // Step 3: Add Songs to Band
        await band.addSong(song1);
        await band.addSong(song2);

        // Step 4: Verify Songs are associated with Band
        const songsInBand = await band.getSongs();
        expect(songsInBand.length).toBe(2);
        expect(songsInBand.map(s => s.title)).toEqual(expect.arrayContaining(["Hey Jude", "Let It Be"]));

        // Step 5: Verify Band from Song's side
        const foundBandForSong1 = await song1.getBand();
        const foundBandForSong2 = await song2.getBand();
        expect(foundBandForSong1.name).toBe("The Beatles");
        expect(foundBandForSong2.name).toBe("The Beatles");
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