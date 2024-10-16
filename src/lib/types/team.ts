import type { Model } from './model';
import type { Pokemon } from './pokemon';

export interface Team extends Model {
	name: string;
	pokemonIds?: number[];
	pokemon?: Pokemon[];
}
