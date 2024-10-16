import { pokemonService, teamsService } from '$lib/services';
import type { Data } from './types';

export const prerender = false;

export async function load(): Promise<Data> {
	try {
		const teams = await teamsService.findAll();
		const pokemon = await pokemonService.findAll();
		return {
			teams: teams.map((team) => ({
				...team,
				pokemonIds: team.pokemon?.map((p) => p.id!)
			})),
			pokemon
		};
	} catch (error) {
		console.error('Error loading teams:', error);
		return { teams: [], pokemon: [] };
	}
}
