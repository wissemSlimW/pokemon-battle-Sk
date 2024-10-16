import type { Pokemon } from './pokemon';
import type { PokemonTeam } from './pokemonTeam';
import type { PokemonType } from './pokemonType';
import type { Team } from './team';
import type { Weakness } from './weakness';

export type Db = {
	pokemon: Pokemon;
	teams: Team;
	pokemon_types: PokemonType;
	weaknesses: Weakness;
	pokemon_teams: PokemonTeam;
};
