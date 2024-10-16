import type { Pokemon, PokemonType } from '$lib/types';

export type Actions = {
	delete: (teamId: number) => Promise<void>;
	manage: (data: Pokemon) => Promise<Pokemon>;
};
export type Data = { pokemon: Pokemon[]; pokemonTypes: PokemonType[] };
