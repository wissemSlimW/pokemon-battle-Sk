import pkg from 'pg';
import fs from 'fs';
import path from 'path';
import { POKEMON, POKEMON_TYPES, TEAMS, WEAKNESSES } from './seed.data';
import type { Pokemon, PokemonTeam, PokemonType, Team, Weakness } from '$lib/types';
import { createInsertManyQuery } from '$lib/utils';
import type { Id } from '$lib/types/model';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const { Pool } = pkg;

const adminPool = new Pool({
	user: 'postgres',
	password: '123456',
	host: 'localhost',
	port: 5432,
	database: 'postgres' // Connect to default 'postgres' database to create the new one
});

// Function to create the 'pokemon' database if it doesn't exist
export const createDatabase = async () => {
	const client = await adminPool.connect();
	try {
		console.log("Connected to 'postgres' database");
		const checkDbQuery = `
            SELECT 1 FROM pg_database WHERE datname = 'pokemon';
        `;
		const result = await client.query(checkDbQuery);
		if (result.rowCount === 0) {
			await client.query(`CREATE DATABASE pokemon;`);
			console.log("Database 'pokemon' created successfully.");
		} else {
			console.log("Database 'pokemon' already exists");
		}
		await db(); // Initialize the database schema
		// await seedDb(); // Uncomment to seed the database
	} catch (err) {
		console.error('Error creating the database', err);
		throw err;
	} finally {
		client.release();
	}
};
const pool = new Pool({
	user: 'postgres',
	password: '123456',
	host: 'localhost',
	port: 5432,
	database: 'pokemon'
});

const seedDb = async () => {
	const client = await pool.connect();
	try {
		await client.query(
			createInsertManyQuery<Omit<PokemonType, 'id'>>('pokemon_types', ['name'], POKEMON_TYPES)
		);
		await client.query(
			createInsertManyQuery<Omit<Pokemon, 'id'>>(
				'pokemon',
				['name', 'image', 'life', 'power', 'type'],
				POKEMON
			)
		);
		await client.query(
			createInsertManyQuery<Omit<Weakness, 'id'>>(
				'weaknesses',
				['factor', 'type1', 'type2'],
				WEAKNESSES
			)
		);
		const result = await client.query(
			createInsertManyQuery<Omit<Team, 'id'>>('teams', ['name'], TEAMS)
		);
		for (const team of result.rows) {
			await client.query(
				createInsertManyQuery<Omit<PokemonTeam, 'id'>>(
					'pokemon_teams',
					['team', 'pokemon'],
					TEAMS.find((t) => t.name === team.name)!.pokemonIds!.map((id: Id) => ({
						team: team.id!,
						pokemon: id
					}))
				)
			);
		}
		console.log('Database seeded');
	} catch (err) {
		console.error('Error seeding the database', err);
		throw err;
	} finally {
		client.release();
	}
};
// Function to initialize the database schema
export const db = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);
	const client = await pool.connect();
	try {
		console.log('Connected to pokemon database');
		const filePath = path.join(__dirname, 'schema.sql');
		const sql = fs.readFileSync(filePath, 'utf8');
		await client.query(sql);
		console.log('Database initialized');
	} catch (err) {
		console.error('Error initializing the database', err);
		throw err;
	} finally {
		client.release();
	}
};

export const poolQuery = (text: string, params?: any) => pool.query(text, params);
