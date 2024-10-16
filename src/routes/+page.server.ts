import { pokemonService, pokemonTypesService } from '$lib/services';
import type { Data } from './types';

export const prerender = false;
export async function load(): Promise<Data> {
	try {
		const pokemon = await pokemonService.findAll();
		const pokemonTypes = await pokemonTypesService.findAll();
		return {
			pokemon,
			pokemonTypes
		};
	} catch (error) {
		console.error('Error loading teams:', error);
		return { pokemon: [], pokemonTypes: [] };
	}
}
