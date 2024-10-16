import { createDatabase } from '$lib/db/db';

async function initializeDatabase() {
	try {
		await createDatabase();
	} catch (error) {
		console.error('Error initializing the database:', error);
	}
}

initializeDatabase();
