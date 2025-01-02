import db from './database.js';
import initializeDB from './initializedb.js';

initializeDB();

(async () => {
	try {
        
		await db.sync({ force: true });
		console.log('Database has been reset!!');

	} catch (err) { console.warn(err.stack);}
})();
