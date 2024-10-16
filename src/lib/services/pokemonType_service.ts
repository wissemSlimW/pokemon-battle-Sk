import type { PokemonType } from '$lib/types';
import { BaseService } from './base_service';

export const pokemonTypesService = new BaseService<PokemonType>('pokemon_types');
